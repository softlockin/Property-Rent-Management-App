import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      bsx: 400,
      bss: 450,
      sm: 600,
      lmd: 850,
      md: 950,
      lg: 1320,
      xl: 1536,
    },
  },
  palette:{
    primary:{
      main: "#1976d2",
      light: "#e8f4fd",
    },
    secondary:{
      main: "#388e3c",
      light: "#ecf7ed",
    }
  },
  components: {
      MuiTypography: {
        defaultProps: {
          fontFamily: "'Rubik', sans-serif",
        },
        
      },
      MuiFormHelperText: {
          styleOverrides: {
              root: {
                  width: "70%",
                  fontFamily: "'Rubik', regular",
                  borderRadius: "5px",
                  background: "#f2f2f2",
                  paddingLeft: "5px",
                  margin: "3px 14px 0px 14px",
                },
          },
        },
      MuiButton: {
          defaultProps: {
              disableRipple: true,
              size: "large",
          },
          styleOverrides: {
            root: {
              // border: "1px solid #feda00",
              // color: "#000",
              boxShadow: "0 0 0",
              transitionDuration: "0s !important",
              '&:hover': {
                  // backgroundColor: '#fff',
                  // color: '#000',
                  boxShadow: "0 0 0"
              },
              // background: "#feda00",
              fontFamily: "'Rubik', regular",
              textTransform: "none",
              borderRadius:"10px"
            },
          },
        },
        MuiToggleButton: {
          defaultProps: {
              disableRipple: true,
          },
          styleOverrides: {
            root: {
              justifyContent: "left",
              fontFamily: "'Rubik', regular",
              textTransform: "none",
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              fontFamily: "'Rubik', regular",
            },
            shrink: {
              "&.Mui-focused": {
                color: "#666"
              }
            }
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
              root:{
                  borderRadius: "10px",
              },
              input: {
                  // Some CSS
                  fontFamily: "'Rubik', regular",
              },
          },
        },
        MuiFilledInput:{
          styleOverrides: {
            root:{
              fontFamily: "'Rubik', regular",
              border: '1px solid #e2e2e1',
              overflow: 'hidden',
              borderRadius: '10px',
              backgroundColor: 'transparent',
            },
            
          }
        },
        MuiMenuItem:{
          styleOverrides: {
            root: {
              fontFamily: "'Rubik', regular",
            }
          }
        },
        MuiSelect:{
          styleOverrides: {
            select: {
              fontFamily: "'Rubik', regular",
            }
          }
        },
        MuiPopover:{
          styleOverrides: {
            paper: {
              maxHeight: "200px",
            }
          }
        },
        MuiAlert: {
          styleOverrides: {
              outlined:{
                  borderRadius: "10px",
              },
          },
        },
    }
}) 