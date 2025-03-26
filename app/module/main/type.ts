export interface Menu {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  cookingTime?: string;
}

export interface MainState {
  loading: boolean;
  refreshing: boolean;
  list: Menu[];
  page: number;
}

export const LOADING_DATA = 'LOADING_DATA';
