import { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setmodalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(goals => [...goals, { text: enteredGoalText, id: Math.random().toString() }]);
    endAddGoalHandler();
  }
  function deleteGoalHandler(id) {
    console.log('jj');
    setCourseGoals(goals => goals.filter(goal => goal.id !== id) );
  }

  function startAddGoalHandler (){
    setmodalIsVisible(true);
  }
  function endAddGoalHandler (){
    setmodalIsVisible(false);
  }
  return (
   
    <View style={styles.container}>
      <Button title='Add NEw Goal' color='#5e0acc' onPress={startAddGoalHandler}/>
       <GoalInput isVisible={modalIsVisible} onAddGoal={addGoalHandler} onModalClose={endAddGoalHandler}/>
      <View style={styles.goalContainer}>
        <FlatList

          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem 
                    text={itemData.item.text} 
                    onDeleteItem={deleteGoalHandler}
                    id={itemData.item.id}
                    />
          }}

          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />




        {/* alwaysBounceVertical is property for IOS 
        to prevent scroll if content not need scroll
        and default value of it is true */}
        {/* <ScrollView alwaysBounceVertical = {false}>
          {courseGoals.map((goal, index) => (
           <GoalItem text={goal.text} />

          ))}

        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 50
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },
  goalContainer: {
    flex: 5
  }
});
