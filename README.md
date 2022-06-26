# Expense Tracker

[Expense Tracker WebSite](https://frozen-ocean-08269.herokuapp.com)

# 專案介紹

這是一個記帳軟體，需要註冊並登入後使用，可以新增、刪除和編輯自己的每一筆支出，並且在首頁會列出每筆支出的資訊，且在首頁中會計算出目前的消費總額，輕鬆掌握目前的消費狀況，也可以透過類別篩選了解各個類別的消費情況。

# 開始使用

1. 進入"expense-tracker"資料夾
2. 安裝所需套件

   ```
   npm install
   ```

3. 依照 .env.example 建立 .env 文件，並填寫需要的環境變數
4. 產生種子資料

   ```
   npm run seed
   ```

5. 開啟伺服器

   ```
   npm run start
   ```

6. 打開瀏覽器輸入網址 http://localhost:3000
7. 關閉伺服器請按 `ctrl + c`

## 預設使用者帳號

```
  帳號：user1@example.com

  密碼：12345678
```

# 開發工具

- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 16.0.1
- express 4.17.1
- express-handlebars 4.0.2
- express-session 1.17.1
- method-override 3.0.0
- mongoose 5.9.17
- passport 0.4.1
- passport-local 1.0.0
