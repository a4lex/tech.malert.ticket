import {useTheme} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [logoWidth, setLogoWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    const {width, height} = Image.resolveAssetSource(
      require('../../assets/images/logo.png'),
    );
    const winSize = Dimensions.get('window');
    setLogoWidth(winSize.width * 0.8);
    setLogoHeight(((winSize.width * 0.8) / width) * height);
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: colors.white}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../assets/images/logo.png')}
          style={{width: logoWidth, height: logoHeight}}
          resizeMode="contain"
        />
      </View>
      <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
        <Text style={{...styles.title, color: colors.blue}}>
          Enterprise Mobile Messenger!
        </Text>
        <Text style={{...styles.text, color: colors.gray}}>
          Sign in with account
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
            <View style={{...styles.signIn, backgroundColor: colors.blue}}>
              <Text style={{...styles.textSign, color: colors.white}}>
                Get Started
              </Text>
              <MaterialIcons
                name="navigate-next"
                color={colors.white}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    fontWeight: 'bold',
  },
});
