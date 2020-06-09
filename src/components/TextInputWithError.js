import React from 'react';
import * as Animatable from 'react-native-animatable';

import {TextInput} from 'react-native-paper';
import {Text, View} from 'react-native';
import {mStyles} from '../styles/global';
import {ucfirst} from '../helpers/stringHelpers';

export default function TextInputWithError({
  label,
  value,
  keyboardType,
  handleChange,
  displayError,
  errorMessage,
  handleBlur,
}) {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        error={displayError}
        multiline={false}
        style={mStyles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
      />
      {!displayError ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={mStyles.errorMsg}>{ucfirst(errorMessage)}</Text>
        </Animatable.View>
      )}
    </View>
  );
}

TextInputWithError.defaultProps = {
  keyboardType: 'default',
};
