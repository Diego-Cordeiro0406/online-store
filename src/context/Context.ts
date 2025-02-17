import { Dispatch, SetStateAction, createContext } from 'react';
import { Categories, Product, ProductCart } from '../types/typesApi';

type BatataState = boolean;
type SearchState = string;
type InputState = string;
type ProductState = Product;
type ProductCartState = ProductCart;
type ProductDataLoaded = boolean;
type Open = boolean;
type Loading = boolean;

export interface MyContextProps {
  getCategories: () => Promise<Categories[]>;
  getProductById: (id: string | undefined) => Promise<void>;
  getProductsFromCategoryAndQuery: (
    query: string,
    categoryId?: string,
  ) => Promise<Product[]>
  categories: Categories[],
  route: boolean,
  setRoute: Dispatch<SetStateAction<BatataState>>
  search: string,
  setSearch: Dispatch<SetStateAction<SearchState>>,
  valueInput: string,
  setValueInput: Dispatch<SetStateAction<InputState>>,
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => any,
  isTrue: boolean,
  isLoading: boolean,
  data: Product[],
  productData: Product | null,
  setProduct: Dispatch<SetStateAction<ProductState | null>>,
  sendProductsRequest: (query: string) => void,
  cart: ProductCart[],
  addCart: (obj: ProductCart) => void,
  getQuantity: () => number
  removeProduct: (id: string) => void,
  addQuantity: (id: string) => void,
  sutractQuantity: (id: string) => void,
  toggleSideBar: () => void,
  sidebarOpen: boolean,
  productDataLoaded:boolean,
  setProductDataLoaded: Dispatch<SetStateAction<ProductDataLoaded>>,
  setSidebarOpen: Dispatch<SetStateAction<Open>>,
  setLoading: Dispatch<SetStateAction<Loading>>
  setCart: Dispatch<SetStateAction<ProductCartState[]>>,
}

const Context = createContext<MyContextProps | undefined>(undefined);

export default Context;
