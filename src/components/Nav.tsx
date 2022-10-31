import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { pNav } from "../types/pNav";

function Nav({ mode, setMode }: pNav) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Budget control app
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
