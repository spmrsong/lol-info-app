export interface Item {
  id: string;
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  tags: string[];
  stats: {
    [key: string]: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}
