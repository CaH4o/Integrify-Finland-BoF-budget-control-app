import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton, useTheme} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../App";

function Nav() {
  const themeMode = useTheme();
  const colorMode = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => colorMode.toggleMode()}
        >
          {themeMode.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Budget control app
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
