import axios from 'axios';

const BASE_URL = 'http://10.0.0.236:8000/api';

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
}

export interface Menu {
  id: number;
  restaurant: number;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  menu: number;
  product: number;
  description: string;
  price: number;
  available: boolean;
  // kampanyanın olup olmadığının kontrolü için
  title: string;
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurants/`);
    const data = response.data;

    return Object.keys(data).map(key => ({
      id: data[key].id,
      name: data[key].name,
      location: data[key].address,
      image: data[key].image_url,
      degerlendirme: data[key].rating,
    }));
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

export const getMenu = async ({
  id,
}): Promise<{restaurant: Restaurant; categories: Category[]}> => {
  try {
    const response = await axios.get(`${BASE_URL}/menus/restaurant/${id}/`);
    const data = response.data;

    return {
      restaurant: {
        id: data[0].restaurant,
        name: data[0].name,
        image: data[0].image_url,
        minimum_sepet_tutari: '50', // Replace this with the actual data if available
        degerlendirme: '4.5', // Replace this with the actual data if available
        teslimat: '30-40 minutes', // Replace this with the actual data if available
      },
      categories: data.map((category: any) => ({
        id: category.id,
        name: category.name,
        dishes: category.items.map((dish: any) => ({
          title: dish.title,
          price: dish.price,
          description: dish.description,
          image: dish.image,
        })),
      })),
    };
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};
