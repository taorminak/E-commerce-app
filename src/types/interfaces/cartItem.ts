export interface CartItem {
  id: number;
  quantity: number;
  name: {
    'en-US': string;
  };
  price: {
    value: {
      centAmount: number;
      fractionDigits: number;
    };
    discounted?: {
      value: {
        centAmount: number;
        fractionDigits: number;
      };
    };
  };
  variant: {
    images: imagesItem[];
  };
}

interface imagesItem {
  label: string;
  url: string;
}
