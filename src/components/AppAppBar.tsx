"use client";

import CameraIcon from "@mui/icons-material/Camera";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import ColorModeIconDropdown from ".././theme/ColorModeIconDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }: { theme: any }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDonate = Boolean(anchorEl);

  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Link href={`/`}>
              <CameraIcon color="primary" sx={{ mt: 0.5 }} />
            </Link>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                <Link href={`/`}>Home</Link>
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* <Button color="primary" variant="text" size="small">
              Sign in
            </Button> */}
            <Button
              color="primary"
              size="small"
              id="donate-menu"
              aria-controls={openDonate ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openDonate ? "true" : undefined}
              onClick={handleClick}
            >
              Donate
            </Button>
            <Menu
              id="donate-menu"
              open={openDonate}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <MenuItem>
                <Link href="https://pay.ababank.com/n2LR4DbbjGkAt3Co9">
                  <Typography
                    sx={{
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                      width: 150,
                    }}
                  >
                    https://pay.ababank.com/n2LR4DbbjGkAt3Co9
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <img src="/aba.jpg" style={{ maxWidth: 150 }} />
              </MenuItem>
            </Menu>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem
                  id="donate-menu"
                  onClick={(e) => handleClick(e as any)}
                >
                  Donate
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {/* <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem> */}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
