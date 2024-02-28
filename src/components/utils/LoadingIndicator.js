import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#40A5E7" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:250,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
