"use client";

import { useAppSelector } from "@/redux/store";
import {
  Box,
  Container,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Camera from "./Camera";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  //   color: theme.palette.text.secondary,
  height: 60,
  minWidth: 200,
}));

export default function BoothCapture() {
  const { layout } = useAppSelector((state) => state.applicationSlice);
  const [selectCountDown, setSelectCountDown] = useState<string>("3");

  const onChangeSelectCountDown = (e: SelectChangeEvent) => {
    setSelectCountDown(e.target.value);
  };

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
          <Stack
            direction="row"
            gap={2}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                fontSize: "clamp(1rem, 8vw, 3.5rem)",
              }}
            >
              Camera
            </Typography>
            {/* <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: 18, minWidth: 200 }}
            >
              Camera
            </Button>
            <Button variant="contained" sx={{ fontSize: 18, minWidth: 200 }}>
              Upload Image
            </Button> */}
          </Stack>
          <Item
            elevation={1}
            sx={{
              height: "auto",
              p: 1,
            }}
          >
            {`Selected layout ${layout.name} (${layout.layoutChoosing} photos)`}
          </Item>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              Select countdown time:
            </Typography>
            <Select
              value={selectCountDown}
              size="small"
              onChange={onChangeSelectCountDown}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "350px" } }}
            justifyContent="center"
          >
            <Camera seconds={Number(selectCountDown)} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
