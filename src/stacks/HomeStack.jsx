import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from '@screens/homepage/Homepage';
import CustomHeader from '../common/CustomHeader';
import DetailsPage from '../screens/detailsPage/DetailsPage';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{header: () => <CustomHeader title="Homepage" />}}
        name="Homepage"
        component={Homepage}
      />
      <Stack.Screen
        options={{header: () => <CustomHeader title="Details Page" />}}
        name="DetailsPage"
        component={DetailsPage}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
