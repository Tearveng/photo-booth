import { dispatchPhotos } from "@/redux/slices/application";
import { useAppSelector } from "@/redux/store";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const filterData = [
  {
    name: "Icy water",
    key: "brightness(104%) contrast(104%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(122%) sepia(0%)",
  },
  {
    name: "Strawberry",
    key: "grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(0%)",
  },
  {
    name: "Ibiza",
    key: "contrast(107%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(165%) sepia(50%)",
  },
  {
    name: "Blue rock",
    key: "contrast(128%) grayscale(100%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(120%) sepia(0%)",
  },
  {
    name: "Ocean wave",
    key: "brightness(105%) contrast(104%) grayscale(10%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(50%)",
  },
  {
    name: "Space trip",
    key: "grayscale(50%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(140%) sepia(0%)",
  },
  {
    name: "Warm ice",
    key: "brightness(110%) contrast(116%) grayscale(0%) hue-rotate(342deg) invert(0%) opacity(100%) saturate(84%) sepia(0%)",
  },
  {
    name: "Old wood",
    key: "brightness(105%) contrast(102%) grayscale(50%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(140%) sepia(9%)",
  },
];

interface ICamera {
  seconds: number;
}
export default function Camera(props: ICamera) {
  const router = useRouter();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("none");
  const [secondsLeft, setSecondsLeft] = useState<number>(props.seconds);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const { layout } = useAppSelector((state) => state.applicationSlice);

  const onChangeFilter = (value: string) => {
    setFilter(value);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Mirror effect if needed
        context.scale(-1, 1);
        context.filter = filter;
        context.drawImage(
          video,
          -video.videoWidth,
          0,
          video.videoWidth,
          video.videoHeight
        );

        // Get the image data URL
        const imageDataURL = canvas.toDataURL("image/png");
        setPhotos((prevPhotos) => [...prevPhotos, imageDataURL]);
      }
    }
  };

  //   const startAutoCapture = () => {
  //     let captureCount = 0;
  //     setPhotos([]); // Reset previous photos

  //     intervalRef.current = setInterval(() => {
  //       if (captureCount < 4) {
  //         capturePhoto();
  //         captureCount += 1;
  //       } else {
  //         if (intervalRef.current) {
  //           clearInterval(intervalRef.current);
  //         }
  //       }
  //     }, 3000); // every 3 seconds
  //   };

  const startAutoCapture = () => {
    setPhotos([]); // Clear previous photos
    setIsCapturing(true);

    let photoCount = 0;
    const maxPhotos = layout.layoutChoosing; // capture 5 photos total (you can change)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          capturePhoto();
          photoCount += 1;

          if (photoCount >= maxPhotos) {
            clearInterval(interval);
            setIsCapturing(false);
          }
          return props.seconds; // Reset countdown after capture
        } else {
          return prev - 1; // countdown second-by-second
        }
      });
    }, 1000);
  };

  const onContinue = () => {
    if (photos.length < 1 || photos.length !== layout.layoutChoosing) {
      return;
    }
    dispatch(dispatchPhotos(photos));
    router.push("/booth-edit");
  };

  const mergeImages = () => {
    if (photos.length === 0) return;

    const cols = 1; // How many columns you want (change as needed)
    const rows = Math.ceil(photos.length / cols);
    const imageWidth = 200;
    const imageHeight = 150;

    const finalCanvas = finalCanvasRef.current!;
    finalCanvas.width = cols * imageWidth;
    finalCanvas.height = rows * imageHeight;
    const ctx = finalCanvas.getContext("2d")!;

    photos.forEach((imgSrc, index) => {
      const img = new Image();
      img.onload = () => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        ctx.drawImage(
          img,
          col * imageWidth,
          row * imageHeight,
          imageWidth,
          imageHeight
        );
      };
      img.src = imgSrc;
    });
  };

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { height: { ideal: 80 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    getMedia();

    // Clean up when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Stack>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <Stack gap={2} direction={{ md: "row" }}>
          <Stack>
            <Stack sx={{ position: "relative" }}>
              <video
                style={{
                  transform: "scaleX(-1)",
                  height: 240,
                  objectFit: "cover",
                  filter,
                }}
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <Stack
                sx={{
                  position: "absolute",
                  top: "46%",
                  left: "46%",
                  display: isCapturing ? "flex" : "none",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  {secondsLeft}
                </Typography>
              </Stack>
            </Stack>
            <Stack py={2} gap={1}>
              <Button
                variant="outlined"
                onClick={startAutoCapture}
                disabled={isCapturing}
              >
                {isCapturing
                  ? "Capturing..."
                  : `Start capture (${layout.layoutChoosing} photos)`}
              </Button>
              <Button
                variant="outlined"
                onClick={onContinue}
                disabled={
                  isCapturing || photos.length !== layout.layoutChoosing
                }
              >
                Continue
              </Button>
            </Stack>
          </Stack>

          {photos.length > 0 && (
            <Stack alignItems="center" pb={{ xs: 2, md: 0 }}>
              <Stack
                bgcolor="#fff"
                gap={1}
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                width={layout.layoutChoosing > 4 ? "220px" : "160px"}
                p={0.5}
              >
                {photos.map((p, index) => (
                  <img
                    key={index}
                    src={p}
                    alt="Captured"
                    style={{
                      width: layout.layoutChoosing > 4 ? "100px" : "150px",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      )}

      <Typography
        sx={{
          textAlign: "center",
          color: "text.secondary",
          width: { sm: "100%" },
        }}
      >
        Choose a filter for your photo
      </Typography>

      <Stack
        direction="row"
        py={2}
        gap={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Button
          variant="outlined"
          disabled={filter === "none"}
          onClick={() => onChangeFilter("none")}
        >
          No filter
        </Button>
        {filterData.map((f) => (
          <Button
            disabled={filter === f.key}
            key={f.name}
            variant="outlined"
            onClick={() => onChangeFilter(f.key)}
          >
            {f.name}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
