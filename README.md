![logo](https://budgetbook.s3.ap-south-1.amazonaws.com/Budgetbook..png)

[Click here for a Preview](https://budgetbook.s3.ap-south-1.amazonaws.com/video-1.gif)

Purpose of this application is to allow users to track their expenses and incomes

### β¨ Features
---
- Easily manage expenses/incomes over multiple accounts
  - ex - (bank / personal / investment)
- Easy to setup and integrate
- Free managed system for non-developers (coming soon)
- Sort incomes/expenses based on different time periods
- Different charts to visualize data
- Low management because most of the infrastructure is cloud based
- No Ads

### πGetting Started
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

### π οΈTechnologies
---
Following are the main technologies that i've used. you can find more about dependencies by locating to ``package.json`` file on each client and server directories.
#### Front end
-   Figma UI
-   React
-   Redux RTK
-   Ant Design
-   Sass
-   recharts (D3 based)

##### Front end File Structure
Detailed guide for the frontend architecture can be found [here](https://www.taniarascia.com/react-architecture-directory-structure/)
```
src/
ββ assets/
ββ components/
β  ββ layout
β  β  ββ Layout.js
β  ββ router/
β  β  ββ RouterName.js
β  ββ GlobalComponent
β  β  ββ GlobalComponent.js
β  β  ββ GlobalComponent.scss
ββ store/
β  ββ user/
β  β  ββ user.slice.js
β  ββ store.js
ββ utils/
ββ views/
β  ββ Home/
β  β  ββ HomePage/
β  β  β  ββ HomePage.js
β  β  β  ββ HomePage.scss
β  β  ββ HomeComponent/
β  β  β  ββ HomeComponent.js
β  β  β  ββ HomeComponent.scss
App.js
app.scss

```
#### Back end
- Node / Express
- AWS Cognito
- AWS S3
- MongoDB

##### Back end File Structure
Detailed guide for the backend architecture can be found [here](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)
```
src/
ββ controllers/
β  ββ userController.js
ββ database/
β  ββ user.js
ββ images/
ββ models/
β  ββ UserEntry.js
ββ services/
β  ββ userService.js
ββ utils/
ββ v1/
β  ββ api
|  |  ββ userRoutes.js/
index.js
middlewares.js
```
### πLicense
---
Budgetbook is an MIT-licensed open source project.
