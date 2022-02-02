export const formatPrice = (price: number) => {
  return new Intl.NumberFormat().format(price);
};
