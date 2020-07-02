import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';

import Axios from 'axios';
import moment from 'moment';
import malertApi, {parseApiResponse} from '../api/malert';

import {Alert, View, StyleSheet, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Card from '../components/Card';
import FullScreenPreload from '../components/FullScreenPreload';
import FullScreenMessage from '../components/FullScreenMessage';
import {mStyles} from '../styles/global';

const TicketListScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const [ticket, setTicket] = useState({...route.params, fromServer: false});
  console.log(route);
  const [progress, setProgress] = useState({
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    let cancel;
    let _cancelToken = Axios.CancelToken;
    let mounted = true;
    malertApi
      .get('/tickets.php', {
        params: {id: ticket.id},
        cancelToken: new _cancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(response => {
        setProgress({isLoading: false, errorMessage: null});
        setTicket({...response.data, fromServer: true});
      })
      .catch(error => {
        if (mounted) {
          let {message} = parseApiResponse(error.response);
          setProgress({isLoading: false, errorMessage: message});
        }
      });

    return () => {
      mounted = false;
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isUpdating, setIsUpdating] = useState(false);
  const handleSubmit = () => {
    setIsUpdating(true);
    // memory leak if user leave screen
    malertApi
      .put('tickets.php', {
        id: ticket.id,
        used: 1,
      })
      .then(response => {
        setTicket({...response.data, fromServer: true});
      })
      .catch(error => {
        Alert.alert('Failed', error.message, [{text: 'Ok'}]);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  if (progress.isLoading) {
    return <FullScreenPreload />;
  } else if (progress.errorMessage) {
    return <FullScreenMessage message={progress.errorMessage} />;
  }

  return (
    <View style={mStyles.container}>
      <StatusBar barStyle="light-content" />
      <Card>
        <Text style={mStyles.cardTitle}>{ticket.name}</Text>
        <Text style={{...styles.description, color: colors.gray}}>
          {ticket.description}
        </Text>

        <View style={styles.state}>
          {ticket.used === '1' ? (
            <Text style={styles.attantion}>
              Was marked as used: {moment.utc(ticket.changed).from()}
            </Text>
          ) : (
            <View>
              {moment.utc(ticket.expires).isBefore(moment.utc(moment.now())) ? (
                <Text style={styles.attantion}>Ticket Expired.</Text>
              ) : (
                <View>
                  <Text>Expires: {moment.utc(ticket.expires).from()}</Text>
                  <Button
                    style={{...mStyles.successButton, ...mStyles.buton}}
                    mode="contained"
                    loading={isUpdating}
                    disabled={isUpdating}
                    onPress={handleSubmit}>
                    Mark as used
                  </Button>
                </View>
              )}
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

export default TicketListScreen;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  state: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  attantion: {
    color: '#b76ba3',
  },
});
