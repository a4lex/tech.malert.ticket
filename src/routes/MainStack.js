import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';
import {DrawerContent} from './DrawerContent';

import {theme} from '../styles/theme';
import {Context as AuthContext} from '../context/AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';

const Drawer = createDrawerNavigator();

const MainStack = () => {
  const {state, restoreSession} = useContext(AuthContext);

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {state.token ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="BottomTab" component={BottomTab} />
            {/* <Drawer.Screen name="TicketStack" component={TicketStack} /> */}
          </Drawer.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MainStack;
