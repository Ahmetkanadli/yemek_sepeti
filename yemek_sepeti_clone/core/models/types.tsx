export type Dish = {
  name: string;
  description: string;
  image: string;
  price: number;
};

export type Category = {
  name: string;
  dishes: Dish[];
};

type mevcut_teklifler = {
  title: string;
  subtitle: string;
};

export type Restaurant = {
  id: string;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
  minimum_sepet_tutari: number;
  categories: Category[];
  alias: string;
  servis_ucreti: number;
  mevcut_teklifler: mevcut_teklifler;
  teslimat: number;
};
