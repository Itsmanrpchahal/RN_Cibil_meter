import {SafeAreaView} from 'react-native';
// @ts-ignore
import React from 'react';
import {View, Image, Animated, Easing, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Utils
import calculateDegreeFromLabels from '../../RNSpeedMeter/src/utills/calculate-degree-from-labels';
import calculateLabelFromValue from '../../RNSpeedMeter/src/utills/calculate-label-from-value';
import limitValue from '../../RNSpeedMeter/src/utills/limit-value';
import validateSize from '../../RNSpeedMeter/src/utills/validate-size';
import style, {width as deviceWidth} from './style';

type RN_Speedo_MeterProps = {
  value?: number;
  defaultValue?: number;
  size?: number;
  minValue?: number;
  maxValue?: number;
  easeDuration?: number;
  allowedDecimals?: boolean;
  labels?: [];
  labelShow?: boolean;
  linearColor?: [];
  labelColor?: [];
  labelText?: string;
  needleImage?: Image;
  wrapperStyle?: object;
  outerCircleStyle?: any;
  bottomLabelText?: boolean;
  centerLabelText?: boolean;
  halfCircleStyle?: object;
  imageWrapperStyle?: object;
  imageStyle?: object;
  centerTextStyle?: object;
  innerCircleStyle?: object;
  labelWrapperStyle?: object;
  labelStyle?: object;
  labelNoteStyle?: object;
  useNativeDriver?: boolean;
};
const RN_Speedo_Meter: React.FC<RN_Speedo_MeterProps> = ({
  value,
  defaultValue = 50,
  size,
  minValue = 0,
  maxValue = 100,
  easeDuration = 500,
  bottomLabelText = false,
  centerLabelText = true,
  allowedDecimals = 0,
  labelShow = true,
  labels = [
    {
      name: 'Too Slow',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Very Slow',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    {
      name: 'Slow',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Normal',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Fast',
      labelColor: '#14eb6e',
      activeBarColor: '#14eb6e',
    },
    {
      name: 'Unbelievably Fast',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
  ],
  labelText,
  linearColor = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#EE82EE',
  ],
  labelColor = 'black',
  needleImage = require('../src/assets/speedometerneedle.png'),
  wrapperStyle,
  outerCircleStyle,
  halfCircleStyle,
  imageWrapperStyle,
  centerTextStyle = {marginTop: -70, marginRight: 5, color: 'black'},
  imageStyle,
  innerCircleStyle,
  labelWrapperStyle,
  labelStyle,
  labelNoteStyle,
  useNativeDriver,
}) => {
  const speedometerValue = new Animated.Value(defaultValue);
  const degree = 180;
  const perLevelDegree = calculateDegreeFromLabels(degree, labels);
  const label = calculateLabelFromValue(
    limitValue(value, minValue, maxValue, allowedDecimals),
    labels,
    minValue,
    maxValue,
  );
  Animated.timing(speedometerValue, {
    toValue: limitValue(value, minValue, maxValue, allowedDecimals),
    duration: easeDuration,
    easing: Easing.linear,
    useNativeDriver,
  }).start();

  const rotate = speedometerValue.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: ['-90deg', '90deg'],
  });

  const currentSize = validateSize(size, deviceWidth - 20);
  return (
    <SafeAreaView>
      <View
        style={[
          style.wrapper,
          {
            width: currentSize,
            height: currentSize / 2,
          },
          wrapperStyle,
        ]}>
        <LinearGradient
          colors={linearColor}
          style={[
            style.outerCircle,
            {
              width: currentSize,
              height: currentSize / 2,
              borderTopLeftRadius: currentSize / 2,
              borderTopRightRadius: currentSize / 2,
            },
            outerCircleStyle,
          ]}>
          {labelShow &&
            labels.map((level, index) => {
              const circleDegree = 90 + index * perLevelDegree;
              return (
                <View
                  key={level.name}
                  style={[
                    style.halfCircle,
                    {
                      backgroundColor: level.activeBarColor,
                      width: currentSize / 2,
                      height: currentSize,
                      borderRadius: currentSize / 2,
                      transform: [
                        {translateX: currentSize / 4},
                        {rotate: `${circleDegree}deg`},
                        {translateX: (currentSize / 4) * -1},
                      ],
                    },
                    halfCircleStyle,
                  ]}
                />
              );
            })}
          <Animated.View
            style={[
              style.imageWrapper,
              {
                top: -(currentSize / 15),
                transform: [{rotate}],
              },
              imageWrapperStyle,
            ]}>
            <Image
              style={[
                style.image,
                {
                  width: currentSize,
                  height: currentSize,
                },
                imageStyle,
              ]}
              source={needleImage}
            />
          </Animated.View>
          <View
            style={[
              style.innerCircle,
              {
                width: currentSize * 0.8,
                height: (currentSize / 2) * 0.8,
                borderTopLeftRadius: currentSize / 2,
                borderTopRightRadius: currentSize / 2,
              },
              innerCircleStyle,
            ]}
          />
        </LinearGradient>
        <View style={[style.labelWrapper, labelWrapperStyle]}>
          {centerLabelText && (
            <Text
              style={[
                style.label,
                labelStyle,
                centerTextStyle,
                {marginTop: -60, marginRight: 5},
              ]}>
              {limitValue(value, minValue, maxValue, allowedDecimals)}
            </Text>
          )}

          {bottomLabelText && (
            <Text style={[style.label, labelStyle]}>
              {limitValue(value, minValue, maxValue, allowedDecimals)}
            </Text>
          )}
          {bottomLabelText && (
            <Text
              style={[style.labelNote, {color: labelColor}, labelNoteStyle]}>
              {labelText}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RN_Speedo_Meter;
