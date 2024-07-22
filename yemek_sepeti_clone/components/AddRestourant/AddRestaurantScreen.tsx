import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {addRestaurant, Restaurant} from '../../core/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
};

type AddRestaurantScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddRestaurant'
>;

type AddRestaurantScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddRestaurant'
>;

type Props = {
  navigation: AddRestaurantScreenNavigationProp;
  route: AddRestaurantScreenRouteProp;
};

const AddRestaurantScreen: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState<
    {name: string; dishes: {name: string; price: number}[]}[]
  >([]);
  const [categoryName, setCategoryName] = useState('');
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');

  const handleAddCategory = () => {
    if (categoryName) {
      setCategories([...categories, {name: categoryName, dishes: []}]);
      setCategoryName('');
    } else {
      Alert.alert('Validation', 'Please enter a category name');
    }
  };

  const handleAddDish = (categoryIndex: number) => {
    if (dishName && dishPrice) {
      const newCategories = [...categories];
      newCategories[categoryIndex].dishes.push({
        name: dishName,
        price: parseFloat(dishPrice),
      });
      setCategories(newCategories);
      setDishName('');
      setDishPrice('');
    } else {
      Alert.alert('Validation', 'Please enter both dish name and price');
    }
  };

  const handleAddRestaurant = async () => {
    if (name && location && image && categories.length > 0) {
      const newRestaurant: Restaurant = {
        id: '',
        name,
        location,
        image,
        degerlendirme: 0,
        minimum_sepet_tutari: 0,
        categories,
        alias: '',
        servis_ucreti: 0,
        teslimat: 0,
        mevcut_teklifler: {
          title: '',
          subtitle: '',
        },
      };

      try {
        await addRestaurant(newRestaurant);
        Alert.alert('Success', 'Restaurant added successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Error adding restaurant:', error);
        Alert.alert('Error', 'Failed to add restaurant');
      }
    } else {
      Alert.alert(
        'Validation',
        'Please fill in all fields and add at least one category',
      );
    }
  };

  const renderCategory = ({item, index}: {item: any; index: number}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="Dish Name"
      />
      <TextInput
        style={styles.input}
        value={dishPrice}
        onChangeText={setDishPrice}
        placeholder="Dish Price"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddDish(index)}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>
      <FlatList
        data={item.dishes}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({item}) => (
          <Text style={styles.dishText}>{`${item.name} - $${item.price}`}</Text>
        )}
      />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Restaurant Name"
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Restaurant Location"
          />
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="Restaurant Image URL"
          />
          <Text style={styles.label}>Categories</Text>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Category Name"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Add Category</Text>
          </TouchableOpacity>
        </View>
      }
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      ListFooterComponent={
        <TouchableOpacity style={styles.button} onPress={handleAddRestaurant}>
          <Text style={styles.buttonText}>Add Restaurant</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#eb004b',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#eb004b',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dishText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AddRestaurantScreen;
