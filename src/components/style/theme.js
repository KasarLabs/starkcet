import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d2d71',
        },
        secondary: {
            main: '#fe4e02',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    maxHeight: '50px',
                    borderRadius: '10px',
                },
                "root": {
                    "&.Mui-disabled": {
                        "color": "white"
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: '50px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: '50px',
                    borderRadius: '10px',
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                "root": {
                    transform: "scale(1, 1)",
                    margin: '5px'
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    backgroundColor: "transparent"
                }

            }
        }
    }
});

export default theme