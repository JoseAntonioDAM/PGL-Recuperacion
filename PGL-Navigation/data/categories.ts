import { Category } from '../types/Car';

type CategoryInfo = {
  label: string;
  emoji: string;
};

export const CATEGORIES: Record<Category, CategoryInfo> = {
  deportivo: { label: 'Deportivo', emoji: '🏎️' },
  familiar: { label: 'Familiar', emoji: '🚙' },
  pickUp: { label: 'Pick Up', emoji: '🛻' },
  convertible: { label: 'Convertible', emoji: '🚗' },
  van: { label: 'Van', emoji: '🚐' },
};