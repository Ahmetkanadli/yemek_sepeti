export type Dish = {
  title: string;
  description: string;
  image: string;
  price: number;
};

export type Category = {
  id: number
  name: string;
  dishes: Dish[];
};

type mevcut_teklifler = {
  title: string;
  subtitle: string;
};

export type Restaurant = {
  id: number;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
  teslimat_ucreti: number;
  teslimat_suresi: number;
  minimum_sepet_tutari: number;
};

export type Offer = {
  title: string;
  description: string;
  is_exist: string;
  image_url: string;
  restourant_id: number;
};
