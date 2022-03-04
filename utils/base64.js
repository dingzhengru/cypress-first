module.exports = {
  utf8_to_b64(str) {
    // return window.btoa(unescape(encodeURIComponent(str)));
    return Buffer.from(str).toString('base64');
  },
  b64_to_utf8(str) {
    // return decodeURIComponent(escape(window.atob(str)));
    return Buffer.from(str, 'base64').toString('utf8');
  },
};
