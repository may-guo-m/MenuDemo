export interface Menu {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  cookingTime?: string;
}

export interface MainState {
  list: Menu[];
  page: number;
}

export const LIST_LOADING_DATA = 'LOADING_DATA';
export const LIST_REFRESH_DATA = 'REFRESH_DATA';
