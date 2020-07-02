import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function FullScreenMessage({message}) {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
