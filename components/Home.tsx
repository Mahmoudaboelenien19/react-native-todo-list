import {StyleSheet, View} from 'react-native';
import {HomeScreenNavigationProp} from '../type';
import Header from './Header';
import Tasks from './Tasks';
import Form from './tasks/Form';
import Filters from './Filters';
import {AppUseSelector} from '../redux/reduxHooks';

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const {todos} = AppUseSelector(st => st.todos);
  return (
    <>
      <Header showBackButton />
      <View style={styles.container}>
        <Form />
        {todos?.length > 0 && <Filters />}
        <Tasks />
      </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
