function getRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  getRequestID(length) {
    //* 32字串 (唯一值即可)，時間戳 (13) + 隨機字串 (19)
    return String(new Date().getTime()) + getRandomString(length - 13);
  },
};
