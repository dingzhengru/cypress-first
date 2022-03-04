const { white } = require('colorette');

describe('RG', () => {
  beforeEach(() => {
    cy.fixture('ae.json').as('JsonData');
  });

  it('下注 AE', function () {
    //* SessionKey
    let requestData = { GameType: this.JsonData.GameType, ServerName: this.JsonData.ServerName };
    let session, gameUrl;

    cy.task('apiGetMemberSessionKey', requestData).then(result => {
      if (result.ErrorMessage) {
        cy.log(result.ErrorMessage);
      }
      cy.wrap(result).its('ErrorCode').should('eq', '0');
      session = result.SessionKey;

      //* GameUrl
      requestData = { SessionKey: session };
      cy.task('apiGetGameUrl', requestData).then(result => {
        cy.log(this.JsonData.ServerName);
        if (result.ErrorMessage) {
          cy.log(result.ErrorMessage);
        }
        cy.wrap(result).its('ErrorCode').should('eq', '0');
        gameUrl = result.List.GameUrl;
        cy.log(gameUrl);

        //* 進入遊戲
        cy.visit(gameUrl);

        const gameType = this.JsonData.gameType;
        const serverName = this.JsonData.ServerName;

        //* 確認遊戲是否正常
        cy.wait(3000);
        cy.screenshot(`${serverName}/viewport`, { capture: 'viewport', overwrite: true });
        cy.get('html').as('elHtml').click(0, 60);
        cy.get('html').as('elHtml').click(500, 310); //* 點正中央，因為有可能有贈送模式出現
        cy.wait(1000);
        cy.get('html').as('elHtml').click(0, 60);
        cy.get('canvas').should('be.visible');
        cy.wait(3000);

        //* 擷取開始按鈕
        const startName = `${serverName}/start-btn`;
        const startClip = { capture: 'viewport', overwrite: true, clip: { x: 450, y: 500, width: 120, height: 120 } };
        cy.screenshot(startName, startClip);

        //* 擷取帳戶餘額 (開始)
        const balanceNameStart = `${serverName}/balance-start`;
        const balanceNameEnd = `${serverName}/balance-end`;
        const balanceClip = { capture: 'viewport', overwrite: true, clip: { x: 785, y: 570, width: 133, height: 20 } };
        const balanceStartImgPath = `cypress/screenshots/rg/ae.spec.js/${balanceNameStart}.png`;
        const balanceEndImgPath = `cypress/screenshots/rg/ae.spec.js/${balanceNameEnd}.png`;
        cy.screenshot(balanceNameStart, balanceClip);
        cy.task('getImageText', balanceStartImgPath).then(balance => {
          balance = Number(balance.replaceAll(',', ''));
          cy.log(`帳戶餘額 (未開始): ${balance}`);
        });

        function startBet(app) {
          cy.screenshot(balanceNameStart, balanceClip);
          const startPos = { x: 500, y: 550 };
          cy.get('@elHtml').click(startPos.x, startPos.y);
          cy.wait(10000);

          //* 擷取帳戶餘額 (結束)
          cy.screenshot(balanceNameEnd, balanceClip);
          cy.task('getImageText', balanceStartImgPath).then(balanceStart => {
            cy.log('--------------------');
            cy.log(app.JsonData.ProviderID);
            balanceStart = Number(balanceStart.replaceAll(',', ''));
            cy.task('getImageText', balanceEndImgPath).then(balanceEnd => {
              balanceEnd = Number(balanceEnd.replaceAll(',', ''));
              const winLose = balanceEnd === 0 ? 0 : balanceEnd - balanceStart;
              cy.log(`中獎金額: ${winLose}`);
              cy.log(`帳戶餘額: ${balanceEnd}`);

              const filename = `data/${app.JsonData.ProviderID}.csv`;
              const betData = { ...app.JsonData, winLose: `${winLose}` };
              cy.task('appendBetData', { filename, betData });
            });
          });
        }

        const count = 2;
        for (let i = 0; i < count; i++) {
          startBet(this);
          cy.wait(3000);
        }
      });
    });
  });
});
