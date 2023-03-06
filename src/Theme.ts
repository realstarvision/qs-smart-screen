import { createTheme, Theme } from '@mui/material/styles';

// define constomize scheme

const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#aebdd8',
        },
        secondary: {
            main: '#9070af',
        },
        error: {
            main: '#f50057',
        },
        success: {
            main: '#4caf50',
        },
        info: {
            main: '#9cc8ed',
        },
        warning: {
            main: '#ff9800',
        },
        appb: {
            main: '#2f2f2f',
        },
        white: {
            main: '#AEBDD8',
        },
        // black: {
        //     main: '#1A1C25',
        //     light: '#212121',
        // },
        bt: {
            main: '#aebdd8',
            dark: '#697283',
            cont: '#c189d9',
        }
    },
    typography: {
        // define default fonts.
        // fontFamily: 'PingFangSC-Regular, PingFang SC',
    },
    '& .MuiPopover-root': {
        background: '#fff'
    }
} as any);

export default Theme