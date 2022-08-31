import { StyleSheet } from 'react-native'
import { borderRadius } from '.'
import Colors from './Colors'

// const { width } = Dimensions.get('screen')

export const globalStyles = StyleSheet.create({
    hr:{
        width:'100%',
        borderWidth:1,
        borderColor:Colors.lightBg
    },
    btn: {
        padding:20,
        borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.1)",
        shadowOffset:{width:0,height:0},
        shadowOpacity:.3,
        shadowRadius:10
    },
    btnText:{
        color:"white",
        fontFamily:"Bold",
        fontSize:20,
        marginHorizontal:'5%'
    },
    logo:{
        width:35,
        height:35,
    },
    spacer:{
        margin:10
    },
    flexer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    shadow:{
        shadowColor:Colors.dark,
        shadowOpacity:.2,
        shadowRadius:5,
        shadowOffset:{width:3,height:4}
    },
})
