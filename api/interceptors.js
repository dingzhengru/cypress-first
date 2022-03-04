const axios = require('axios');
const md5 = require('blueimp-md5');
const { API_RG_URL, RG_API_TOKEN_ID, RG_API_TOKEN } = require('../settings.js');
const { utf8_to_b64 } = require('../utils/base64.js');

// function checkUrlIsRG(url) {
//   console.log('checkUrlIsRG');
//   console.log(url);
//   return API_RG_URL === '/' + url.split('/')[1];
// }

module.exports = {
  interceptorsRequest(config) {
    console.log('-------in-request-------');
    console.log(config.data);
    const call = config.data.call || config.data.get('call');
    const data = config.data.data || config.data.get('data');
    const tokenID = RG_API_TOKEN_ID;
    const token = RG_API_TOKEN;
    const timestamp = new Date().getTime();
    config.headers = {
      Authorization: 'Basic ' + utf8_to_b64(`${tokenID}:${token}`),
      'X-RG-Time': timestamp,
      'X-RG-Hash': md5(token + call + data + timestamp),
    };

    return config;
  },
  interceptorsResponse(res) {
    console.log('-------in-response-------');
    console.log(res.data);
    return res;
  },
  interceptorsResponseError(error) {
    console.log('-------in-response-error-------');
    console.log(error);
    return Promise.reject(error);
  },
};

// axios.interceptors.request.use(config => {
//   if (checkUrlIsRG(config.url)) {
//     const call = config.data.call || config.data.get('call');
//     const data = config.data.data || config.data.get('data');
//     const tokenID = 'vps_h3';
//     const token = 'D224A848-0F43-421D-B24A-01447FC9522E';
//     const timestamp = new Date().getTime();
//     config.headers = {
//       Authorization: 'Basic ' + utf8_to_b64(`${tokenID}:${token}`),
//       'X-RG-Time': timestamp,
//       'X-RG-Hash': md5(token + call + data + timestamp),
//     };
//   }

//   return config;
// });

// axios.interceptors.response.use(
//   res => {
//     console.log(`[${res.config.url.replace(`${API_URL}/`, '')}]`, res.data);

//     //* RG API
//     if (checkUrlIsRG(res.config.url)) {
//       if (res.data.ErrorCode !== '0' && res.data.ErrorMessage) {
//         window.alert(res.data.ErrorMessage);
//       }
//     }
//     return res;
//   },
//   error => {
//     console.log('[Response Error]', error);
//     return Promise.reject(error);
//   }
// );
