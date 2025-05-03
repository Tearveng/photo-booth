import { Stack } from "@mui/material";

interface IFrameLayout {
  poses: number;
}

export default function FrameLayout(props: IFrameLayout) {
  if (props.poses === 6) {
    return (
      <Stack>
        <Stack
          bgcolor="#fff"
          alignItems="center"
          maxWidth="174px"
          borderRadius={0.5}
          p={0.5}
          gap={0.5}
          direction="row"
          flexWrap="wrap"
        >
          {Array.from({ length: props.poses }, (_, index) => (
            <img
              key={index + 1}
              src="./frame_image.png"
              alt="frame"
              width="81px"
              height="81px"
              style={{ objectFit: "cover" }}
            />
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack
        bgcolor="#fff"
        alignItems="center"
        borderRadius={0.5}
        p={0.5}
        gap={0.5}
      >
        {Array.from({ length: props.poses }, (_, index) => (
          <img
            key={index + 1}
            src="./frame_image.png"
            alt="frame"
            width="100px"
            height="100px"
            style={{ objectFit: "cover" }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
