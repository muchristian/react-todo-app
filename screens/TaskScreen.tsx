import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Image, StyleSheet,View,Text, TouchableOpacity } from 'react-native';
import { borderRadius } from '../constants';
import Colors from '../constants/Colors';
import { globalStyles } from '../constants/GlobalStyles';
import { TaskSchema } from '../types';

interface Props {
    route:{
        params : {
            data:TaskSchema
        }
    },
    navigation:any
}

const ModalScreen:React.FC<Props> = ({ route,navigation }) => {
    const { data: { title,description,isCompleted,priority,createdAt,updatedAt } } = route.params;

    const BgColor = (priority:string) => {
        return priority === 'Low' ? Colors.lightBg : priority === 'Medium' ? Colors.mutedText : Colors.dark
    }

    const TextColor = (priority:string) => {
        return priority === 'Low' ? Colors.dark : priority === 'Medium' ? Colors.baseBg : Colors.primary
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
            <View style={styles.imageBanner}>
                <Image source={{ uri:"https://picsum.photos/536/354" }} style={StyleSheet.absoluteFillObject} />
            </View>
            <View style={[globalStyles.flexer,styles.nav]}>
                <View style={[styles.priorityWrapper,{ backgroundColor: BgColor(priority) }]}>
                    <Text style={[styles.priorityText,{ color: TextColor(priority) }]}>{priority}</Text>
                </View>
                <View style={[globalStyles.flexer,{ flex:.4 }]}>
                    <TouchableOpacity style={styles.actionBtns}>
                        <MaterialCommunityIcons name="pen" color={Colors.dark} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtns}>
                        <Feather name="trash-2" color={Colors.dark} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <Text style={styles.label} >Description</Text>
            <Text style={styles.desc} >{description}</Text>
            <View style={[globalStyles.flexer,{ margin:'10%' }]}>
                <Text numberOfLines={2} style={styles.dates}>Created {moment(createdAt).format("Do MMM YY")}</Text>
                <Text numberOfLines={2} style={styles.dates}>Modified {moment(updatedAt).format("Do MMM YY")}</Text>
            </View>
        </View>
    );
}

export default ModalScreen

const styles = StyleSheet.create({
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
