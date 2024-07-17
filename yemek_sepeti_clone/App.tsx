import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import AppBar from './components/AppBar.tsx';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = (): React.ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#eb004b',
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <AppBar scrollY={scrollY} />

      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <View style={styles.rowSection}>
              <TouchableOpacity style={[styles.card, styles.cardMahalle]}>
                <Text style={styles.cardTitle}>Mahalle</Text>
                <Text style={styles.cardSubtitle}>
                  İlk 3 Siparişe 180₺ İndirim
                </Text>
                <Image
                  source={require('./assets/mahalle.jpg')}
                  style={styles.cardImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.card, styles.cardMarket]}>
                <Text style={styles.cardTitle}>Market</Text>
                <Text style={styles.cardSubtitle}>Binlerce Üründe İndirim</Text>
                <Image
                  source={require('./assets/market.jpg')}
                  style={styles.cardImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowSection}>
              <TouchableOpacity style={[styles.card, styles.cardYemek]}>
                <Text style={styles.cardTitle}>Yemek</Text>
                <Text style={styles.cardSubtitle}>İndirimli Lezzetler</Text>
                <Image
                  source={require('./assets/yemek.jpg')}
                  style={styles.cardImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.card, styles.cardGelAl]}>
                <Text style={styles.cardTitle}>Gel Al</Text>
                <Text style={styles.cardSubtitle}>%50'ye varan indirim</Text>
                <Image
                  source={require('./assets/gel_al.jpg')}
                  style={styles.cardImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <View style={styles.bannerHerSiparisteKazan}>
                <Text style={styles.bannerText}>Her siparişte kazan!</Text>
                <Text style={styles.bannerSubText}>
                  Seçili işletmelerde harca!
                </Text>
              </View>
              <Image
                style={styles.bannerImage}
                source={require('./assets/her_sipariste_kazan.jpg')}
              />
            </View>
            <View style={styles.banner2}>
              <View style={styles.bannerArkadasiniDavetEt}>
                <Text style={styles.bannerArkadasiniDavetEtText}>
                  Arkadaşını davet et!
                </Text>
                <Text style={styles.bannerArkadasiniDavetEtSubText}>
                  İkiniz de kupon kazanın!
                </Text>
              </View>
              <Image
                source={require('./assets/arkasini_davet_et.jpg')}
                style={styles.bannerImage}
              />
            </View>
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <TouchableOpacity style={styles.campaignCard}>
              <Text style={styles.campaignTitle}>Kampanyalar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    padding: 16,
  },
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
  appBarIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    color: 'white',
    backgroundColor: '#eb004b',
    flexShrink: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 14,
    color: 'white',
  },
  searchContainer: {
    backgroundColor: '#eb004b',
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    flex: 1,
    color: '#eb004b',
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 4,
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  rowSection: {
    width: '50%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingLeft: 16,
    paddingTop: 16,
    width: '90%',
    marginBottom: 16,
    elevation: 3,
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
    color: 'black',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#100',
  },
  cardImage: {
    width: '100%',
    height: 100,
    marginTop: 8,
    borderRadius: 10,
  },
  cardMahalle: {
    backgroundColor: 'white',
  },
  cardYemek: {
    backgroundColor: 'white',
  },
  cardMarket: {
    backgroundColor: 'white',
  },
  cardGelAl: {
    backgroundColor: 'white',
  },
  bannerContainer: {
    marginBottom: 16,
  },
  banner: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  banner2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#eb004b',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  bannerImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
  },
  bannerHerSiparisteKazan: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bannerArkadasiniDavetEt: {
    backgroundColor: '#eb004b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#100',
  },
  bannerArkadasiniDavetEtText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  bannerArkadasiniDavetEtSubText: {
    fontSize: 14,
    color: 'white',
  },
  campaignCard: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    height: 500,
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
