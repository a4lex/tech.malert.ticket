import React, {useState} from 'react';

import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from 'react-native-paper';

const AboutScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [progress, setProgress] = useState({
    isLoaded: false,
    isError: false,
  });

  if (!progress.isError) {
    return (
      <>
        <WebView
          source={{uri: 'https://malert.tech/tickets/about.php'}}
          onLoad={() => setProgress({isLoaded: true, isError: false})}
          onError={() => setProgress({isLoaded: true, isError: true})}
        />
        {!progress.isLoaded && (
          <ActivityIndicator style={styles.preloader} size="large" />
        )}
      </>
    );
  } else {
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.header}>About Us.</Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                mAlert is a Digital Communication & Marketing Platform, handling
                more than 130000 users across the Globe. We help you seamlessly
                integrate to deliver new service for consumer engagement across
                all mobile channels. Our SaaS, cloud-based technology enables
                brands to intelligently personalize mobile communications for
                the Omni-channel consumers, across marketing and customer care
                interactions, with a single cloud panel and a robust set of open
                APIs, across channels, including SMS, Voice, Push, eMails,
                Social Media and Social Media Apps (OTT).
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Contact{'\n'}
                Argos Technology Resources Private Limited{'\n'}
                70, BeckBagan Row.{'\n'}
                4th Floor, Suite No.4A{'\n'}
                Kolkata-700 017{'\n'}
                eMail: admin@malert.tech
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                © MAlert Tech. All Rights Reserved
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    letterSpacing: 1,
  },
  paragraph: {
    paddingTop: 12,
    textAlign: 'left',
  },
  preloader: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
