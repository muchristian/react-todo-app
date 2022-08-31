import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet,View,Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '../components/Button';
import { borderRadius } from '../constants';
import Colors from '../constants/Colors';
import { globalStyles } from '../constants/GlobalStyles';
import { TaskSchema } from '../types';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { useRef, useState } from 'react';
import Picker from 'react-native-picker-select';

interface Props {
    navigation:any
}

const priorities:any = [{label:'Low',value:'Low'},{label:'Medium',value:'Medium'},{label:'High',value:'High'}]
const intialTask = {}

const ModalScreen:React.FC<Props> = ({ navigation,addTask }) => {
    const [ task,setTask ] = useState<{}>({})

    const { priority,description,title } = task;

    let inputRef:any = {};

    const pickerPlaceholder = {
        label: 'Select a priority...',
        value: null,
        color: '#9EA0A4',
    }

    const AddTask = () => {

    }

    const handlerChange = (key:string,value:string) => {
        setTask(prev=>({ ...prev,[key]:value }))
    }

    const BackHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={BackHandler} style={styles.backHandler}>
                <Feather name="chevron-left" color={Colors.mainText} size={25} />
                <Text style={{fontFamily:'Regular',fontSize:15,color:Colors.mutedText}} >Done</Text>
            </TouchableOpacity>
            <View style={globalStyles.hr} />
            <View style={globalStyles.spacer} />
            <Text style={styles.title}>New Task</Text>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                multiline={true}
                style={styles.textInput} 
                placeholder="Task Title (140 Characters)" 
                />
            <View style={globalStyles.spacer} />
            <Text style={styles.label}>Description</Text>
            <TextInput 
                multiline={true}
                placeholder="240 Characters" 
                style={[styles.textInput,{ minHeight:'15%' }]} 
                />
            
            <View style={globalStyles.spacer} />
            <Text style={styles.label}>Priority</Text>
            <RNPickerSelect
                items={priorities}
                value={priority}
                style={pickerSelectStyles}
                placeholder={pickerPlaceholder}
                onUpArrow={() => inputRef.focus()}
                onDownArrow={() => inputRef.togglePicker()}
                onValueChange={value => handlerChange('priority',value)}
                ref={ref => inputRef = ref }
            />
            <View style={globalStyles.spacer} />
            <Button 
                loading={false}
                text="Create task"
                styles={{ backgrouColor:Colors.dark,width:'60%',marginLeft:'10%' }}
                onPress={()=>{}} />
        </View>
    );
}

export default ModalScreen

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        borderRadius,
        padding: "5%",
        marginVertical:10,
        color: Colors.mainText,
        marginHorizontal:'10%',
        backgroundColor:Colors.lightBg
    },
    inputAndroid: {
        fontSize: 16,
        borderRadius,
        marginVertical:10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: Colors.mainText,
        marginHorizontal:'10%',
        backgroundColor:Colors.lightBg// to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    textInput:{
        width:'80%',
        borderRadius,
        minHeight:'8%',
        marginVertical:10,
        fontFamily:"Regular",
        color:Colors.mainText,
        paddingHorizontal:'5%',
        marginHorizontal:"10%",
        backgroundColor:Colors.lightBg,
    },
    label:{
        marginHorizontal:'10%',
        fontFamily:"Bold",
        marginTop:"5%",
        fontSize:15
    },
    dates:{
        fontFamily:"Regular",
        flex:1,
        fontSize:15
    },
    desc:{
        fontFamily:"Regular",
        fontSize:17,
        color:Colors.mutedText,
        marginHorizontal:"10%",
        marginVertical:"2%"
    },
    title:{
        fontFamily:"Bold",
        fontSize:30,
        color:Colors.dark,
        marginHorizontal:'10%',
        textTransform:"capitalize"
    },
    backHandler:{
        flexDirection:'row',
        alignItems:'center',
        padding:'5%'
    },
    actionBtns:{
        padding:10,
        backgroundColor:Colors.lightBg,
        borderRadius
    },
    nav:{ 
        marginVertical:'5%',
        marginHorizontal:'10%',
     },
    priorityWrapper:{
        backgroundColor:Colors.dark,
        borderRadius:borderRadius*2,
        paddingVertical:5,
        paddingHorizontal:20,
        marginVertical:10,
        elevation:3,
        ...globalStyles.shadow,
        shadowOpacity:.1
    },
    priorityText:{
        fontFamily:"Bold",
        color:"white",
        textAlign:'center',
    },
    imageBanner:{
        width:'100%',
        height:'40%',
        position:'relative'
    },
    container: {
        flex: 1,
        backgroundColor:Colors.baseBg
    }
});
