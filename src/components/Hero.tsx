"use client";

import { emailRegex } from "@/utils/common";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import FrameLayout from "./FrameLayout";

const StyledBox = styled("div")(({ theme }: { theme: any }) => ({
  alignSelf: "center",
  scale: 1,
  width: "100%",
  height: 520,
  marginTop: theme.spacing(4),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(./thumbnail.png)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 1800,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(./thumbnail.png)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // onChange email
  const onChangeEmail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setEmail(value);
  };

  // validate email
  const validateEmail = () => {
    return emailRegex.test(email);
  };

  // onSubmit email
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/booth-welcome");
    // const validEmail = validateEmail();
    // if (!validEmail) {
    //   setError("Please enter a valid email address.");
    // } else {
    //   setError("");
    //   router.push("/booth-welcome");
    // }
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
      <form id="email-submit" onSubmit={(e) => onSubmit(e)}>
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
              {/* Wrap "Photo" in a Box and hide it on xs screens */}
              <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                Photo&nbsp;
              </Box>
              <Typography
                component="span"
                variant="h1"
                sx={(theme) => ({
                  fontSize: "inherit",
                  color: "primary.main",
                  ...theme.applyStyles("dark", {
                    color: "primary.light",
                  }),
                })}
              >
                booth
              </Typography>
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                width: { sm: "100%", md: "80%" },
              }}
            >
              ✨ Make it fun. Make it fierce. Make it YOU! Snap a silly face, a
              sweet smile, or a surprise moment — and don’t forget to share your
              masterpiece after!
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
            >
              <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
                Email
              </InputLabel>
              <Stack width="100%">
                <TextField
                  id="email-hero"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  fullWidth
                  onChange={(e) => onChangeEmail(e)}
                  slotProps={{
                    htmlInput: {
                      autoComplete: "off",
                      "aria-label": "Enter your email address",
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ textAlign: "start" }}
                >
                  {error}
                </Typography>
              </Stack>

              <Button
                type="submit"
                form="email-submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: "fit-content" }}
              >
                Start now
              </Button>
              {/* <Button
              // loading
              // loadingIndicator="Loading…"
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: "fit-content" }}
            >
              Loading ...
            </Button> */}
            </Stack>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              By clicking &quot;Start now&quot; you agree to our&nbsp;
              <Link href="#" color="primary">
                Terms & Conditions
              </Link>
              .
            </Typography>
          </Stack>
          <br />
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Stack>
              <Typography>1 pose</Typography>
              <FrameLayout poses={1} />
            </Stack>
            <Stack>
              <Typography>2 pose</Typography>
              <FrameLayout poses={2} />
            </Stack>
            <Stack>
              <Typography>4 pose</Typography>
              <FrameLayout poses={4} />
            </Stack>{" "}
            <Stack>
              <Typography>6 pose</Typography>
              <FrameLayout poses={6} />
            </Stack>
          </Stack>
        </Container>
      </form>
    </Box>
  );
}
