import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import TicketScreen from '../screens/TicketScreen';
import TicketListScreen from '../screens/TicketListScreen';

import {defScreenOptions} from '../styles/global';
import OpenDraweButton from '../components/OpenDraweButton';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TicketStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="HomeStack"
        component={HomeStackComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="TicketStack"
        component={TicketStackComponent}
        options={{
          tabBarLabel: 'Tickets',
          tabBarIcon: ({color}) => (
            <Icon name="qrcode" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackComponent}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color}) => (
            <Icon name="information" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const HomeStackComponent = () => (
  <HomeStack.Navigator screenOptions={defScreenOptions}>
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{title: '', headerLeft: () => <OpenDraweButton />}}
    />
  </HomeStack.Navigator>
);

const ProfileStackComponent = () => (
  <ProfileStack.Navigator screenOptions={defScreenOptions}>
    <ProfileStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{title: 'Profile', headerLeft: () => <OpenDraweButton />}}
    />
  </ProfileStack.Navigator>
);

const TicketStackComponent = () => (
  <TicketStack.Navigator screenOptions={defScreenOptions}>
    <TicketStack.Screen
      name="TicketListScreen"
      component={TicketListScreen}
      options={{title: 'Used Tickets', headerLeft: () => <OpenDraweButton />}}
    />
    <TicketStack.Screen
      name="TicketScreen"
      component={TicketScreen}
      options={{title: 'Ticket'}}
    />
  </TicketStack.Navigator>
);
