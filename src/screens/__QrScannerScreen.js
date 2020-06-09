import React, {useState} from 'react';
import {View, Dimensions, Alert, Vibration} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensions = screenWidth * 0.65;

const QrCodeScanner = ({navigation}) => {
  navigation.setOptions({header: () => null});
  const [scanner, setScanner] = useState(true);

  const handleRead = e => {
    // prevent failed scan
    if (!e.data) {
      scanner.reactivate();
      return;
    }

    Vibration.vibrate();

    // prevent scan different codes
    if (!e.data.startsWith('TICKET: ')) {
      Alert.alert('Error', 'Wrong code data', [
        {text: 'Ok', onPress: () => scanner.reactivate()},
      ]);
      return;
    }

    Alert.alert('Scaned', e.data, [
      {
        text: 'Ok',
        onPress: () =>
          navigation.navigate('TicketValidateScreen', {
            code: e.data,
          }),
      },
      {text: 'Cancel', onPress: () => scanner.reactivate()},
    ]);

    console.log(e.data);
  };

  return (
    <View>
      <QRCodeScanner
        showMarker
        flashMode={RNCamera.Constants.FlashMode.torch}
        vibrate={false}
        ref={node => setScanner(node)}
        onRead={handleRead}
        cameraStyle={{height: screenHeight, backgroundColor: 'black'}}
        reactivate={false}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay} />
            <View style={styles.flexRow}>
              <View style={styles.leftAndRightOverlay} />
              <View style={styles.rectangle} />
              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    </View>
  );
};

const styles = {
  flexRow: {
    flexDirection: 'row',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
    backgroundColor: overlayColor,
    paddingBottom: screenWidth * 0.25,
  },
  leftAndRightOverlay: {
    height: screenWidth * 0.65,
    width: screenWidth,
    backgroundColor: overlayColor,
  },
};

export default QrCodeScanner;
