import type { Socket } from 'socket.io';

import { SOCKET_ERRORS } from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents } from '../../shared/types';

// create handler for changeTheme event
export const addChangeThemeEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
) => {
  // listen for changeTheme event
  socket.on('changeTheme', ( user, theme) => {
    // Если он есть
    if (user.id) {
      // Меняем ему тему
      user.colorTheme = theme;
    } else {
      // Иначе сообщаем об ошибке
      socket.emit('error', SOCKET_ERRORS.PLAYER_NOT_FOUND);
    }
  });
};
