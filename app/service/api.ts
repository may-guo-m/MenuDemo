import { MenuItemDetails } from '../module/detail/type';
import { Menu } from '../module/main/type';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMenus = async (page: number): Promise<Menu[]> => {
  await delay(1000);
  return Array.from({ length: 10 }, (_, index) => ({
    id: (page - 1) * 10 + index + 1,
    name: `Menu ${(page - 1) * 10 + index + 1} `,
    description: 'detailed description of the steak ',
    imageUrl: 'https://dummyimage.com/200x200/000/fff',
    price: 99999,
  }));
};

// 模拟获取菜品详情
export const fetchMenuItemDetails = async (
  id: number
): Promise<MenuItemDetails> => {
  await delay(1000);
  const longEnglishText =
    "This 15-Min Coconut Chicken Curry is a delightful and time - saving dish that combines the rich flavors of coconut milk, aromatic curry paste, and tender chicken. The addition of bok choy brings a fresh, crisp element to the dish, while the pre - cooked sweet potatoes add a touch of natural sweetness. The curry broth is the heart of this recipe. It's crafted with a blend of spices that are slowly simmered to release their full flavor potential. The coconut milk adds a creamy and luxurious texture, making every bite a comforting experience. As the chicken and vegetables cook in the broth, they absorb all the wonderful flavors, resulting in a dish that is both flavorful and satisfying. Whether you're a busy professional looking for a quick and delicious meal or a home cook who wants to try something new, this coconut chicken curry is sure to be a hit. It's easy to prepare, yet it looks and tastes like it took hours to make. So, gather your ingredients and get ready to enjoy this amazing dish!";

  return {
    id,
    imageUrl: 'https://dummyimage.com/100x100/000/fff',
    price: 99999,
    nutritionInfo: '420 Cal/serving',
    name: '15-Min Coconut Chicken Curry',
    description: 'A quick and flavorful curry dish',
    cookingTime: '15 min',
    detail: longEnglishText,
    instructionsUrl: 'https://example.com/instructions',
    nutritionUrl: 'https://example.com/nutrition',
  };
};

export const tabItems = ['Meal Kits', 'Prepared & Ready', 'Apps & Sides'];
