import { useAppSelector } from "@/redux/store";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Image as ImageRender, Layer, Rect, Stage, Text } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { useTransform } from "./useTransform";
interface IKonCanvas {
  stageColor: string;
  stickerUrl: string | null;
  setStickerUrl: Dispatch<SetStateAction<string | null>>;
}

const isIos = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export interface ISticker {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export default function KonvaCanvas(props: IKonCanvas) {
  const router = useRouter();
  const stageRef = useRef<any>(null);
  const stickerRef = useRef(new Map());
  const { photos } = useAppSelector((state) => state.applicationSlice);
  const [stickers, setStickers] = useState<ISticker[]>([]);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [storeImg, setStoreImg] = useState<
    {
      img: HTMLImageElement;
      width: number;
      height: number;
    }[]
  >([]);
  const [stage, setStageSize] = useState({
    width: 0,
    height: 0,
  });

  // transform the stickers
  const {
    transFormElement,
    mobileElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleStageClick,
    onTouchStart,
    handleDragMove,
  } = useTransform({ stickerRef, stickers, setStickers });

  const shortDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(Date.now());

  // Handle dropped image files
  const handleDrop = (e: any) => {
    e.preventDefault();
    const imageURL = e.dataTransfer.getData("text/plain");
    if (stageRef.current) {
      const stageContext = stageRef.current as any;
      const stage = stageContext.getStage();
      stage.setPointersPositions(e);
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageURL;
        img.onload = () => {
          const uuid = uuidv4();
          setStickers((prev) => [
            ...prev,
            {
              id: uuid,
              name: "sticker",
              width: 60,
              height: 60,
              x: pointerPosition.x - 30,
              y: pointerPosition.y - 30,
              image: img,
            },
          ]);
        };
      }
    }
  };

  const handleDragOver = (e: any) => e.preventDefault();

  const onClickSticker = (imageURL: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageURL;
    img.onload = () => {
      const uuid = uuidv4();
      setStickers((prev) => [
        ...prev,
        {
          id: uuid,
          name: "sticker",
          width: 60,
          height: 60,
          x: 20,
          y: 20,
          image: img,
        },
      ]);
    };
  };

  function dataURLtoBlob(dataurl: string) {
    const parts = dataurl.split(",");
    const mime = parts[0].match(/:(.*?);/)![1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const handleDownload = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // Higher res
    const blob = dataURLtoBlob(uri);
    const blobUrl = URL.createObjectURL(blob);
    if (isIos()) {
      window.open(blobUrl, "_blank"); // iOS workaround
    } else {
      const link = document.createElement("a");
      link.download = "booth-save.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // fetch(uri)
    //   .then((res) => res.blob())
    //   .then((blob) => saveAs(blob, "canvas.png"));
  };

  const handleDownloadQR = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // Higher res
    const blob = dataURLtoBlob(uri);
    const blobUrl = URL.createObjectURL(blob);
    if (blobUrl) {
      const cleanUrl = blobUrl.replace(/^blob:/, "");
      QRCode.toDataURL(`${cleanUrl}`).then(setQrImage);
    }
  };

  const handleTakeNew = () => {
    router.push("/booth-layout");
  };

  useEffect(() => {
    if (props.stickerUrl) {
      onClickSticker(props.stickerUrl);
    }

    return () => props.setStickerUrl(null);
  }, [props.stickerUrl]);

  useEffect(() => {
    if (photos.length > 0) {
      const countPhoto = photos.length;
      let newHeight = countPhoto * (countPhoto === 1 ? 330 : 290);
      if (countPhoto === 2) {
        newHeight = newHeight + 30;
      } else if (countPhoto > 4) {
        newHeight = countPhoto * 73;
      }
      setStageSize({
        width: 365,
        height: newHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      photos.forEach((p) => {
        const img = new Image();
        img.onload = () => {};
        img.src = p;
        setStoreImg((prev) => [
          ...prev,
          { img, width: img.width, height: img.height },
        ]);
      });
    }
  }, [photos]);

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <Stage
        width={stage.width}
        height={stage.height}
        style={{
          borderRadius: 4,
        }}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleStageClick}
        // onTouchStart={handleStageClick}
        onClick={handleStageClick}
      >
        <Layer>
          {/* rectElement() */}
          <Rect
            x={0}
            y={0}
            width={stage.width}
            height={stage.height}
            fill={props.stageColor}
            listening={false} // so it doesn't block interactions
          />

          {/* frame image */}
          {storeImg.length > 0 &&
            storeImg.map((img, index) => {
              const isLayout4 = storeImg.length > 4;
              const isGreaterThan2 = isLayout4 && index > 2;
              const photoWidth = stage.width * 0.8; // 80% of stage width
              const aspectRatio = img.height / img.width;
              const photoHeight = photoWidth * aspectRatio;
              let yPosition = 20 + index * ((photoHeight - 180) / 2 + 170);
              let xPosition = (stage.width - photoWidth) / 2 - 15;
              if (!isLayout4) {
                if (index === 0) {
                  yPosition = 20;
                }
              } else {
                yPosition = 20 + index * (photoHeight / 2 + 10);
                if (index === 0) {
                  yPosition = 20;
                }
                if (isGreaterThan2) {
                  yPosition = yPosition - 358;
                  xPosition = xPosition + stage.width / 2.1;
                }
              }

              return (
                <ImageRender
                  draggable={false}
                  listening={false}
                  key={index}
                  image={img.img}
                  x={xPosition} // Offset each image horizontally
                  y={yPosition}
                  width={img.width / (isLayout4 ? 4.5 : 2)}
                  height={img.height / (isLayout4 ? 4.5 : 2)}
                />
              );
            })}
          <Text
            text={`Power by 💗 ${process.env.NEXT_PUBLIC_MADE_BY}`}
            fontSize={14}
            fill="black"
            x={stage.width - 130}
            y={stage.height - 25}
          />
          <Text
            text={`${shortDate}`}
            fontSize={14}
            fill="black"
            x={stage.width - 97}
            y={stage.height - 40}
          />

          {/* stickers render */}
          {stickers.map((sticker, i) => (
            <ImageRender
              ref={(node) => {
                if (node) {
                  stickerRef.current.set(sticker.id, node);
                } else {
                  stickerRef.current.delete(sticker.id);
                }
              }}
              key={i}
              id={sticker.id}
              name={sticker.name}
              image={sticker.image}
              width={sticker.width}
              height={sticker.height}
              x={sticker.x}
              y={sticker.y}
              draggable
              onDragMove={handleDragMove}
            />
          ))}

          {transFormElement()}
          {mobileElement()}
        </Layer>
      </Stage>
      <Stack direction="row" p={3} gap={1} flexWrap="wrap" maxWidth={365}>
        <Button
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleDownload}
          variant="outlined"
          sx={{ fontSize: 12 }}
        >
          Download Photo stripe
        </Button>
        <Button
          sx={{ fontSize: 12 }}
          onClick={handleTakeNew}
          variant="outlined"
        >
          Take new photos
        </Button>
        {/* <Button
          startIcon={<QrCode2OutlinedIcon />}
          onClick={handleDownloadQR}
          sx={{ fontSize: 12 }}
          variant="outlined"
        >
          Download via QR code
        </Button> */}
      </Stack>
      <Stack p={3}>{qrImage && <img src={qrImage} width={200} />}</Stack>
    </div>
  );
}
