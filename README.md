![logo](https://budgetbook.s3.ap-south-1.amazonaws.com/Budgetbook..png)

Purpose of this application is to allow users to track their expenses and incomes

### ✨ Features
---
- Easily manage expenses/incomes over multiple accounts
  - ex - (bank / personal / investment)
- Easy to setup and integrate
- Free managed system for non-developers (coming soon)
- Sort incomes/expenses based on different time periods
- Different charts to visualize data
- Low management because most of the infrastructure is cloud based
- No Ads

### 🚀Getting Started
---
Install frontend dependencies

```
cd ./client && npm install
```
Install backend dependencies
```
cd ./server && npm install
```
#### Setup .env File
First you need a AWS IAM account with cognito pool and s3 bucket. you could call your cognito pool & s3 bucket whatever the name you want. just make sure to update appropriate values on .env file.

I'm using mongodb cloud as the database. you can easily setup your mongodb account by visiting to this [link](https://www.mongodb.com/)

```
MONGO_USER=
MONGO_PASSWORD=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_COGNITO_APP_CLIENT_ID=
AWS_USER_POOL_ID=
```

### 🛠️Technologies
---
Following are the main technologies that i've used. you can find more about dependencies by locating to ``package.json`` file on each client and server directories.
### Front end
-   Figma UI
-   React
-   Redux RTK
-   Ant Design
-   Sass
-   recharts (D3 based)

### Back end
- Node / Express
- AWS Cognito
- AWS S3
- MongoDB

### 📜License
---