// const { createWorker } = require('tesseract.js');
// const Jimp = require('jimp');

describe('My First Test', () => {
  // it('Visits & Search Google', () => {
  //   let x = [1, 2, 3];

  //   x.forEach(item => {
  //     cy.visit('https://google.com');
  //     cy.get('input[name="q"]').type(item.toString());
  //     cy.get('form[action="/search"]').submit();
  //   });
  // });

  // it('發送需求 & 取得回應後搜尋、擷取畫面', async () => {
  //   const res = await cy.request({
  //     url: 'http://ip-api.com/json',
  //     method: 'GET',
  //   });

  //   cy.log(JSON.stringify(res.body));

  //   cy.visit('https://google.com');
  //   cy.get('input[name="q"]').type(res.body.country);
  //   cy.get('form[action="/search"]').submit();

  //   //* capture default: fullPage
  //   cy.screenshot('fullPage', { capture: 'fullPage', overwrite: true });
  //   cy.screenshot('runner', { capture: 'runner', overwrite: true });
  //   cy.screenshot('viewport', { capture: 'viewport', overwrite: true });

  //   //* clip
  //   cy.screenshot('viewport-clip', {
  //     capture: 'viewport',
  //     overwrite: true,
  //     clip: { x: 20, y: 20, width: 200, height: 200 },
  //   });
  // });
  it('圖像辨識 & Search Google ', async () => {
    const imgPath = 'cypress/downloads/captcha-1926.png';
    const imageText = await cy.task('getImageText', imgPath);
    cy.log(imageText);
    cy.visit('https://google.com');
    cy.get('input[name="q"]').type(imageText);
    cy.get('form[action="/search"]').submit();
  });
});
