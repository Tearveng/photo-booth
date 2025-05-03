import { Stack } from "@mui/material";
import { useState } from "react";

const stickerData = [
  "1cherry.png",
  "2coffee.png",
  "3cloud.png",
  "4corgi-1.png",
  "5corgi.png",
  "6eat.png",
  "7heart-1.png",
  "8heart-shape.png",
  "9heart.png",
  "10hello-1.png",
  "11hello.png",
  "12hi.png",
  "13mockery.png",
  "14mocking-1.png",
  "15mocking.png",
  "16paper-plane.png",
  "17photo.png",
  "18reading-book.png",
  "19sad.png",
  "20smile.png",
  "21so-cute.png",
  "22weights.png",
];

export const useStickerChoosing = () => {
  const [stickerUrl, setStickerUrl] = useState<string | null>(null);

  const onClickSticker = (url: string) => {
    setStickerUrl(url);
  };

  const stickerJSX = (sticker: string) => {
    return (
      <Stack width={50}>
        <img
          draggable="true"
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", (e.target as any).src);
          }}
          onClick={() =>
            onClickSticker(`${process.env.NEXT_PUBLIC_API}/sticker/${sticker}`)
          }
          src={`sticker/${sticker}`}
          id={sticker}
          alt={sticker}
        />
      </Stack>
    );
  };

  const stickerChoosing = () => {
    const stickers = stickerData.map((s, index) => ({ id: index + 1, tag: s }));

    return (
      <Stack gap={1} direction="row" maxWidth={350} flexWrap="wrap">
        {stickers.map((sti) => (
          <Stack key={sti.id}>{stickerJSX(sti.tag)}</Stack>
        ))}
      </Stack>
    );
  };

  return { stickerChoosing, stickerUrl, setStickerUrl };
};
