import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import React from 'react';
import {TODO} from '../types/todos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {AppUseDispatch, AppUseSelector} from '../redux/reduxHooks';
import {deleteTodo, toggleCheck} from '../redux/todoSlice';

const Tasks = () => {
  const {filteredTodos} = AppUseSelector(state => state.todos);
  return (
    <View>
      <FlatList
        data={filteredTodos}
        keyExtractor={todo => todo.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={() => <Text style={styles.noData}>no todos</Text>}
        renderItem={(item: ListRenderItemInfo<TODO>) => <Task {...item} />}
      />
    </View>
  );
};

export default Tasks;

type taskProps = {
  item: {
    isCompleted: boolean;
    content: string;
    id: number;
  };
};
const Task = ({item: {content, id, isCompleted}}: taskProps) => {
  const dispatch = AppUseDispatch();
  const deleteTodoFn = () => {
    dispatch(deleteTodo(id));
  };

  const toggleCheckFn = () => {
    dispatch(toggleCheck(id));
  };

  return (
    <View style={[styles.task, {opacity: isCompleted ? 0.5 : 1}]}>
      <Text>{content}</Text>
      <View style={styles.btnsContainer}>
        <Pressable onPress={toggleCheckFn}>
          <IoniconsIcon name="checkmark-done" size={24} color={'blue'} />
        </Pressable>

        <Pressable>
          <Icon name="delete" size={24} color={'red'} onPress={deleteTodoFn} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  task: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  noData: {
    marginTop: 15,
    marginHorizontal: 'auto',
  },
});
