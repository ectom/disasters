import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { store } from './store';
import Earthquakes from './components/Earthquakes';

function App() {
  const theme = createMuiTheme( {
    palette: {
      primary: {
        light: '#8eacbc',
        main: '#607d8c',
        dark: '#34515f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffa4a2',
        main: '#e57373',
        dark: '#af4448',
        contrastText: '#000',
      },
    }
  } );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar/>
          <Earthquakes/>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
