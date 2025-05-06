"use client";

import { dispatchLayoutChoosing } from "@/redux/slices/application";
import { brand } from "@/theme/themePrimitives";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FrameLayout from "./FrameLayout";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  height: 60,
  minWidth: 200,
}));

const layoutData = [
  {
    name: "Layout A",
    poses: 1,
  },
  {
    name: "Layout B",
    poses: 2,
  },
  {
    name: "Layout C",
    poses: 4,
  },
  {
    name: "Layout D",
    poses: 6,
  },
];

interface ISelectingLayout {
  name: string;
  poses: number;
}

export default function LayoutChoosing() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectLayout, setSelectLayout] =
    useState<ISelectingLayout[]>(layoutData);
  const [selectPose, setSelectPose] = useState<number>(1);
  const onChangeLayout = (pose: number) => {
    setSelectPose(pose);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      dispatchLayoutChoosing({
        layoutChoosing: selectPose,
        name: selectLayout.find((s) => s.poses === selectPose)?.name ?? "",
      })
    );
    router.push("/booth-photo");
  };

  return (
    <form id="layout-submit" onSubmit={onSubmit}>
      <Stack alignItems="center" justifyContent="center">
        <Button
          type="submit"
          form="layout-submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ maxWidth: "fit-content" }}
        >
          Continue
        </Button>
        <Grid container spacing={2}>
          <Grid size={{ sm: 6, md: 12 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                // bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {selectLayout.map((elevation) => (
                <Item
                  onClick={() => onChangeLayout(elevation.poses)}
                  key={elevation.poses}
                  elevation={elevation.poses === selectPose ? 0 : 1}
                  sx={{
                    height: "auto",
                    border:
                      elevation.poses === selectPose
                        ? `1px solid ${brand[400]}`
                        : "none",
                  }}
                >
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    py={2}
                    px={1.5}
                  >
                    <FrameLayout poses={elevation.poses} />
                    <Typography
                      sx={{
                        textAlign: "center",
                        width: { sm: "100%" },
                      }}
                    >
                      {elevation.name}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        width: { sm: "100%" },
                      }}
                    >
                      {elevation.poses}&nbsp;pose
                    </Typography>
                  </Stack>
                </Item>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}
