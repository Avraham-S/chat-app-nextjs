export const addUsernameToSocket = (socket: any, next: any) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
};

module.exports = { addUsernameToSocket };
