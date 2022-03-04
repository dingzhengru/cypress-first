/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');
const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');
const dayjs = require('dayjs');
const { apiTransfer, apiGetMemberSessionKey, apiGetGameUrl } = require('../../api/rg.js');

//* set axios interceptors
const axios = require('axios');
const { interceptorsRequest, interceptorsResponse, interceptorsResponseError } = require('../../api/interceptors.js');
axios.interceptors.request.use(interceptorsRequest);
axios.interceptors.response.use(interceptorsResponse, interceptorsResponseError);

//* settings
const { RG_API_MEMBER_ID, BUCKET } = require('../../settings.js');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('after:screenshot', details => {
    console.log('-----------------------after:screenshot---------------------------');
    console.log(details);
  });

  on('task', {
    async getImageText(imgPath) {
      console.log('--------------task: getImageText----------------');
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const jimpImage = await Jimp.read(imgPath);
      const img = await jimpImage.greyscale().contrast(1).getBase64Async(Jimp.AUTO);
      const result = await worker.recognize(img);
      console.log('------------getImageText------------');
      await worker.terminate();
      return result.data.text;
    },
    async getImageBase64Text(imgBase64) {
      console.log('--------------task: getImageText----------------');
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const imgBuffer = Buffer.from(imgBase64.split(',')[1], 'base64');

      const jimpImage = await Jimp.read(imgBuffer);
      const img = await jimpImage.greyscale().contrast(1).getBase64Async(Jimp.AUTO);
      const result = await worker.recognize(img);
      await worker.terminate();
      return result.data.text;
    },
    async appendBetData({ filename, betData }) {
      console.log('-------appendBetData---------');
      //* 查看是否已有檔案，沒有的話就新增，並把標頭文字填入
      try {
        const result = await fs.readFileSync(filename, { encoding: 'utf8' });
        console.log(result);
      } catch {
        const headList = [
          'memberID',
          'providerID',
          'gameType',
          'gameName',
          'serverName',
          'bucketID',
          'winLose',
          'date',
        ];
        const headData = headList.join(',') + '\n';
        await fs.writeFileSync(filename, headData, 'utf8');
      }

      const data =
        [
          RG_API_MEMBER_ID,
          betData.ProviderID,
          betData.GameTypeName,
          betData.GameName,
          betData.ServerName,
          BUCKET,
          betData.winLose,
          dayjs().format('YYYY/MM/DD HH:mm:ss'),
        ].join(',') + '\n';
      await fs.appendFileSync(filename, data);
      return null;
    },
    apiTransfer,
    apiGetMemberSessionKey,
    apiGetGameUrl,
  });
};
