import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import React from 'react';
import {TODO} from '../../types/todos';
import {AppUseDispatch} from '../../redux/reduxHooks';
import {addTodo} from '../../redux/todoSlice';

const Form = () => {
  const [Value, setValue] = useState('');
  const dispatch = AppUseDispatch();
  const submit = () => {
    if (Value.trim().length > 0) {
      dispatch(
        addTodo({
          isCompleted: false,
          content: Value,
          id: Date.now(),
        }),
      );

      setValue('');
    }
  };
  return (
    <>
      <View style={styles.inputParent}>
        <TextInput style={styles.input} value={Value} onChangeText={setValue} />
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.txt}>add todo</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputParent: {
    width: '100%',
    height: 40,

    marginTop: 80,
    borderRadius: 5,
    flexDirection: 'row',
  },
  input: {
    height: '100%',
    width: '80%',
    backgroundColor: 'wheat',
    color: 'black',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  txt: {
    color: 'white',
  },
});

export default Form;
