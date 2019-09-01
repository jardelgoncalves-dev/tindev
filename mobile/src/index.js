import React from 'react';
import { YellowBox } from 'react-native'
import Routes from './routes'

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket",
  "Can't perform a React state update"
])

export default function App () {
  return (
    <Routes />
  )
}