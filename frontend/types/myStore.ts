
export interface IProduct {
  id?: number;
  title: string;
  description?: string;
  tags?: string[];
}

export interface IProductList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProduct[];
}
