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
              <Text style={styles.header}>About MAlert Ticket Scanner.</Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pharetra pharetra massa massa ultricies mi quis. Sit amet massa
                vitae tortor condimentum lacinia. Risus sed vulputate odio ut
                enim. Justo donec enim diam vulputate ut pharetra. Leo in vitae
                turpis massa sed elementum tempus egestas sed. Id cursus metus
                aliquam eleifend mi in nulla. Augue interdum velit euismod in
                pellentesque massa. Iaculis at erat pellentesque adipiscing.
                Tempor orci eu lobortis elementum nibh tellus molestie. Vitae
                elementum curabitur vitae nunc sed velit. At elementum eu
                facilisis sed odio. Aliquet sagittis id consectetur purus. Quam
                id leo in vitae turpis. Nunc sed blandit libero volutpat sed
                cras ornare arcu. Velit laoreet id donec ultrices. Purus ut
                faucibus pulvinar elementum integer enim neque volutpat.
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus.
                Tincidunt ornare massa eget egestas purus viverra accumsan.
                Mauris commodo quis imperdiet massa tincidunt. Id nibh tortor id
                aliquet lectus proin nibh nisl. Tellus integer feugiat
                scelerisque varius morbi enim. Cursus mattis molestie a iaculis.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames. Sagittis nisl rhoncus mattis rhoncus urna neque
                viverra justo. Erat imperdiet sed euismod nisi porta lorem
                mollis aliquam ut. Adipiscing elit pellentesque habitant morbi.
                Amet tellus cras adipiscing enim eu turpis. Eget mauris pharetra
                et ultrices neque ornare aenean. Quis vel eros donec ac odio
                tempor orci. Et malesuada fames ac turpis egestas sed. Et
                pharetra pharetra massa massa ultricies. Sed blandit libero
                volutpat sed cras ornare arcu. Libero volutpat sed cras ornare.
                Vestibulum morbi blandit cursus risus at ultrices mi tempus
                imperdiet. Non tellus orci ac auctor augue mauris augue.
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Diam volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque. Purus in massa tempor nec feugiat nisl.
                Accumsan in nisl nisi scelerisque. Semper auctor neque vitae
                tempus quam pellentesque nec nam aliquam. Nunc congue nisi vitae
                suscipit tellus mauris a diam. Auctor neque vitae tempus quam
                pellentesque nec nam. Nunc sed velit dignissim sodales. Morbi
                tristique senectus et netus et malesuada. Dictum non consectetur
                a erat. In nibh mauris cursus mattis molestie a iaculis at erat.
                Id volutpat lacus laoreet non curabitur. Ultrices in iaculis
                nunc sed augue lacus.
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Sed vulputate mi sit amet mauris commodo quis. Tempus iaculis
                urna id volutpat lacus laoreet non. In cursus turpis massa
                tincidunt dui ut ornare. Velit laoreet id donec ultrices
                tincidunt. Turpis nunc eget lorem dolor sed viverra ipsum nunc
                aliquet. Aliquet nec ullamcorper sit amet risus nullam eget
                felis eget. Leo integer malesuada nunc vel. Ac tortor vitae
                purus faucibus ornare suspendisse sed nisi. Quam vulputate
                dignissim suspendisse in. Fermentum dui faucibus in ornare. Hac
                habitasse platea dictumst vestibulum rhoncus.
              </Text>
              <Text style={{...styles.paragraph, color: colors.gray}}>
                Risus viverra adipiscing at in. Quam id leo in vitae. Varius
                morbi enim nunc faucibus. Malesuada fames ac turpis egestas sed
                tempus urna. Purus sit amet volutpat consequat mauris nunc
                congue nisi vitae. Enim neque volutpat ac tincidunt vitae semper
                quis lectus. Fusce id velit ut tortor pretium viverra. Eros in
                cursus turpis massa. Mattis enim ut tellus elementum sagittis
                vitae et. Dictum fusce ut placerat orci nulla pellentesque.
                Blandit libero volutpat sed cras. Placerat in egestas erat
                imperdiet sed euismod nisi. Ultricies leo integer malesuada nunc
                vel risus commodo viverra maecenas. Facilisis volutpat est velit
                egestas dui id ornare arcu.
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
