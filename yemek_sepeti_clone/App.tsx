import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RestaurantListScreen from './screens/RestoranList/RestoranList.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import AddRestaurantScreen from './components/AddRestourant/AddRestaurantScreen.tsx';
import RestaurantDetailScreen from './screens/RestouranDetails.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          // @ts-ignore
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
        <Stack.Screen
          name="AddRestaurant"
          // @ts-ignore
          component={AddRestaurantScreen}
          options={{title: 'Add Restaurant'}}
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
