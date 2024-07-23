export type Dish = {
  id: number,
  title: string;
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
  id: number;
  name: string;
  location: string;
  image: string;
  degerlendirme: number;
};
