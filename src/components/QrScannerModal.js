import React, {useState} from 'react';
import {View, Dimensions, Modal, Platform} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeArea} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';

export default function QrScannerModal({modalVisible, closeModal, handleData}) {
  const [scanner, setScanner] = useState(true);
  const insets = useSafeArea();

  const handleRead = e => {
    // prevent failed scan
    if (!e.data) {
      scanner.reactivate();
      return;
    }
    handleData({data: e.data, scanner: scanner});
  };

  return (
    <Modal visible={modalVisible} onRequestClose={closeModal}>
      <View>
        <QRCodeScanner
          showMarker
          cameraStyle={{height: screenHeight}}
          vibrate={false}
          ref={node => setScanner(node)}
          onRead={handleRead}
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
        {Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={() => closeModal()}>
            <Icon
              style={{...styles.closeModal, top: insets.top + 10}}
              color="#fff"
              name="md-close"
              size={35}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </Modal>
  );
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensions = screenWidth * 0.65;
const styles = {
  flexRow: {
    flexDirection: 'row',
  },
  closeModal: {
    position: 'absolute',
    left: 25,
    backgroundColor: 'rgba(52, 52, 52, 0)',
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
