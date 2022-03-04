const axios = require('axios');
const { getRequestID } = require('../utils/string.js');
const { API_RG_URL, BUCKET, RG_API_MEMBER_ID, RG_API_PASSWORD, RG_OPERATOR } = require('../settings.js');

module.exports = {
  async apiTransfer(data, call = 'WFundTransfer2') {
    console.log('----------------apiTransfer--------------------');
    data.RequestID = getRequestID(32);
    data.TransferID = getRequestID(32);

    //* x-www-form-urlencoded 格式
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    params.append('call', call);
    const result = await axios.post(API_RG_URL + '/', params);
    return result.data;
  },
  async apiGetMemberSessionKey(data, call = 'VPSGetMemberSessionKey') {
    console.log('----------------apiGetMemberSessionKey--------------------');
    data.RequestID = getRequestID(32);
    data.BucketID = BUCKET;
    data.MemberID = RG_API_MEMBER_ID;
    data.Password = RG_API_PASSWORD;

    const params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    params.append('call', call);
    const result = await axios.post(API_RG_URL + '/', params);
    return result.data;
  },
  async apiGetGameUrl(data, call = 'VPSGetMemberBySessionKey') {
    console.log('----------------apiGetGameUrl--------------------');
    data.RequestID = getRequestID(32);
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    params.append('call', call);
    const result = await axios.post(API_RG_URL + '/', params);
    return result.data;
  },
};
