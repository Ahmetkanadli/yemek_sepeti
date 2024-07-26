import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ion_Icon from 'react-native-vector-icons/Ionicons';
import AppBarIconComponent from './RestoranList/widgets/AppBarIconComponent';
import {Category, Offer, Restaurant} from '../core/models/types';
import RestourantDetailHeaderComponent from '../components/restourantDetailHeaderComponent';
import {getMenu, getOffers} from '../core/api';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
  RestaurantDetail: {
    restaurantId: number;
    restaurantName: string;
    restaurantImage: string;
    restaurantRating: string;
    restaurantLocation: string;
    restourantDelivery:string;
    restaurantMinSepetTutari: number;
  };
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

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Category[]>([]);
  const [offer, setOffer] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const {
    restaurantId,
    restaurantName,
    restaurantImage,
    restaurantRating,
    restaurantLocation,
    restourantDelivery,
    restaurantMinSepetTutari,
  } = route.params;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu({id: restaurantId});
        setMenu(menuData.categories);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOffer = async () => {
      try {
        const offerData = await getOffers({restaurantId});
        console.log('Fetched offers:', offerData); // Debug için ekleyin
        setOffer(offerData);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log(`offer : ${offer}`);
    fetchMenu();
    fetchOffer();
  }, [restaurantId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View style={styles.appBar}>
            <Icon
              name="arrow-left"
              size={24}
              color="#eb004b"
              onPress={navigation.goBack}
            />
            <View style={styles.appBarIcons}>
              <AppBarIconComponent
                name="heart-outline"
                size={28}
                color="#eb004b"
              />
              <Ion_Icon
                style={{marginHorizontal: 10}}
                name="share-social-outline"
                size={28}
                color="#eb004b"
              />
              <AppBarIconComponent
                name="bag-handle-outline"
                size={24}
                color="#eb004b"
              />
            </View>
          </View>
        );
      },
    });
  }, [navigation]);

  const renderCategory = ({item: category}: {item: Category}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={category.dishes}
        keyExtractor={item => (item.id ? item.id.toString() : item.name)} // Güvenli anahtar oluşturma
        renderItem={({item}) => (
          <View style={styles.dishContainer}>
            <View style={styles.dishColumnContainer}>
              <Text style={styles.dishName}>{item.title}</Text>
              <Text style={styles.dishPrice}>{item.price} TL</Text>
              <Text style={styles.dishDescription}>{item.description}</Text>
            </View>
            {item.image ? (
              <Image source={{uri: item.image}} style={styles.dishImage} />
            ) : null}
          </View>
        )}
      />
    </View>
  );

  const renderOffer = ({item: offer}: {item: Offer}) => (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#f00049',
        height: 150,
        paddingLeft: 10,
        borderRadius: 20,
      }}>
      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerDescription}>{offer.description}</Text>
      <View style={styles.offerContainer}>
        <></>
        <Image
          source={require('../assets/y_club.jpg')}
          style={styles.offerImage}
        />
      </View>
    </View>
  );

  const handleCategoryPress = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: any}) => {
    if (viewableItems.length > 0) {
      setActiveCategory(viewableItems[0].key);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
              }}>
              <Image source={{uri: restaurantImage}} style={styles.image} />
              <Text style={styles.name}>{restaurantName}</Text>
            </View>
            <RestourantDetailHeaderComponent
              path={require('../assets/logo.png')}
              icon={''}
              text={' Exprees | 0.2 km uzaklıkta | '}
              textFunction={'Hakkında'}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text style={{marginBottom: 10}}>
                Minimum sepet tutarı {restaurantMinSepetTutari} TL
              </Text>
            </View>
            <RestourantDetailHeaderComponent
              path={null}
              icon={'time-outline'}
              text={`${restaurantRating}`}
              textFunction={'Yorumları Gör'}
            />
            <RestourantDetailHeaderComponent
              path={null}
              icon={'star-outline'}
              text={`Teslimat: 20-30 dk`}
              textFunction={'Değiştir'}
            />
            <View style={styles.offersList}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Ion_Icon
                  name="pricetags-outline"
                  size={24}
                  color={'#f00049'}
                />
                <Text style={{color: 'black', fontWeight: '900', fontSize: 18}}>
                  {' '}
                  Mevcut teklifler
                </Text>
              </View>
              <FlatList
                data={offer}
                renderItem={renderOffer}
                keyExtractor={item => item.title} // veya başka benzersiz bir alan
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.tabBar}>
              {menu.map((category, index) => (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => handleCategoryPress(index)}>
                  <Text
                    style={[
                      styles.tabBarItem,
                      activeCategory === category.name &&
                        styles.activeTabBarItem,
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        data={menu}
        renderItem={renderCategory}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.container}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  appBarSubTitle: {
    fontSize: 16,
    color: 'black',
  },
  appBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 16,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  tabBar: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabBarItem: {
    marginHorizontal: 8,
    fontSize: 16,
    paddingBottom: 8,
  },
  activeTabBarItem: {
    color: 'red',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  categoryContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  categoryName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
  },
  dishColumnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 4,
    marginRight: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  dishPrice: {
    fontSize: 16,
    color: '#666',
  },
  dishDescription: {
    fontSize: 16,
    color: '#666',
    width: '60%',
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 15,
  },
  offersList: {
    marginVertical: 16,
    height: 100,
  },
  offerContainer: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
    flexDirection: 'row',
    width: '100%',
  },
  offerImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
    marginVertical: 8,
    color: 'white',
  },
  offerDescription: {
    fontSize: 14,
    color: 'white',
  },
});

export default RestaurantDetailScreen;
