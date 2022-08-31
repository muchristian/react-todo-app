import { ActivityIndicator, Animated, Dimensions, Easing, FlatList, Image, ListRenderItemInfo, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../constants/GlobalStyles';
import { headerIconSize,borderRadius } from '../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import AddButton from '../components/AddButton';
import { ScreenProps, TaskItem, TaskSchema } from '../types';
import HeaderCard from '../components/HeaderCard';
import Button from '../components/Button';
import TaskComponent from '../components/Task';

const initalTasks = [
  {
    label:'Total Tasks',
    count:0
  },{
    label:'Active Tasks',
    count:0
  },{
    label:'Tasks Done',
    count:0
  },{
    label:'Active High Priority',
    count:0
  },
]

const tasks:TaskSchema[] = [
  {
    title:"washing",
    description:'Tempor ut officia pariatur consectetur sit Lorem nulla irure.',
    priority:'Low',
    isCompleted:false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },{
    title:"Jogging",
    description:'Tempor ut officia pariatur consectetur sit Lorem nulla irure.',
    priority:'High',
    isCompleted:true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },{
    title:"Praying",
    description:'Tempor ut officia pariatur consectetur sit Lorem nulla irure.',
    priority:'High',
    isCompleted:false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },{
    title:"Workout",
    description:'Tempor ut officia pariatur consectetur sit Lorem nulla irure.',
    priority:'Medium',
    isCompleted:true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },{
    title:"PlayStation",
    description:'Tempor ut officia pariatur consectetur sit Lorem nulla irure.',
    priority:'Medium',
    isCompleted:false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
]

const HomeScreen:React.FC<ScreenProps> = ({ navigation }) => {
  const [ Tasks,setTasks ] = useState<TaskSchema[]>(tasks)
  const [ showFilter,setFilter ] = useState<boolean>(false)
  const [ taskStatus,setStatus ] = useState<TaskItem[]>(initalTasks)

  const opacify = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    if(Tasks){
      setStatus(prev=>{
        
        const totalTask = Tasks.length;
        // return 
        const doneTasks = Tasks.filter(one => one.isCompleted);
        const activeTasks = Tasks.filter(one => !one.isCompleted);
        const highPriority = Tasks.filter(one => one.priority === "High")

        return [
          {...prev[0],count:totalTask},
          {...prev[1],count:activeTasks.length},
          {...prev[2],count:doneTasks.length},
          {...prev[3],count:highPriority.length},
        ]
      })
    }
  },[Tasks])
  
  const fader = (toValue:number) => {
    const options = {
      toValue,
      duration:500,
      easing: Easing.ease,
      useNativeDriver:true,
    }
    return Animated.timing(opacify,options).start()
  }

  const toggleComplete = (index:number) => {
    setTasks(prev => prev.map((task,Taskindex) => {
      if(Taskindex === index){
        return { ...task,isCompleted: !task.isCompleted }
      }else{
        return task
      }
    }))
  }

  const Header = (
    <View style={styles.header}>
      <Image source={require('../assets/images/IW_logo.png')} style={globalStyles.logo} />
      <View style={globalStyles.flexer}>
        <AntDesign 
          name="search1" 
          color={Colors.invertedText} 
          size={headerIconSize} />
        <View style={globalStyles.spacer} />
        <Ionicons 
          name="filter" 
          color={Colors.invertedText} 
          size={headerIconSize} 
          onPress={()=>{
            setFilter(prev=>{
              fader( !prev ? 1 : 0 )
              return !prev
            })
          }}
          />
      </View>
      {
        showFilter &&
        <Animated.View 
          style={[styles.filter,{
            opacity:opacify,
            transform:[{ 
              translateY: opacify.interpolate({ 
                inputRange: [ 0,1 ], 
                outputRange:[-50,0] 
              })
            }]
          }]} 
          >
            <Text style={styles.filterHeader}>filter by priority</Text>
            <View style={globalStyles.hr} />
            <View style={globalStyles.spacer} />
            <TouchableOpacity>
              <Text style={styles.filterOption}>Low priority</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.filterOption}>Medium priority</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.filterOption}>High priority</Text>
            </TouchableOpacity>
        </Animated.View>
      }
    </View>
  )

  const EmptyTasksView = (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyHeader}>nothing here</Text>
      <Text style={styles.emptyNote}>Just like your crush's replies</Text>
      <Button
        text="START WITH A NEW TASK"
        styles={{ width:"auto",paddingVertical:10,paddingHorizontal:10 }}
        TextStyles={{ fontSize:13,fontFamily:"Bold" }}
        loading={false}
        onPress={()=>{}}
         />
    </View>
  )

  const Body = (
    <View style={styles.body}>
      <Text style={styles.mainText}>Welcome</Text>
      <View style={globalStyles.flexer}>
        <HeaderCard item={taskStatus[0]} />
        <HeaderCard item={taskStatus[1]} />
      </View>
      <View style={{flexDirection:'row'}}>
        <HeaderCard item={taskStatus[2]} />
        <HeaderCard item={taskStatus[3]} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          Tasks ?
            Tasks[0] ?
              React.Children.toArray(
                Tasks.map((one,index) => 
                <>
                  <TaskComponent 
                    data={one} 
                    index={index} 
                    toggle={toggleComplete} 
                    navigation={navigation} 
                    />
                    <View style={globalStyles.hr} />
                </>
                )
              ) : 
              EmptyTasksView :
            <View style={styles.loader}>
              <ActivityIndicator size={30} color={Colors.primary} />
            </View>
        }
      </ScrollView>
    </View>
  )

  return (
    <SafeAreaView style={styles.screen}>
       {/* The Dark Overaly Block  */}
      <View style={styles.overlay} />
      {/* Sets the Status to White */}
      <StatusBar style="light" />
      { Header }
      { Body }
      <AddButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get("screen")

const styles = StyleSheet.create({
  filterOption:{
    fontSize:15,
    fontFamily:"Regular",
    color:Colors.mainText,
    paddingLeft:'10%',
    paddingBottom:'10%',
  },
  filterHeader:{
    fontFamily:"Bold",
    fontSize:15,
    width:'100%',
    textAlign:'center',
    textTransform:"uppercase",
    paddingVertical:'10%'
  },
  filter:{
    position:'absolute',
    width:'50%',
    // height:"50%",
    backgroundColor:Colors.baseBg,
    elevation:5,
    top:'100%',
    borderRadius,
    right:0,
    ...globalStyles.shadow,
    // shadowOpacity:1
  },
  emptyNote:{
    fontFamily:"Regular",
    color:Colors.mutedText,
    fontSize:17,
    marginTop:'2.5%',
    marginBottom:'5%',
  },
  emptyHeader:{
    fontFamily:"Bold",
    color:Colors.mainText,
    textTransform:"uppercase",
    fontSize:20
  },
  emptyWrapper:{
    alignItems:'center',
    marginVertical:'30%'
  },
  loader:{
    position:'absolute',
    top:'150%',
    left:"45%",
  },
  mainText:{
    fontFamily:"Bold",
    fontSize:30,
    marginLeft:'5%',
    marginTop:'5%'
  },
  body:{
    flex:1,
    backgroundColor:Colors.baseBg,
    borderRadius
  },
  overlay:{
    position:"absolute",
    width,
    height:"40%",
    left:'-7.5%',
    top:0,
    backgroundColor:Colors.dark,
  },
  header:{
    marginVertical:'10%',
    ...globalStyles.flexer,
    position:'relative',
    zIndex:2,
  },
  screen:{
    flex:1,
    marginHorizontal:"6.5%",
  }
});
