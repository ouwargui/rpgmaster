interface onJoinedRoomData {
  room: string;
  user: string;
}

type OnLeftRoomData = onJoinedRoomData;

export {onJoinedRoomData, OnLeftRoomData};
