import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Vibration,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import malertApi, {parseApiResponse} from '../api/malert';
import parseQrTicket from '../helpers/parseQrTicket';

import QrScannerModal from '../components/QrScannerModal';
import FullScreenPreload from '../components/FullScreenPreload';
import FullScreenMessage from '../components/FullScreenMessage';
import ListItemTicket from '../components/ListItemTicket';

const TicketListScreen = ({navigation}) => {
  const {colors} = useTheme();

  // QR scan section

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const handleScanData = ({scanner, data}) => {
    Vibration.vibrate();
    const [errorMessage, ticket] = parseQrTicket(data);
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [
        {text: 'Ok', onPress: () => scanner.reactivate()},
      ]);
      return;
    }
    closeModal();
    navigation.navigate('TicketScreen', {...ticket});
  };

  navigation.setOptions({
    headerRight: () => (
      <Icon.Button
        name="ios-qr-scanner"
        size={25}
        backgroundColor={colors.blue}
        onPress={() => setModalVisible(true)}
      />
    ),
  });

  // Display list section

  const [listData, setListData] = useState([]);
  const [listPage, setListPage] = useState(0);
  const [listLoading, setListLoading] = useState(false); // bottom progressbar
  const [listRefreshing, setListRefreshing] = useState(false); // top progressbar

  const [refresh, setRefresh] = useState(0);
  const [dataExists, setDataExists] = useState(true);
  const [progress, setProgress] = useState({
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    if (!listRefreshing) {
      setListLoading(true);
    }

    malertApi
      .get('/tickets.php', {params: {page: listPage}})
      .then(response => {
        let acceptedData = response.data.map(item => ({
          ...item,
          usedTime: moment.utc(item.changed).fromNow(),
        }));

        // to prevent data loading when server response is empty
        setDataExists(acceptedData.length !== 0);

        if (listPage === 0) {
          setListData([...acceptedData]);
          setProgress({isLoading: false, errorMessage: null});
        } else {
          setListData([...listData, ...acceptedData]);
        }
      })
      .catch(error => {
        let {message} = parseApiResponse(error.response);
        setProgress({isLoading: false, errorMessage: message});
      })
      .finally(() => {
        setListLoading(false);
        setListRefreshing(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPage, refresh]);

  if (progress.isLoading) {
    return <FullScreenPreload />;
  } else if (progress.errorMessage) {
    return <FullScreenMessage message={progress.errorMessage} />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <QrScannerModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        handleData={handleScanData}
      />
      <FlatList
        data={listData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ListItemTicket item={item} />}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          dataExists && setListPage(listPage + 1);
        }}
        ListFooterComponent={() =>
          listLoading ? <ActivityIndicator size="small" /> : null
        }
        refreshing={listRefreshing}
        onRefresh={() => {
          setListPage(0);
          setRefresh(refresh + 1);
          setListRefreshing(true);
        }}
        ListEmptyComponent={() => {
          return <FullScreenMessage message="Pull screen down to refresh" />;
        }}
      />
    </>
  );
};

export default TicketListScreen;
