"use client";

// Important: use dynamic import to avoid SSR problems
// const KonvaCanvas = dynamic(() => import("../components/KonvaCanvas"), {
//   ssr: false,
// });

import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import KonvaCanvas from "./KonvaCanvas";
import { useBackgroundChoosing } from "./useBackgroundChoosing";
import { useColorChoosing } from "./useColorChoosing";
import { useShapeChoosing } from "./useShapeChoosing";
import { useStickerChoosing } from "./useStickerChoosing";

export default function BoothEdit() {
  const [storeImg, setStoreImg] = useState<
    {
      img: HTMLImageElement;
      width: number;
      height: number;
    }[]
  >([]);
  const { colorsChoosing, choosing, setChoosing } = useColorChoosing();
  const { stickerChoosing, stickerUrl, setStickerUrl } = useStickerChoosing();
  const { bgImageChoosing, backgroundImg, setBackgroundImg } =
    useBackgroundChoosing();
  const { shapeChoosing, shape } = useShapeChoosing();
  const router = useRouter();

  const onChangeStart = () => {
    router.push("/booth-layout");
  };

  // const mergeImages = () => {
  //   if (photos.length === 0) return;

  //   const cols = 1; // How many columns you want (change as needed)
  //   const rows = Math.ceil(photos.length / cols);
  //   const imageWidth = 200;
  //   const imageHeight = 150;

  //   const finalCanvas = finalCanvasRef.current!;
  //   finalCanvas.width = cols * imageWidth + 20;
  //   finalCanvas.height = rows * imageHeight + 60;
  //   const ctx = finalCanvas.getContext("2d")!;
  //   ctx.fillStyle = "#f0f0f0"; // or whatever color you want
  //   ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  //   // Text settings
  //   ctx.font = "16px Arial"; // font size and family
  //   ctx.fillStyle = "#333"; // text color
  //   ctx.textAlign = "center"; // center align text

  //   // Calculate total width and height of the grid
  //   const totalGridWidth = imageWidth * cols + 10 * (cols - 1);
  //   const totalGridHeight = imageHeight * rows + 10 * (rows - 1);

  //   // Calculate starting X and Y (for centering)
  //   const startX = (finalCanvas.width - totalGridWidth) / 2;
  //   const startY = (finalCanvas.height - totalGridHeight) / 2;

  //   photos.forEach((imgSrc, index) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       const col = index % cols;
  //       const row = Math.floor(index / cols);
  //       const x = startX + col * (imageWidth + 10); // Add gap horizontally
  //       const y = 10 + row * (imageHeight + 10); // Add gap vertically
  //       ctx.drawImage(img, x, y, imageWidth, imageHeight);
  //       if (index + 1 === photos.length) {
  //         // Draw the text below the image
  //         const textX = x + imageWidth / 2; // center of the image
  //         const textY = y + imageHeight + 20; // 20px below the bottom of image
  //         ctx.fillText(`Photo ${photos.length}`, textX, textY);
  //       }
  //     };
  //     console.log("imgSrc", imgSrc);
  //     img.src = imgSrc;
  //   });
  // };

  // useEffect(() => {
  //   mergeImages();
  // }, []);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",

        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Booth Edit
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            ✨ Edit your captured photos with filters, adjustments, and creative
            effects before saving your final masterpiece.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "350px" } }}
            justifyContent="center"
          >
            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: "200px" }}
              onClick={onChangeStart}
            >
              START
            </Button> */}
          </Stack>
        </Stack>

        <Stack direction="row" gap={{ xs: 2, md: 8 }} flexWrap="wrap">
          <Stack alignItems="center" flexGrow={1}>
            <Stack maxWidth={365}>
              <KonvaCanvas
                setBaseImage={setStoreImg}
                stageColor={choosing}
                stageShape={shape}
                stickerUrl={stickerUrl}
                backgroundImg={backgroundImg}
                setStickerUrl={setStickerUrl}
              />
            </Stack>
          </Stack>

          <Stack px={2} gap={4}>
            {/* frame color photo */}
            <Stack gap={1}>
              <Typography>Choosing color:</Typography>
              {colorsChoosing(setBackgroundImg)}
            </Stack>

            {/* background image */}
            <Stack gap={1}>
              <Typography>Choosing background image:</Typography>
              {bgImageChoosing(setChoosing)}
            </Stack>

            {/* shapes choosing */}
            <Stack gap={1}>
              <Typography>Choosing shape:</Typography>
              {storeImg.length > 0 &&
                shapeChoosing({
                  imgWidth: storeImg[0].width / (storeImg.length > 4 ? 5 : 2),
                  imgHeight: storeImg[0].height / (storeImg.length > 4 ? 5 : 2),
                })}
            </Stack>

            {/* stickers choosing  */}
            <Stack gap={1}>
              <Typography>Choosing sticker:</Typography>
              {stickerChoosing()}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
