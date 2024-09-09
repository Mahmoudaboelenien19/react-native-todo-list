import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {AppUseDispatch, AppUseSelector} from '../redux/reduxHooks';
import {Filter} from '../types/todos';
import {changeFilter} from '../redux/todoSlice';
const filters: Filter[] = ['all', 'pending', 'completed'];
const Filters = () => {
  const {activedFilter} = AppUseSelector(s => s.todos);
  const dispatch = AppUseDispatch();
  const applyFilter = (f: Filter) => {
    dispatch(changeFilter(f));
  };
  return (
    <View style={styles.container}>
      {filters.map(filter => (
        <Pressable
          key={filter}
          onPress={() => applyFilter(filter)}
          style={[
            styles.filter,
            {opacity: activedFilter === filter ? 1 : 0.5},
          ]}>
          <Text style={styles.text}>{filter}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 20,
  },
  filter: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },

  text: {
    color: 'white',
  },
});
