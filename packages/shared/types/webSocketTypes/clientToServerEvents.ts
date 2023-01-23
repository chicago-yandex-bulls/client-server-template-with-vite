import type { TUser } from '../apiTypes';
import type { TColorTheme, TGame, TPlayer, TPosition } from '../gameTypes';

export interface IClientToServerEvents {
  createRoom: (creator: TUser) => void;
  joinRoom: (roomId: TGame['roomId'], player: TUser) => void;
  changeTheme: ( user: TUser, theme: TColorTheme  ) => void;
  start: (roomId: TGame['roomId']) => void;
  changeCursorPosition: (data: {
    roomId: TGame['roomId'];
    playerId: TUser['id'];
    coords: TPosition;
    isBoost: TPlayer['isBoost'];
  }) => void;
  userDisconnected: (roomId: TGame['roomId'], user: TUser) => void;
  decreaseSnake: (roomId: TGame['roomId'], user: TUser) => void;
}
