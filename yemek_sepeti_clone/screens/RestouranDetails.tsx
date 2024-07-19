import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
  RestaurantDetail: {restaurant: Restaurant};
};

type RestaurantDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'RestaurantDetail'
>;

type RestaurantDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RestaurantDetail'
>;

type RestaurantDetailScreenProps = {
  route: RestaurantDetailScreenRouteProp;
  navigation: RestaurantDetailScreenNavigationProp;
};

type Dish = {
  name: string;
  price: number;
};

type Category = {
  name: string;
  dishes: Dish[];
};

type Restaurant = {
  id: string;
  image: string;
  name: string;
  location: string;
  categories: Category[];
};

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}) => {
  const {restaurant} = route.params;

  const renderCategory = ({item: category}: {item: Category}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={category.dishes}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({item}) => (
          <View style={styles.dishContainer}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Image source={{uri: restaurant.image}} style={styles.image} />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.location}>{restaurant.location}</Text>
        </View>
      }
      data={restaurant.categories}
      renderItem={renderCategory}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  dishName: {
    fontSize: 16,
  },
  dishPrice: {
    fontSize: 16,
    color: '#666',
  },
});

export default RestaurantDetailScreen;
