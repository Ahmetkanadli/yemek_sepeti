import axios from 'axios';
import {Category} from './models/types.tsx';

const BASE_URL = 'http://10.0.0.236:8000/api';

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
  teslimat_ucreti: number;
  minimum_sepet_tutari: number;
  teslimat_suresi: number;
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

// core/models/types.ts
export interface Offer {
  title: string;
  description: string;
  image_url: string;
  is_exist: boolean; // boolean olarak değiştirildi
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
      teslimat_ucreti: data[key].delivery_price,
      teslimat_suresi: data[key].delivery_time,
      minimum_sepet_tutari: data[key].min_basket_price,
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

export const getMenu = async ({id}): Promise<{categories: Menu[]}> => {
  try {
    const response = await axios.get(`${BASE_URL}/menus/restaurant/${id}/`);
    const data = response.data;

    return {
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

export const getOffers = async ({restaurantId}): Promise<Offer[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/restaurants/restaurant/offer/${restaurantId}/`,
    );
    const data = response.data;

    console.log(data);

    return Object.keys(data).map(key => ({
      title: data[key].title,
      description: data[key].description,
      is_exist: data[key].is_exist,
      image_url: data[key].image_url,
      restourant_id: data[key].restourant_id,
    }));
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};
