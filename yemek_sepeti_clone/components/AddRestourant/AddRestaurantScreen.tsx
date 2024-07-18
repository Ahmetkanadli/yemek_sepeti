import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
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

  const handleAddRestaurant = async () => {
    if (name && location && image) {
      const newRestaurant: Restaurant = {
        id: '', // Firebase tarafından otomatik olarak oluşturulacak
        name,
        location,
        image,
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
      Alert.alert('Validation', 'Please fill in all fields');
    }
  };

  return (
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
      <TouchableOpacity style={styles.button} onPress={handleAddRestaurant}>
        <Text style={styles.buttonText}>Add Restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default AddRestaurantScreen;
