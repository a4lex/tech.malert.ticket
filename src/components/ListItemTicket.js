import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ListItemTicket({item}) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TicketScreen', {...item})}>
      <View style={styles.item}>
        <View style={styles.itemContainer}>
          <View>
            <View style={styles.itemTitleContainer}>
              <Text
                numberOfLines={1}
                style={{...styles.itemTitle, color: colors.text}}>
                {item.name}
              </Text>
              <Text style={styles.itemTime}>{item.usedTime}</Text>
            </View>
            <Text
              numberOfLines={2}
              style={{...styles.itemText, color: colors.gray}}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  itemContainer: {
    paddingBottom: 8,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 4,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  itemTime: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  itemText: {
    fontSize: 14,
    marginTop: 5,
  },
});
