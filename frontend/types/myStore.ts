
export interface IProduct {
  id: number | string;
  title: string;
  description?: string;
  tags: string[];
  get_last_price?: number;
}

export interface ItemsList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
