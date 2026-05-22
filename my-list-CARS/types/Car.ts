export type Category = 'deportivo' | 'familiar' | 'pickUp' | 'convertible' | 'van';

export type Car = {
  id: string;
  nombre: string;
  categoria: Category;
  precio: number;
  marcado: boolean;
};