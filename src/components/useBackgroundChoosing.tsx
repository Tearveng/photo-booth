import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

const bgImagesData = [
  "1bgimage.jpg",
  "2bgimage.jpg",
  "3bgimage.jpg",
  "4bgimage.jpg",
  "5bgimage.jpg",
  "6bgimage.jpg",
  "7bgimage.jpg",
  "8bgimage.jpg",
  "9bgimage.jpg",
  "10bgimage.jpg",
  "11bgimage.jpg",
  "12bgimage.jpg",
  "13bgimage.jpg",
  "14bgimage.jpg",
  "15bgimage.jpg",
  "16bgimage.jpg",
  "17bgimage.jpg",
  "18bgimage.jpg",
];

export const useBackgroundChoosing = () => {
  const [backgroundImg, setBackgroundImg] = useState<HTMLImageElement | null>(
    null
  );

  const onClickSticker = (url: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      setBackgroundImg(img);
    };
  };

  const bgImageJSX = (
    url: string,
    setColorChoosing: Dispatch<SetStateAction<string>>
  ) => {
    const isBgImage =
      `${process.env.NEXT_PUBLIC_API}/background/${url}` === backgroundImg?.src;
    return (
      <Stack
        width={50}
        border={isBgImage ? "1px solid #dfcbc9" : "none"}
        p={0.5}
      >
        <img
          draggable="true"
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", (e.target as any).src);
          }}
          onClick={() => {
            setColorChoosing("");
            onClickSticker(`${process.env.NEXT_PUBLIC_API}/background/${url}`);
          }}
          src={`background/${url}`}
          style={{
            height: 30,
          }}
          id={url}
          alt={url}
        />
      </Stack>
    );
  };

  const bgImageChoosing = (
    setColorChoosing: Dispatch<SetStateAction<string>>
  ) => {
    const bgImages = bgImagesData.map((s, index) => ({
      id: index + 1,
      bgImage: s,
    }));

    return (
      <Stack gap={1} direction="row" maxWidth={350} flexWrap="wrap">
        {bgImages.map((sti) => (
          <Stack key={sti.id}>
            {bgImageJSX(sti.bgImage, setColorChoosing)}
          </Stack>
        ))}
      </Stack>
    );
  };

  return { bgImageChoosing, backgroundImg, setBackgroundImg };
};
