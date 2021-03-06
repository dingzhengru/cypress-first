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
    // const imgPath = 'cypress/downloads/captcha-1926.png';
    const imgPath =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAA6CAYAAAC09mszAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARxSURBVHhe7ZrpkcMgDIW3OneTWtxJCkkfqcMbnGBzSCBA4rDRzPuz8YX08SR79m9Zli2kv78N/LtW7Per6errLVlfFKYR1UvBb7fRoD8q3S0RMc18xHVJZ5pqI1aYJHfvdIb+tcM0CzXFodnmEjQ3XVgTJgZNyL6aME2xqSpMcwfbulo+ojBBCw4lYQLTVqX5zzlfnzPbXKagpN9tI7nrbQLTaEm/GyS5qgjTur22T7xW4LcppdGhlYfp8dzeCiIdncF0V9ehrjslP3IwuRDpyISp+6Jj6zXi/XzA515EZJjoxVz3Y3/Z2x4tnIlQWM7nWPf+/Y3X6v7+a+9HvLbV+v1U9xsmoiozk5lsSZgezyhCQODFpehc23t7PuBjluWxWY+mNhl4XJ5iEFr5V8F8f60qMFlFJsJkJoiyY72EJUUIhIDMm0YKdLj1L3wH45QD7xHhjVPqjOwwQQ+UA1OK8hzJjXSHSnNcp90JOTS0qdxZrRQaTN06E13uTFIQSc/m7v4YjDytDgUBmhMrt9NsmFLoFoWJ0t/2pFKgS3EnoJUE1yY4NwE5aPHmiMLEaYWtYdLzSfzQtNnJu14KTFx56AQkpS7aXAm4lHlJw6TuE4u0wdgEJAKi04ZYCl6htaVo+JmpLUx02c+Z+fZoCWizn5B6foqawsTRSlNgSjmWV3bhOVwJXEsFVwrVDISJo8imMJg4NAJM1n1ZCg6/TLR0JSV2Z4JApMKUA3H3MFlzTdnXdi14HXmtk9M4hpuZ3MX3DZPpIDwgYbPS9n77w/gvar3dDTuAa6gkYSrbtWbRuUBSwr6XmfeAgOMY+sOqApMqyhG3mJmkQPoI+Vjmuw8EnSxQwzqTFgWQ79DrJ9eC/Be5MJ0uJgiSkgOTXgPUykDuBN/4hoeJ8gU8JcqcSRikj7DNA85FSG543NeXGEzmvJEDk3l+WNgMkRf5iZYHSSkJJuSfBKUG8vGd6SMswTmRC9NpAnIgKSXBhG00gRooXQImJS6gcmA6QaIMuLrAYehQZ0Za14SJXdAr8TcUJBTgUmE6r0l8U9Iw5A7CSOuC84rkY8JULnaYjMJSzzuMBYCJNiemAAIfO2cmBvHCZBTKWFMICKtDFeQBXAfodBBMct+aqsBkJZH5O0cKIKwwIbMLNcrcAZqFIEiA44b+zuT1eN6dMSpMdAdEBNzfv6YLk5wrKYnARCnaEaVtj1BUOkyyyeaWtx7XdZzcSM1KWlXaXKmCgyn2dmPGDiw8jKprnyH7jUhEKDC2KxU7IUFDwKQFQ4W83WRE6s6lvX3VEea6NSDSKoYJS6hkor1rF84v3xjQlTrTUM4UEnVOUyD6Mdas1EIUc7gMTLuyHKpfR5J0dy6Zz9g1TNnJJA/lwLkdagSolMgwjbIgTKM//whq7kwcRb4yKNS19ZCDoWamO7nLiGtlg0li8XeC5wqyYJrFmyqRSJubUN5T1WamCVieWuUt575DDeAp4i7ClTZD6lqox3cJ05UKdyeRYZoFngpr2f4Bg4gcQ2oQYeoAAAAASUVORK5CYII=';
    const imageText = await cy.task('getImageBase64Text', imgPath);
    cy.log(imageText);
    cy.visit('https://google.com');
    cy.get('input[name="q"]').type(imageText);
    cy.get('form[action="/search"]').submit();
  });
});
