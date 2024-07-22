import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppBar from './RestoranList/widgets/AppBar.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ion_Icon from 'react-native-vector-icons/Ionicons';
import AppBarIconComponent from './RestoranList/widgets/AppBarIconComponent.tsx';
import {Category, Restaurant} from '../core/models/types.tsx';
import RestourantDetailHeaderComponent from '../components/restourantDetailHeaderComponent.tsx';

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

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

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

  const {restaurant} = route.params;

  const renderCategory = ({item: category}: {item: Category}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={category.dishes}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({item}) => (
          <View style={styles.dishContainer}>
            <View style={styles.dishColumnContainer}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishPrice}>{item.price.toFixed(2)} TL</Text>
              <Text style={styles.dishPrice}>{item.description}</Text>
            </View>
            <Image source={{uri: item.image}} style={styles.dishImage} />
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
              <Image source={{uri: restaurant.image}} style={styles.image} />
              <Text style={styles.name}>{restaurant.name}</Text>
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
                Minimum sepet tutarı ${restaurant.minimum_sepet_tutari}
              </Text>
            </View>
            <RestourantDetailHeaderComponent
              path={null}
              icon={'time-outline'}
              text={`${restaurant.degerlendirme}`}
              textFunction={'Yorumları Gör'}
            />
            <RestourantDetailHeaderComponent
              path={null}
              icon={'star-outline'}
              text={`Teslimat : ${restaurant.teslimat}`}
              textFunction={'Değiştir'}
            />
            <View style={styles.tabBar}>
              {restaurant.categories.map((category, index) => (
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
        data={restaurant.categories}
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
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  tabBarItem: {
    fontSize: 16,
    color: 'black',
  },
  activeTabBarItem: {
    fontWeight: 'bold',
    color: '#eb004b',
    backgroundColor: '#eb004b',
  },
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginHorizontal: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 16,
    resizeMode: 'cover',
    elevation: 15,
    backgroundColor: 'white',
    // resimin burada tam olarak sığmasını istiyorum
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    marginLeft: 20,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
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
    width: '90%',
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
