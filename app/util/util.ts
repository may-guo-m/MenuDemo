export function formatDollarAmount(cents: number) {
  const dollars = cents / 100;
  const formattedAmount = `$${dollars.toFixed(2)}`;
  return formattedAmount;
}

export function calculateOrderSummary<
  T extends { price: number; count: number }
>(submitMenuItems: { [id: number]: T }) {
  if (Object.keys(submitMenuItems).length === 0) {
    return {
      orderPrice: 0,
      itemCount: 0,
    };
  }
  const menuItemsArray = Object.values(submitMenuItems);
  const orderPrice = menuItemsArray.reduce(
    (preValue: number, item: T) => preValue + item.price * item.count,
    0
  );
  const itemCount = menuItemsArray.reduce(
    (preValue: number, item: T) => preValue + item.count,
    0
  );
  return {
    orderPrice,
    itemCount,
  };
}

export function mapAndFilterItems<
  T extends { id: number; count: number },
  U extends { id: number }
>(submitItems: Record<string, T>, items: U[]): (T & U)[] {
  return Object.values(submitItems)
    .map((item) => {
      const menu = items.find((menu) => menu.id === item.id);
      if (menu) {
        return { ...menu, ...item };
      }
      return null;
    })
    .filter((element) => element !== null);
}
