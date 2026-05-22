import { Category } from '../types/Car';

type CategoryInfo = {
  label: string;
  imagen: any;
};

export const CATEGORIES: Record<Category, CategoryInfo> = {
  deportivo: {
    label: 'Deportivo',
    imagen: require('../assets/deportivo.png'),
  },
  familiar: {
    label: 'Familiar',
    imagen: require('../assets/familiar.png'),
  },
  pickUp: {
    label: 'Pick Up',
    imagen: require('../assets/pickup.png'),
  },
  convertible: {
    label: 'Convertible',
    imagen: require('../assets/convertible.png'),
  },
  van: {
    label: 'Van',
    imagen: require('../assets/van.png'),
  },
};