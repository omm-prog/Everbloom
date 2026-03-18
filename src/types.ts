export type FlowerType = 'rose' | 'tulip' | 'sunflower' | 'lily' | 'daisy';

export interface FlowerItem {
  id: string;
  type: FlowerType;
  color: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

export type WrapperStyle = 'classic' | 'modern' | 'rustic' | 'none';

export interface BouquetState {
  flowers: FlowerItem[];
  wrapper: WrapperStyle;
  ribbonColor: string;
}

export interface MessageState {
  text: string;
  font: string;
  sender: string;
  to: string;  // added "To" field
}

export interface AppState {
  bouquet: BouquetState;
  message: MessageState;
  theme: 'light' | 'dark';
}
