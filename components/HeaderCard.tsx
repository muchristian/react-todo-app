import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../constants/GlobalStyles';
import { borderRadius } from '../constants';
import Colors from '../constants/Colors';

interface TaskCardItem {
  item: {
    label:string,
    count:number
  }
}

const HeaderCard:React.FC<TaskCardItem> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.count}>{String(item.count).padStart(2,'0')}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
    label:{
        fontFamily:"Bold",
        marginTop:"5%",
        color:Colors.mainText
    },
    count:{
        fontFamily:"Bold",
        fontSize:30,
        color:Colors.primary
    },
    card:{
        width:"40%",
        borderRadius,
        ...globalStyles.shadow,
        paddingVertical:'2.5%',
        paddingHorizontal:'5%',
        backgroundColor:Colors.baseBg,
        justifyContent:"space-between",
        marginVertical:"2.5%",
        marginHorizontal:"5%",
        elevation:5,
    }
});
