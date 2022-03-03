# cypress-first

## 如何使用 node_modules

- 官方說明: [連結](https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-require-or-import-node-modules-in-Cypress)
- cypress task: [連結](https://docs.cypress.io/api/commands/task)
- cypress plugin: [連結](https://docs.cypress.io/api/plugins/writing-a-plugin)

因為 spec.js 的代碼是在瀏覽器中執行的，所以無法直接引入使用  
需在 plugins/index.js 中新增 task (執行 nodejs 代碼) & exec (執行 shell command)  
來讓 spec 使用，另外有預設的 task 可使用 (參考上面 plugin 連結)

## 路徑

讀取檔案時的路徑，在 plugins/index.js 讀取時，需是像這樣 `cypress/downloads/captcha-1926.png`
