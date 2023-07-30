/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import RN_Speedo_Meter from './src/RN_Speedo_meter';
function App(): JSX.Element {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RN_Speedo_Meter
        value={10}
        size={200}
        centerLabelText={true}
        bottomLabelText={false}
        centerTextStyle={{color: 'red'}}></RN_Speedo_Meter>
    </View>
  );
}

export default App;
