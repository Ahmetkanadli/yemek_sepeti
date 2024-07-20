import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {getRestaurants} from '../../core/api.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AppBar from './widgets/AppBar.tsx';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  degerlendirme: number;
  minimum_sepet_tutari: number;
  alias: string;
  servis_ucreti: number;
};

const defaultImage = 'https://via.placeholder.com/150';

const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({
  navigation,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return <AppBar scrollY={scrollY} />;
      },
    });
  }, [navigation, scrollY]);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [30, 0],
    extrapolate: 'clamp',
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Animated.View style={[styles.container, {marginTop}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Animated.FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => (
          <RestaurantCard
            item={item}
            navigation={navigation}
            defaultImage={defaultImage}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRestaurant')}>
        <Text style={styles.addButtonText}>Add Restaurant</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const RestaurantCard: React.FC<{
  item: Restaurant;
  navigation: RestaurantListScreenNavigationProp;
  defaultImage: string;
}> = ({item, navigation, defaultImage}) => {
  const [imageUri, setImageUri] = useState(item.image);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantDetail', {restaurant: item})
      }
      style={styles.card}>
      <Image
        source={{uri: imageUri}}
        style={styles.cardImage}
        onError={() => {
          console.error('Image failed to load, using default image');
          setImageUri(defaultImage);
        }}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardTitleContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="star"
              size={15}
              color={'#eb004b'}
              style={styles.rating}
            />
            <Text style={styles.cardTitle}>{item.degerlendirme}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={
              styles.cardSubtitle
            }>{`min. sepet tutarı ${item.minimum_sepet_tutari}TL`}</Text>
          <Text
            style={
              styles.cardSubtitle
            }>{`${item.alias}`}</Text>
        </View>
        <Text style={styles.cardSubtitle}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTitleContent: {
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
    marginRight: 5,
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
