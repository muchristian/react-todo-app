import { ActivityIndicator, GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { ReactElement } from 'react';
import { globalStyles } from '../constants/GlobalStyles';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons'; 

interface Props {
  text?: string,
  loading:boolean,
  success?:boolean,
  LeftIcon?: ReactElement,
  RightIcon?: ReactElement,
  styles?: StyleProp<TextStyle> | any,
  TextStyles?: StyleProp<TextStyle>,
  onPress: (event: GestureResponderEvent) => void
}

const Button:React.FC<Props> = ({ LeftIcon,RightIcon,text,success,onPress,loading,styles,TextStyles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[ globalStyles.flexer,globalStyles.btn, styles, { backgroundColor: success ? Colors.primary : styles["backgroundColor"] || Colors.dark } ]}>
        {
          success ?
            <AntDesign name="check" size={24} color={Colors.baseBg} />:
            loading ?
            <ActivityIndicator size={20} color={Colors.baseBg} />:
            <>
              { LeftIcon }
              { text && <Text style={[globalStyles.btnText,TextStyles]}>{text}</Text>}
              { RightIcon }
            </>
        }
    </TouchableOpacity>
  );
};

export default Button;

