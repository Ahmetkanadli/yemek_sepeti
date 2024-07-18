import axios from 'axios';

const BASE_URL =
  'https://yemek-sepeti-b9d10-default-rtdb.asia-southeast1.firebasedatabase.app';

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  image: string;
  // Diğer restoran özelliklerini buraya ekleyin
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/restourantlar.json`);
    const data = response.data;

    // Firebase'den gelen veriyi Restaurant tipine dönüştürme
    const restaurants: Restaurant[] = Object.keys(data).map(key => ({
      id: key,
      name: data[key].name,
      location: data[key].location,
      image: data[key].image,
    }));

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const addRestaurant = async (restaurant: Restaurant) => {
  try {
    await axios.post(`${BASE_URL}/restourantlar.json`, restaurant);
  } catch (error) {
    console.error('Error adding restaurant:', error);
    throw error;
  }
};
