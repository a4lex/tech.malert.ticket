import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Context as AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {
    state: {
      info: {longname},
    },
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={{...styles.welcome, color: colors.text}}>
        Welcome {longname}.
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
