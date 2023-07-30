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
    <View style={{width: '100%'}}>
      <RN_Speedo_Meter
        value={10}
        size={200}
        centerLabelText={true}
        centerTextStyle={{color: 'red'}}></RN_Speedo_Meter>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
