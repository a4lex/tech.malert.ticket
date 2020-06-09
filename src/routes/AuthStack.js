import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AuthStack = createStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="SigninScreen" component={SigninScreen} />
    <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    <AuthStack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
