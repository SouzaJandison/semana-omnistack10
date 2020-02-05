import React from 'react';
import { StatusBar, YellowBox } from 'react-native'

import Routes from './src/routes'

//Não amostra bug do socket.io
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7"/>
      <Routes />
    </>
  );
}
