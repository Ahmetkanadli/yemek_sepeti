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
import {Category, Restaurant} from '../core/models/types';
import RestourantDetailHeaderComponent from '../components/restourantDetailHeaderComponent';
import {getMenu} from '../core/api';

type RootStackParamList = {
  Home: undefined;
  RestaurantList: undefined;
  AddRestaurant: undefined;
  RestaurantDetail: {
    restaurantId: number;
    restaurantName: string;
    restaurantImage: string;
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
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const {restaurantId, restaurantName, restaurantImage} = route.params;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu({id: restaurantId});
        setRestaurant(menuData.restaurant);
        setMenu(menuData.categories);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
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
        keyExtractor={(item, idx) => `${item.id}`}
        renderItem={({item}) => (
          <View style={styles.dishContainer}>
            <View style={styles.dishColumnContainer}>
              <Text style={styles.dishName}>{item.title}</Text>
              <Text style={styles.dishPrice}>{item.price} TL</Text>
              <Text style={styles.dishPrice}>{item.description}</Text>
            </View>
            {item.image ? (
              <Image source={{uri: item.image}} style={styles.dishImage} />
            ) : null}
          </View>
        )}
      />
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
                Minimum sepet tutarı {restaurant?.minimum_sepet_tutari} TL
              </Text>
            </View>
            <RestourantDetailHeaderComponent
              path={null}
              icon={'time-outline'}
              text={`${restaurant?.degerlendirme}`}
              textFunction={'Yorumları Gör'}
            />
            <RestourantDetailHeaderComponent
              path={null}
              icon={'star-outline'}
              text={`Teslimat : ${restaurant?.teslimat}`}
              textFunction={'Değiştir'}
            />
            <View style={styles.tabBar}>
              {menu.map((category, index) => (
                <TouchableOpacity
                  key={index}
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
        keyExtractor={(item, index) => index.toString()}
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
    flexDirection: 'row',
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
    justifyContent: 'space-between',
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
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 15,
  },
});

export default RestaurantDetailScreen;
