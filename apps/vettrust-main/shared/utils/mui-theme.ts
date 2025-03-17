/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { createTheme } from "@mui/material/styles";
import * as tailwindTheme from "../../tailwind.config";

const colors = tailwindTheme.theme?.extend?.colors;

const themeConstants = {
  paper: colors?.vtBG?.DEFAULT,
  primary: {
    main: colors.darkBlue.DEFAULT,
    dark: colors.darkBlue.pressed,
  },
  secondary: {
    main: colors.magenta.DEFAULT,
    dark: colors.magenta.pressed,
  },
  error: {
    main: colors.error.DEFAULT,
    dark: colors.error.pressed,
  },
  breakpoints: {
    xs: 0,
    mb: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

export default createTheme({
  shadows: new Array(25).fill(null).map(() => "none"),
  palette: {
    primary: themeConstants.primary,
    secondary: themeConstants.secondary,
    background: { paper: themeConstants.paper },
    error: themeConstants.error,
  },
  breakpoints: {
    values: themeConstants.breakpoints,
  },
});
