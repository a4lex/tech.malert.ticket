import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <Icon.Button
      name="ios-menu"
      size={25}
      backgroundColor={colors.blue}
      onPress={() => navigation.openDrawer()}
    />
  );
};
