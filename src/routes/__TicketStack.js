import {useTheme} from 'react-native-paper';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TicketScreen from '../screens/TicketScreen';
import TicketListScreen from '../screens/TicketListScreen';
import OpenDraweButton from '../components/OpenDraweButton';

import {defScreenOptions} from '../styles/global';

const TicketStack = createStackNavigator();

const TicketStackScreens = ({navigation}) => {
  const {colors} = useTheme();

  return (
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
};

export default TicketStackScreens;
