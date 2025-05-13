import Crop75OutlinedIcon from "@mui/icons-material/Crop75Outlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Stack } from "@mui/material";
import { ContainerConfig } from "konva/lib/Container";
import { JSX, useState } from "react";

export interface IUseShapeChoosing {
  id: number;
  icon: JSX.Element;
  shapeType: string;
}

export interface IImageCanvas {
  imgWidth: number;
  imgHeight: number;
}

const shapes: Omit<IUseShapeChoosing, "id">[] = [
  {
    shapeType: "none",
    icon: <DoNotDisturbAltOutlinedIcon />,
  },
  {
    shapeType: "heart",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    shapeType: "rect",
    icon: <Crop75OutlinedIcon />,
  },
];

const shapesValue = (
  imgWidth: number,
  imgHeight: number
): { [k: string]: ContainerConfig } => ({
  none: {},
  heart: {
    clipFunc: (ctx) => {
      const w = imgWidth;
      const h = imgHeight;
      // Start the path for the heart shape
      ctx.beginPath();
      // ctx.moveTo(w / 2, h * 0.8);
      ctx.moveTo(w / 2, h);

      // Top right curve — pulled far out
      // Top right curve
      ctx.bezierCurveTo(
        w * 1.2, // not as far outside to the right
        h * 0.75, // lower to widen shape
        w * 1.1,
        h * 0.0, // top dip (a bit lower)
        w / 2,
        h * 0.25 // top center dip
      );

      // Top left curve
      ctx.bezierCurveTo(w * -0.1, h * 0.0, w * -0.2, h * 0.75, w / 2, h);
      // Close the path and apply clipping
      ctx.closePath();
      ctx.clip(); // Apply clipping
    },
  },
  rect: {
    clipFunc: (ctx) => {
      const radius = 20;
      const width = imgWidth;
      const height = imgHeight;

      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
    },
  },
});

export const useShapeChoosing = () => {
  const [shape, setShape] = useState<{
    tShape: ContainerConfig;
  }>();

  const handleOnChangeShape = (imgCanvas: IImageCanvas, shapeType: string) => {
    const shape = shapesValue(imgCanvas.imgWidth, imgCanvas.imgHeight)[
      shapeType
    ];
    setShape((prev) => ({ ...prev, tShape: shape }));
  };

  const shapeChoosing = (props: IImageCanvas) => {
    const generateShape = shapes.map((c, index) => ({
      id: index + 1,
      ...c,
    }));

    return (
      <Stack direction="row" gap={1} flexWrap="wrap" maxWidth={350}>
        {generateShape.map((g) => (
          <Stack
            key={g.id}
            onClick={() => handleOnChangeShape(props, g.shapeType)}
          >
            {g.icon}
          </Stack>
        ))}
      </Stack>
    );
  };

  return { shapeChoosing, shape };
};
