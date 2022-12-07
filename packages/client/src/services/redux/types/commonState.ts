import { TGame, TSnakeColor } from '../../../../../shared/types';

export interface IMultiPLayerScore {
  points: number;
  id: number | null;
  login: string;
  color: TSnakeColor;
}

export interface ICommonState {
  theme: 'default';
  isAuthModalOpen: boolean;
  language: 'RU';
  currentGame: TGame | null;
  lastScore: null | number | IMultiPLayerScore[];
}
