import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Title, Caption, Paragraph, Drawer} from 'react-native-paper';

import {Context as AuthContext} from '../context/AuthContext';

export function DrawerContent(props) {
  const {
    state: {
      info: {longname, mail, balance},
    },
    signout,
    getUserInfo,
  } = useContext(AuthContext);

  React.useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.flexOne}>
      <DrawerContentScrollView {...props}>
        <View style={styles.flexOne}>
          <View style={styles.userInfoSection}>
            <View style={styles.userInfo}>
              <Title style={styles.title}>{longname}</Title>
              <Caption style={styles.caption}>{mail}</Caption>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Balance</Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {balance}
                </Paragraph>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="qrcode-scan" color={color} size={size} />
              )}
              label="Tickets"
              onPress={() => {
                props.navigation.navigate('TicketStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="information-outline" color={color} size={size} />
              )}
              label="About"
              onPress={() => {
                props.navigation.navigate('AboutScreen');
              }}
            />
          </Drawer.Section>
          {/* cool element - do not forget use it for something
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                console.log('Bla bla bla pressed');
              }}>
              <View style={styles.preference}>
                <Text>Bla bla bla</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={signout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
  },
  userInfo: {
    marginLeft: 5,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
