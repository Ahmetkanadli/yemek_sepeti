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
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
  RestaurantDetail: {restaurant: Restaurant};
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
  degerlendirme: number,
  minimum_sepet_tutari: number,
};

const defaultImage = 'https://via.placeholder.com/150';

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RestaurantDetail', {restaurant: item})
            }
            style={styles.card}>
            <Image
              source={{uri: item.image}}
              style={styles.cardImage}
              onError={() => {
                console.error('Image failed to load, using default image');
                item.image = defaultImage;
              }}
            />
            <View style={styles.cardContent}>
              <View style={styles.caedTitleContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="star" size={15} color={'#eb004b'} style={styles.rating}  ></Icon>
                  <Text style={styles.cardTitle}>{item.degerlendirme}</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>{`min. sepet tutarı ${item.minimum_sepet_tutari}TL`}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: 'auto',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  caedTitleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 20,
  },
  rating: {
    marginRight: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#100',
    marginBottom: 5,
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
