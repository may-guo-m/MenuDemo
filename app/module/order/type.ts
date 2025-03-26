import { Menu } from '../main/type';

// 定义菜单项数据结构
export interface MenuItem {
  // 菜单项的唯一 id
  id: number;
  price: number;
  // 数量
  count: number;
}

export interface OrderState {
  submitMenuItems: { [id: number]: MenuItem };
}
