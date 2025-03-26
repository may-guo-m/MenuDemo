import { Menu } from '../main/type';

// 定义菜单项详情数据结构
export interface MenuItemDetails extends Menu {
  detail?: string;
  instructionsUrl?: string;
  nutritionUrl?: string;
  nutritionInfo?: string;
}

export interface DetailState {
  info: MenuItemDetails | null;
}

export enum ItemType {
  Image = 'image',
  Name = 'name',
  Description = 'description',
  CookingTime = 'cookingtime',
  Detail = 'detail',
  Instructions = 'instructions',
  Nutrition = 'nutrition',
}

export type RenderItemType =
  | { type: ItemType.Image; data: string }
  | { type: ItemType.Name; data: string }
  | { type: ItemType.Description; data: string }
  | { type: ItemType.CookingTime; data: string }
  | { type: ItemType.Detail; data: string }
  | { type: ItemType.Instructions; data: string }
  | { type: ItemType.Nutrition; data: string };

export const DETAIL_LOADING_DATA = 'detail-loading';
