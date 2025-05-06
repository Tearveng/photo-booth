// components/Footer.js
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
        mt: 4,
        color: "text.secondary",
      }}
    >
      <Typography variant="body2">Version 1.0.0</Typography>
      <Typography variant="body2">
        Made by{" "}
        <Link
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          Veng Tear
        </Link>{" "}
        — All rights reserved © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
