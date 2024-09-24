import {NavigationContainer} from '@react-navigation/native';
import TabStack from './TabStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  const isAuthenticated = false;

  const linking = {
    prefixes: ['awesomeproject://'],
    config: {
      screens: {
        Home: {
          path: 'home/',
          screens: {
            Homepage: {
              path: 'homepage/',
            },
            DetailsPage: {
              path: 'details/:id',
            },
          },
        },

        Profile: {
          path: 'profile/',
          screens: {
            Profile: {
              path: 'index/',
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <TabStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
