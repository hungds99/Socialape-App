export default {
  palette: {
    primary: {
      main: "#2F72FF",
      light: "#33c9dc",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ff3d00",
      light: "#ff6333",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
      fontSize: 10,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
    },
    form: {
      textAlign: "center"
    },
    textField: {
      width: "100%",
      marginBottom: 20
    },
    textError: {
      color: "red",
      marginBottom: 10
    },
    button: {
      position: "relative"
    },
    progress: {
      position: "absolute"
    },
    invisibleSeparator: {
      border: "none",
      marign: 4
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    }
  }
};
