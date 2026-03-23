export const STORE_CURRENCY = "XOF";
export const STORE_LOCALE = "fr-FR";
export const STORE_COUNTRY = "Benin";
export const FREE_SHIPPING_THRESHOLD = 30000;
export const STANDARD_SHIPPING_FEE = 2500;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat(STORE_LOCALE, {
    style: "currency",
    currency: STORE_CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);
