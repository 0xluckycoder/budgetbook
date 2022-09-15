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
- [x] - Organize resources
- [x] - TopNav
    - [ ] - refactor topnav
- [x] - SideNav
- [x] - Home
    - [x] - overwrite antd styles
    - [x] - page layout
    - [x] - reusable button
    - [x] - account card
    - [x] - incomes card
    - [x] - expenses card
    - [x] - expense records card
    - [x] - income records card
    - [x] - Portals
        - [x] - New Expense Portal
        - [ ] - New Income Portal
            - [x] - try to display both add and view & income/expense data in same portal
- [x] - Accounts
    - [x] - accounts total card
    - [x] - redesign list of accounts with dropdown
    - [x] - list of accounts
    - [x] - add new account portal
    - [ ] - edit current account portal    
- [ ] - Payments (skip this section for now)
- [ ] - Settings
- [ ] - redesign user profile

#### Backend API
- [x] - create new mongoose database
- [/] - Expense
    - [ ] - Controller
    - [ ] - Service
    - [ ] - Model
    - [x] - /api/expense - create expense record
    - [x] - /api/:id - get expense record by id
    - [/] - /api/:id - update expense record
    - [ ] - /api/:id - delete expense record

- [ ] - Income
    - [ ] - Controller
    - [ ] - Service
    - [ ] - Model
    - [ ] - /api/expense - create expense record
    - [ ] - /api/:id - get expense record by id
    - [ ] - /api/:id - update expense record
    - [ ] - /api/:id - delete expense record


#### Data Entries
- Expense Entry
    - ID
    - userId - (FK)
    - title
    - amount - required
    - category - required
    - transactionDate - required
    - photos
    - comment
    - account - required

- Income Entry
    - ID
    - userId - (FK)
    - title
    - amount
    - category
    - transactionDate
    - photos
    - comment
    - account

- Finance Account Entry
    - ID
    - userId - (FK)
    - name
    - value - initial value
    - currencyType
    - description

#### Resources
- File System
    - https://www.taniarascia.com/react-architecture-directory-structure - using this one
    - https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
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

- src
    - assets
    - components
        - forms
            - TextField
            - Select
        - routing
            - PrivateRoute
        - layout
            - navigation
                - navbar
    - services
        - api
        - LocalStorage
    - store
        - authentication
        - authors
        - books
    - utils
        - constants
        - helpers
    - views
        - Authors
            - AuthorsPage
            - AuthorBlurb
        - Books
            - BooksPage
            - BookForm
        - Login
            - LoginPage
            - LoginForm
    

#### Frontend Routes
- /home
- /accounts
- /payments
- /settings
- /goals
- /statistics
 
#### Branding
- [x] - Decide a name for the app
- [x] - Design a new logo
- [x] - Choose theme color

#### App Features
- Sorting by
    - week
    - month
    - year
    - max

- Income
    - adding income record
    - expense category / name
    - expense date
    - add photos
    - Comment
    - Amount
    - period (week / month / year / custom select)

- Expenses
    - adding expense record
    - expense category / name
    - expense date
    - add photos
    - Comment
    - Amount
    - period (week / month / year / custom select)

- Finance Accounts
    - add finance account
    - account name
    - initial value
    - currency type
    - description

#### Planned Features
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

## New Feature Ideas


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

