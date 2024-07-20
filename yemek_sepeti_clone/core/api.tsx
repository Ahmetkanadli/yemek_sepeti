import axios from 'axios';

const BASE_URL =
  'https://yemek-sepeti-b9d10-default-rtdb.asia-southeast1.firebasedatabase.app';

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
  minimum_sepet_tutari: number;
  categories: { name: string; dishes: { name: string; price: number }[] }[];
  alias: string;
  servis_ucreti: number;
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/restourantlar.json`);
    const data = response.data;

    const restaurants: Restaurant[] = Object.keys(data).map(key => ({
      id: key,
      name: data[key].name,
      location: data[key].location,
      image: data[key].image,
      degerlendirme: data[key].degerlendirme,
      minimum_sepet_tutari: data[key].minimum_sepet_tutari,
      categories: data[key].categories || [],
      alias: data[key].alias,
      servis_ucreti: data[key].servis_ucreti,
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
