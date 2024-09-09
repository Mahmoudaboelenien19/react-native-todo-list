import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import {HomeScreenNavigationProp} from '../type';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  FieldValues,
} from 'react-hook-form';
import Header from './Header';
type Inp = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  rules: {required: string};
};
const Login = ({navigation}: HomeScreenNavigationProp) => {
  const inputs: Inp[] = [
    {
      name: 'user',
      label: 'user Name',
      type: 'text',
      placeholder: 'enter your name',
      rules: {required: 'username is required'},
    },
    {
      name: 'password',
      label: 'password',
      type: 'password',
      placeholder: 'enter your password',
      rules: {required: 'password is required'},
    },
  ];
  const methods = useForm();
  const {handleSubmit} = methods;

  const onSubmit = (data: FieldValues) => {
    const {password, user} = data;

    if (password === '12345' && user === 'mahmoud') {
      navigation.replace('Home');
    } else {
      Alert.alert('password or username is wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <Header />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.img}
            />

            {inputs.map((inp: Inp) => {
              return <Input {...inp} key={inp?.label} />;
            })}

            <Button title="login" onPress={handleSubmit(onSubmit)} />
          </View>
        </FormProvider>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const Input = ({
  rules = {required: ''},
  label,
  type,
  placeholder,
  name,
}: Inp) => {
  const {control} = useFormContext();
  return (
    <View style={styles.inputPar}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, {borderColor: error && 'red'}]}
              value={value}
              placeholder={placeholder}
              secureTextEntry={type === 'password' && true}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {error && <Text style={styles.err}>{error?.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    justifyContent: 'center',
    gap: 15,
    backgroundColor: 'white',
    margin: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 10, // Also add elevation for Android
  },
  img: {
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  inputPar: {
    gap: 4,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 0.5,
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  err: {
    color: 'red',
  },
});
