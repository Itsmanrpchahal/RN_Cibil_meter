# React Native Cibil-meter

$ npm i react-native-cibil-meter
$ yarn add react-native-cibil-meter

/\*\*

- Sample React Native App
- https://github.com/facebook/react-native
-
- @format
  \*/

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
View,
} from 'react-native';

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

export default App;