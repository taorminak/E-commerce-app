export interface ProductItem {
  id: string;
  key: number;
  name: Record<string, string>;
  productType: {
    id: string;
    typeId: string;
  };
  slug: {
    'en-US': string;
  };
  description: Record<string, string>;
  masterVariant: {
    prices: Array<{
      value: {
        centAmount: number;
        currencyCode: string;
      };
      discounted?: {
        discount: {
          typeId: string;
          id: string;
        };
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
      };
    }>;
    attributes: Array<{
      name: string;
      value: string | number | boolean | Record<string, unknown>;
    }>;
    availability: {
      availableQuantity: number;
      isOnStock: boolean;
    };
    images: Array<{
      dimensions: {
        width: number;
        height: number;
      };
      label: string;
      url: string;
    }>;
    id: number;
    sku: string;
  };
}
