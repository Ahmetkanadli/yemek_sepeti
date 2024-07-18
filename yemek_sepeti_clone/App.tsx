import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RestaurantListScreen from './screens/RestoranList.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import AddRestaurantScreen from './components/AddRestourant/AddRestaurantScreen.tsx';
// Import your RestaurantListScreen here

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
