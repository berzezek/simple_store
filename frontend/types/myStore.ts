export interface IProductCreate {
  title: string;
  description?: string;
  tags: string[];
}

export interface IProduct extends IProductCreate {
  id: number | string;
  get_last_price: number;
}

export interface IProductBilling extends IProduct {
  total: number;
  qty: number;
}

interface ITransaction {
  id: number | string;
  related_object: IOrder | ICart;
  price: number;
  quantity: number;
  object_id: number | string;
  product: IProduct;
  content_type_name: 'order' | 'cart';
}

export interface IUser {
  id: number | string;
  username: string;
  email: string;
}

export interface IOrder {
  id: number | string;
  bayer: number | string;
}

export interface ICart {
  id: number | string;
  seller: number | string;
}

export interface ItemsList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
