import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Agenda from './src/screens/Agenda';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Agenda />
    </GestureHandlerRootView>
  );
}
