import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from 'react-native';
import AppBarIconComponent from './IconComponent/AppBarIconComponent';

function AppBar({scrollY}) {
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

  return (
    <View>
      <Animated.View style={[styles.appBar, {height: appBarHeight}]}>
        <AppBarIconComponent name="menu" size={24} color="white" />
        <View>
          <Text style={styles.appBarTitle}>Pınarbaşı Akdeniz Üniversitesi</Text>
          <Text style={styles.appBarSubTitle}>Antalya Antalya 0707</Text>
        </View>
        <View style={styles.appBarIcons}>
          <AppBarIconComponent name="heart-outline" size={28} color="white" />
          <AppBarIconComponent
            name="bag-handle-outline"
            size={24}
            color="white"
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
    backgroundColor: '#eb004b',
    padding: 16,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  appBarSubTitle: {
    fontSize: 16,
    color: 'white',
  },
  appBarIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  container: {
    height: 70,
    backgroundColor: '#eb004b',
  },
  searchContainer: {
    backgroundColor: '#eb004b',
    borderRadius: 10,
    marginBottom: 16,
    flex: 1,
    color: '#eb004b',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 30,
    height: 50,
  },
});

export default AppBar;
