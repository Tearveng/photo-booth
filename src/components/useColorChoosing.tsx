import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

const codeColor = [
  "#152a25",
  "#a0c515",
  "#80a6d0",
  "#b6d463",
  "#6897bb",
  "#ffc3a0",
  "#cae1ff",
  "#a96758",
  "#6b8b69",
  "#c49c64",
  "#8ee7e7",
  "#ff6c91",
  "#f5d4cd",
  "#701e66",
  "#edd351",
];

export const useColorChoosing = () => {
  const [choosing, setChoosing] = useState<string>("#152a25");

  const handleOnChangeColor = (code: string) => {
    setChoosing(code);
  };

  const colorJSX = (code: string) => {
    return (
      <Stack
        sx={{
          border: code === choosing ? "1px solid #dfcbc9" : "none",
          p: 0.4,
          borderRadius: 20,
        }}
      >
        <Stack
          width={25}
          height={25}
          bgcolor={code}
          sx={{ borderRadius: 20 }}
        ></Stack>
      </Stack>
    );
  };

  const colorsChoosing = (
    setBgImage: Dispatch<SetStateAction<HTMLImageElement | null>>
  ) => {
    const generateColor = codeColor.map((c, index) => ({
      id: index + 1,
      code: c,
    }));

    return (
      <Stack direction="row" gap={1} flexWrap="wrap" maxWidth={350}>
        {generateColor.map((g) => (
          <Stack
            key={g.id}
            onClick={() => {
              setBgImage(null);
              handleOnChangeColor(g.code);
            }}
          >
            {colorJSX(g.code)}
          </Stack>
        ))}
      </Stack>
    );
  };

  return { colorsChoosing, choosing, setChoosing };
};
