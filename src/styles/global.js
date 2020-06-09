import {StyleSheet} from 'react-native';

export const mStyles = StyleSheet.create({
  dirRow: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    alignSelf: 'center',
    paddingTop: 20,
  },
  textInput: {
    height: 44,
    marginTop: 20,
    backgroundColor: 'white',
  },
  buton: {
    height: 44,
    justifyContent: 'center',
    marginTop: 20,
  },
  successButton: {
    backgroundColor: '#00a28a',
  },
  errorMsg: {
    color: '#ea6759',
    fontSize: 14,
  },
});

export const defScreenOptions = {
  headerStyle: {backgroundColor: '#0179a8'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold'},
};
