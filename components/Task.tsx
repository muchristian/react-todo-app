import { StyleSheet, Text, TouchableOpacity, View,Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../constants/GlobalStyles';
import { TaskSchema } from '../types';
import Colors from '../constants/Colors';
import { borderRadius } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment'

interface Props {
    data:TaskSchema,
    navigation:any,
    toggle: (index:number) => void,
    index:number
}

const TaskComponent:React.FC<Props> = ({ index,data,navigation,toggle }) => {

    const [ opacity,setOpacity ] = useState(1);

    const { isCompleted,title,priority,createdAt,updatedAt } = data;

    useEffect(()=>{
        if(isCompleted){
            setOpacity(.2)
        }else{
            setOpacity(1)
        }
    },[isCompleted])

    const BgColor = (priority:string) => {
        return priority === 'Low' ? Colors.lightBg : priority === 'Medium' ? Colors.mutedText : Colors.dark
    }

    const TextColor = (priority:string) => {
        return priority === 'Low' ? Colors.dark : priority === 'Medium' ? Colors.baseBg : Colors.primary
    }

    const toggleComplete = () => toggle(index);

    const ViewTask = () => {
        if(!isCompleted)
        navigation.navigate('TaskScreen',{ data })
    }

    return (
        <TouchableOpacity onPress={ViewTask} style={[ globalStyles.flexer, styles.task, { opacity }]}>
            <TouchableOpacity onPress={toggleComplete}>
            {
                !isCompleted ?
                <AntDesign name="checksquareo" size={25} color={Colors.dark} /> :
                <AntDesign name="checksquare" size={25} color={Colors.dark} /> 
            }
            </TouchableOpacity>
            <View style={styles.content}>
                <Text numberOfLines={1} style={styles.heading}> {index+1} {title}  </Text>
                <View style={[styles.priorityWrapper,{ backgroundColor: BgColor(priority) }]}>
                    <Text style={[styles.priorityText,{ color: TextColor(priority) }]}>{priority}</Text>
                </View>
                <View style={globalStyles.flexer}>
                    <Text numberOfLines={2} style={styles.dates}>Created &bull; {moment(createdAt).format("Do MMM YY")}</Text>
                    <Text numberOfLines={2} style={styles.dates}>Modified &bull; {moment(updatedAt).format("Do MMM YY")}</Text>
                </View>
            </View>
            <TouchableOpacity style={{height:'80%'}}>
                <SimpleLineIcons name="options-vertical" size={15} color={Colors.mutedText} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default TaskComponent;

const styles = StyleSheet.create({
    dates:{
        fontFamily:"Regular",
        flex:1,
        marginTop:5,
    },
    priorityWrapper:{
        backgroundColor:Colors.dark,
        borderRadius:borderRadius*2,
        paddingVertical:5,
        paddingHorizontal:20,
        marginVertical:10
    },
    priorityText:{
        fontFamily:"Bold",
        color:"white",
        textAlign:'center',
    },
    content:{
        flex:.8,
        alignItems:'flex-start'
    },
    heading:{
        fontFamily:"Bold",
        fontSize:20
    },
    task:{
        paddingVertical:10,
        paddingHorizontal:'10%',
    }
});
