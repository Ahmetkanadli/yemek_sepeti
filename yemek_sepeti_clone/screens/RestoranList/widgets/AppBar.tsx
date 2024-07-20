import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Animated} from 'react-native';
import AppBarIconComponent from "./AppBarIconComponent.tsx";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";


// @ts-ignore
function AppBar({scrollY}) {

  const navigation = useNavigation();

  const inputOpacity = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const inputHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  const appBarHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 70],
    extrapolate: 'clamp',
  });
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (scrollY._value < 20) {
      setIsReadOnly(false);
    } else {
      setIsReadOnly(true);
    }
  }, [scrollY._value]);

  return (
    <View>
      <Animated.View style={[styles.appBar, {height: appBarHeight}]}>
        <Icon name="arrow-left" size={24} color="#eb004b" onPress={navigation.goBack} />
        <View>
          <Text style={styles.appBarTitle}>Pınarbaşı Akdeniz Üniversitesi</Text>
          <Text style={styles.appBarSubTitle}>Antalya Antalya 0707</Text>
        </View>
        <View style={styles.appBarIcons}>
          <AppBarIconComponent name="heart-outline" size={28} color= '#eb004b' />
          <AppBarIconComponent
            name="bag-handle-outline"
            size={24}
            color= '#eb004b'
          />
        </View>
      </Animated.View>
      {scrollY._value < 20 && (
        <Animated.View
          style={[
            styles.searchContainer,
            {opacity: inputOpacity, height: inputHeight},
          ]}>
          <View style={styles.container}>
            <TextInput
              style={styles.searchInput}
              placeholder="Restoran veya mağaza arayın"
              readOnly={isReadOnly}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

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
  iconButton: {
    marginHorizontal: 8,
    color: '#eb004b',
  },
  container: {
    height: 70,
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: '#eb004b',
    borderRadius: 10,
    marginBottom: 30,
    flex: 1,
    color: '#eb004b',
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 30,
    height: 50,
    marginHorizontal: 20,
  },
});

export default AppBar;

/*
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // veya istediğiniz başka bir simge seti

type AppBarProps = {
  onBackPress: () => void;
  onFavoritePress: () => void;
  onSharePress: () => void;
  onSearchPress: () => void;
};

const AppBar: React.FC<AppBarProps> = ({
  onBackPress,
  onFavoritePress,
  onSharePress,
  onSearchPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-left" size={24} color="#eb004b" />
      </TouchableOpacity>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onFavoritePress}>
          <Icon name="heart-outline" size={24} color="#eb004b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSharePress}>
          <Icon name="share-variant" size={24} color="#eb004b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearchPress}>
          <Icon name="magnify" size={24} color="#eb004b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100, // Iconlar arasındaki boşluğu ayarlamak için
  },
});

export default AppBar;

 */
