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
- [x] - Settings
    - [x] - user profile card
    - [ ] - user info edit modal
    - [x] - logout button
    - [x] - app settings card
- [ ] - link api endpoints with frontend
    - plan and code
- [ ] - redesign user profile

- [ ] - link functionality with endpoints
    

    - [ ] - general
    
        - Managing State
	    - [/] - Learn redux toolkit
		- query
		- managing multiples states 
            - [ ] - API should retreive data everytime user navigate through pages
            - [ ] - API should retrieve data everytime user adds or edits relevant data
            - [ ] - User auth state must presist every reload
        - [ ] - protect private routes
    - [ ] - recap redux concepts
        - [ ] - understand importance of combineReducers
        - [ ] - learn data flow
        - [ ] - learn queries
    - [ ] - add top level redux state & make actions to retreive data properly
    - [ ] - show loading animation in pages
        
    - [ ] - home
        - [ ] - home sort drodown
        - [ ] - add expense record
        - [ ] - incomes chart
        - [ ] - expense chart
        - [ ] - show expense record list
        - [ ] - add income record
        - [ ] - show income record list
        - [ ] - edit expense record
        - [ ] - edit income record
        - [ ] - delete expense record
        - [ ] - delete income record
    - [ ] - Accounts
        - [ ] - feed pie chart by fetching all accounts records
        - [ ] - list of accounts
        - [ ] - view account
        - [ ] - edit account
        - [ ] - add new account
    - [ ] - Settings
        - [ ] - show user name and email
        - [ ] - edit user info
        - [ ] - logout user
        - [ ] - change default user app settings

    - [ ] - Start to implement authentication



#### Backend API

- Architecture
    - request
    - router
    - controller
        - handling stuff that realted to HTTP (reqeusts and responses)
    - service layer
        - business logic goes in service layer
    - data access layer
        - data access layer is responsible for hanlding database mutations and queries

- [x] - create new mongoose database

- [x] - Expense
    - [x] - Controller
    - [x] - Service
    - [x] - Model
    - [x] - /api/expense - create expense record
    - [x] - /api/expense/:id - get expense record by id
    - [x] - /api/expense/:id - update expense record
    - [x] - /api/expense/:id - delete expense record

- [x] - Income
    - [x] - Controller
    - [x] - Service
    - [x] - Model
    - [x] - /api/income - create income record
    - [x] - /api/income/:id - get income record by id
    - [x] - /api/income/:id - update income record
    - [x] - /api/income/:id - delete income record

- [x] - Account
    - [x] - Controller
    - [x] - Service
    - [x] - Model
    - [x] - /api/account - create account
    - [x] - /api/account/:id - get account by id
    - [x] - /api/account/:id - update income record
    - [x] - /api/account/:id - delete income record

- [x] - Sorting endpoints
    - [x] - /api/expense/?time=7days
    - [x] - /api/expense/?time=thismonth
    - [x] - /api/expense/?time=lastmonth
    - [x] - /api/expense/?time=thisyear
    - [x] - /api/expense/?time=lastyear

    - [x] - /api/income/?time=7days
    - [x] - /api/income/?time=thismonth
    - [x] - /api/income/?time=lastmonth
    - [x] - /api/income/?time=thisyear
    - [x] - /api/income/?time=lastyear

- [ ] - Feed frontend with example data
    - [ ] - add example data set to mongodb
        - [ ] - incomes example data set
        - [ ] - expense example data set
        - [ ] - accounts example data set

- [ ] - Build the rest of the frontend components

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

- Account Entry
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
- Previous Monthly Records


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

