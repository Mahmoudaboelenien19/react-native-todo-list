import {View, Text, StyleSheet, Image, Button, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../type';

type Props = {
  showBackButton?: boolean;
};
const Header = ({showBackButton = false}: Props) => {
  const nav = useNavigation<any>();
  const logOut = () => {
    nav.navigate('Login');
  };
  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/logo.png')} style={styles.img} />

      {showBackButton ? (
        <Pressable onPress={logOut}>
          <Text style={styles.btnText}>sign out</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'wheat',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  btnText: {
    color: 'red',
    textTransform: 'capitalize',
  },
});
