import {Socket} from 'socket.io-client';

const join_room = (socket: Socket, room: string) => {
  socket.emit('join_room', room);
};

const leave_room = (socket: Socket) => {
  socket.emit('leave_room', '1234');
};

export {join_room, leave_room};
