import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const LoadSpinner = ({ size = 'large', color = '#197d48', containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadSpinner;
