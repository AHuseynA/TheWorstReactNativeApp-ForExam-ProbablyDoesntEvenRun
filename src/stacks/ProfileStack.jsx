import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '@screens/profile/Profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile Screen" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
