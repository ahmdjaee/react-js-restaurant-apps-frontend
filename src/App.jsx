import {RouterProvider} from "react-router-dom";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { router } from './routes/routes';

const baseTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                warning: {
                    solidBg: '#eab308', // yellow bg-500
                    solidHoverBg: '#ca8a04', // yellow bg-600
                    solidActiveBg: '#ca8a04', // yellow bg-600
                    outlinedColor: '#ca8a04', // yellow bg-600
                    outlinedBorder: '#eab308', // yellow bg-500
                    outlinedHoverBorder: undefined,
                    outlinedHoverBg: '#fef3c7',  // yellow bg-100
                    outlinedActiveBg: '#ca8a04', // yellow bg-600
                },
                focusVisible: 'rgba(66, 153, 225, 0.6)',
            },
        },
    }, 
});

export default function App() {
    return (
        <CssVarsProvider theme={baseTheme}>
            <RouterProvider router={router} />
        </CssVarsProvider>
    );
}