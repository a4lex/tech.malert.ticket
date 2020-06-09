import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

import Card from '../components/Card';
import TextInputWithError from '../components/TextInputWithError';
import {Button, TextInput} from 'react-native-paper';
import {
  Alert,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {mStyles} from '../styles/global';
import {Context as AuthContext} from '../context/AuthContext';

const profileSchema = yup.object({
  address: yup
    .string()
    .required('Address is required')
    .min(16, 'Address is to short')
    .max(255, 'Address is to long'),
  longname: yup
    .string()
    .required()
    .required('Name is required')
    .min(10, 'Name is to short')
    .max(255, 'Name is to long'),
  phone: yup
    .string()
    .required()
    .test('is-phone', 'Wrong phone number', val =>
      val.match(/^[1-9][0-9]{6,14}$/),
    ),
});

const AccountScreen = ({navigation}) => {
  const {
    setUserInfo,
    state: {info},
  } = useContext(AuthContext);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = values => {
    setIsUpdating(true);
    setUserInfo(values, ({result, message}) => {
      setIsUpdating(false);
      Alert.alert(result ? 'Success' : 'Failed', message, [{text: 'Ok'}]);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={mStyles.container}>
          <Card>
            <StatusBar barStyle="dark-content" />
            <Text style={mStyles.cardTitle}>
              <Icon name="account" size={35} /> Update Profile
            </Text>
            <Formik
              validationSchema={profileSchema}
              initialValues={{
                address: info.address,
                longname: info.longname,
                phone: info.phone,
              }}
              onSubmit={values => {
                handleSubmit(values);
              }}>
              {props => (
                <View>
                  <TextInput
                    mode="outlined"
                    label="EMail"
                    disabled
                    style={mStyles.textInput}
                    value={info.mail}
                  />
                  <TextInputWithError
                    label="Name"
                    value={props.values.longname}
                    handleChange={props.handleChange('longname')}
                    handleBlur={props.handleBlur('longname')}
                    displayError={props.errors.longname}
                    errorMessage={props.errors.longname}
                  />
                  <TextInputWithError
                    label="Phone"
                    value={props.values.phone}
                    handleChange={props.handleChange('phone')}
                    handleBlur={props.handleBlur('phone')}
                    displayError={props.errors.phone}
                    errorMessage={props.errors.phone}
                    keyboardType="numeric"
                  />
                  <TextInputWithError
                    label="Address"
                    value={props.values.address}
                    handleChange={props.handleChange('address')}
                    handleBlur={props.handleBlur('address')}
                    displayError={props.errors.address}
                    errorMessage={props.errors.address}
                  />
                  <Button
                    style={{...mStyles.successButton, ...mStyles.buton}}
                    mode="contained"
                    loading={isUpdating}
                    disabled={isUpdating}
                    onPress={props.handleSubmit}>
                    Update
                  </Button>
                </View>
              )}
            </Formik>
          </Card>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AccountScreen;
