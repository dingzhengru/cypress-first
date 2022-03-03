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

const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');

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
      console.log('------------getImageText------------');
      await worker.terminate();
      return result.data.text;
    },
  });
};
