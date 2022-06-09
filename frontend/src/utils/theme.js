import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiTypography: {
          defaultProps: {
            fontFamily: "'Rubik', sans-serif",
          },
          
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontFamily: "'Rubik', regular",
                    borderRadius: "5px",
                    background: "#f2f2f2",
                    paddingLeft: "5px"
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
          MuiAlert: {
            styleOverrides: {
                outlined:{
                    borderRadius: "10px",
                },
            },
          },
      }
}) 