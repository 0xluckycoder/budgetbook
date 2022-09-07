
## budgetbook
Personal finance manager app

## Technologies

### Frontend
- React
- Sass
- Antdesign
- Redux

### Backend
- Nodejs
- MongoDB
- AWS tools (cognito / s3)

## Todo
- [x] - Research and list down core functionality of a budget managing app
- [x] - Design a logo
- [ ] - Complete the UI Design
- [ ] - Start Building UI with antd
- [x] - Learn Redux State Management
- [x] - Learn React hooks
- [x] - Learn React HOC
- [/] - Organize resources
- [/] - TopNav
- [/] - SideNav
- [ ] - Clean up and oragnize according to filesystem
- [ ] - Break into components and fix

#### Resources
- File System
    - https://github.com/altence/lightence-ant-design-react-template
    - https://aamnah.com/redux/redux-folder-structure-patterns
    - https://github.com/alexanderrudnik/lightence-admin
    - https://github.com/taniarascia/takenote

#### File Structure
- src
    - api
    - store
        - slices
    - components
    - containers
    - router
    - pages
    - utils

#### Frontend Routes
- /home
- /accounts
- /payments
- /settings
- /goals
- /statistics
 
#### Branding
- [ ] - Decide a name for the app
- [ ] - Design a new logo
- [ ] - Choose theme color

#### Common Features
- User Account
    - Language
    - default account
    - default period
    - default theme (light / dark)
    - delete all data

- Money Accounts
    - user can have different accounts with different values
    - each account have seperate income & expenses listed out

- Expenses
    - adding expense record
    - expense category / name
    - expense date
    - add photos
    - Comment
    - Amount
    - period (week / month / year / custom select)

- User Account
    - Language
    - default account
    - default period
    - default theme (light / dark)
    - delete all data

- Money Accounts
    - user can have different accounts with different values
    - each account have seperate income & expenses listed out

- Expenses
    - adding expense record
    - expense category / name
    - expense date
    - add photos
    - Comment
    - Amount
    - period (week / month / year / custom select)

- Income
    - adding income record
    - expense category / name
    - expense date
    - add photos
    - Comment
    - Amount
    - period (week / month / year / custom select)

- Charts
    - all general chart / expense / profit / loss ( by year / by month / by day)
    - expenses chart ( by year / by month / by day)
    - income chart ( by year / by month / by day )

- Regular payments
    - payment name
    - reminder frequency
    - start date
    - time
    - end date
    - account
    - category
    - amount
    - comment

- Reminders
    - name
    - frequency
    - day
    - time
    - comment

- Currency
    - select your preferred currency

- Settings
    - User Profile
        - first name
        - last name
        - profile picture
        - logout
        - password change
        - delete all user data
    - Language
    - Default Account
    - Default Period


###  UI Design
[Figma UI Design](https://www.figma.com/proto/VQyuxu1DiNoVAnUR5sCiOy/budgetbook?node-id=14:9&scaling=min-zoom&page-id=0:1)

- [x] - Dashboard
    - [x] - Should include incomes and expenses records
    - [x] - Most important statistic charts
    - [ ] - Add income portal
    - [x] - Add expense portal
- [x] - Accounts
    - [x] - Regular payments / planned payments / recurring payments
- [ ] - Goals
- [ ] - Statistics
- [ ] - Settings
    - [ ] - user profile edit portal

