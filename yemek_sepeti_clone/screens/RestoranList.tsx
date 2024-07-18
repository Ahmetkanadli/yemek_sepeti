import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {getRestaurants} from '../core/api';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
};

type RestaurantListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RestaurantList'
>;

type RestaurantListScreenProps = {
  navigation: RestaurantListScreenNavigationProp;
};

type Restaurant = {
  id: string;
  image: string;
  name: string;
  location: string;
};

const defaultImage = 'https://via.placeholder.com/150'; // Varsayılan resim URL'si

const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({
  navigation,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data: Restaurant[] = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={{uri: item.image}}
              style={styles.cardImage}
              onError={() => {
                console.error('Image failed to load, using default image');
                item.image = defaultImage; // Hata durumunda varsayılan resme geç
              }}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRestaurant')}>
        <Text style={styles.addButtonText}>Add Restaurant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ccc', // Resim yüklenemezse arka plan rengini belirtir
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#100',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#eb004b',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RestaurantListScreen;
