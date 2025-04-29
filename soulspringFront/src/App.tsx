import CssBaseline from '@mui/material/CssBaseline'
import { useMemo } from 'react'
import { generateAppTheme } from './theme/theme'
import { useAppSelector } from './redux/hooks'
import { Routers } from './routes/Routers'
import { BrowserRouter } from 'react-router-dom'
import AppAlert from '@components/appAlert/AppAlert'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify';

function App() {
  const { mode } = useAppSelector((state) => state.theme)
  const theme = useMemo(() => generateAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAlert />
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

    </ThemeProvider>
  )
}

export default App
