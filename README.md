## budgetbook
Personal finance manager app

test
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
    

            - [ ] - User auth state must presist every reload
        - [ ] - protect private routes
    - [ ] - recap redux concepts
        - [ ] - understand importance of combineReducers
        - [ ] - learn data flow
        - [ ] - learn queries
    - [ ] - add top level redux state & make actions to retreive data properly
    - [ ] - show loading animation in pages
        
    - [/] - home
        - [x] - home sort dropdown
        - [x] - add expense record
            - [x] - validate fields
            - [x] - validation
            - [x] - handle frontend image upload
                - [x] - build request to send
                - [x] - multiple or single upload with multer
                - [x] - configure s3
                - [x] - upload to s3 storage
            - [x] - handle backend image upload
            - [x] - construct the expense record add request with uploaded images
            - [x] - clean up the validation
            - [ ] - add loading spinner
            - [x] - move popup modal to separate component if necessary
                - think about ways to make it reusable
        - [x] - create Modal component that supports Add/Edit/View record data
        - [x] - view expense record
            - [x] - design card UI for the record view
                - get inspiration and develop a good view
        - [x] - edit expense record
            - [x] - persist data between mutations
            - [x] - make images editable
                - [x] - loop and show existing images using url as source
                - [x] - show blob uploaded images
                - [x] - add remove option to images
                - [x] - add zoom option to images
                - [x] - upload newly updated images and add to photos object
            - [x] - construct the patch request to update
            - [x] - invalidate cache
            - [x] - fix date show and update bug
        - [x] - delete expense record
        - [x] - add initial load spinner in expense list
        - [x] - add image zoom effect on modals
        - [/] - move components for individual files with styles & clean up the code
            - [/] - review how others react code is written
            - [ ] - clean up the code
            - [ ] - make expense-image endpoint global for everything
        - [x] - build warning component
        - [x] - expense chart

        - [x] - fix record list alignment issue
        - [x] - add image zoom & remove capability to add expense record modal

        - [ ] - handle large text uploads
        - [ ] - add description to server side routes
            - use substitute function and read more option 
        - [ ] - sort items top to show the latest items
            - only sort list of records not the chart
        - [x] - fix .length undefined error issue when adding records
        - [ ] - try to fix the chart problem
        - [x] - fix comment required issue  

        - [x] - create separate slice for incomes
        - [x] - add income record
        - [x] - show income record list
        - [x] - edit income record
        - [x] - delete income record
        - [x] - incomes chart
        - [ ] - match the frontend validation min max fields with backend validation min max

    - [-] - Accounts
        - when first signing up user will get asked to create a account
        - [x] - create a slice for accounts
        - [x] - create backend route to fetch accounts by user's id
        - [x] - create test account just for testing
        - [x] - add new account
        - [/] - user shouldn't be able to add more than 3 records.
            - [/] - server validation (implement this after the authentication is completed)
            - [ ] - frontend validation
        - [ ] - deleting account should also delete all the transactions related to it
        - [ ] - view account
        - [ ] - edit account
        - [x] - list of accounts
        - [ ] - feed pie chart by fetching all accounts records
    - [/] - Authentication
        - [-] - add continue with google and github federation authentication
        - [-] - add recaptcha security
        - [x] - go through the cognito
        - [x] - explore the previous ecommerce code
        - [x] - create & configure cognito account
        - [x] - go through the best practices
        - [/] - develop auth endpoints
            - [x] - Auth
                - [x] - /api/auth/signup
                    - [x] - create empty attribute account for user as well
                    - [x] - automatically confirm the user for now
                - [x] - /api/auth/signin
                - [x] - /verifyAuth  
                - [-] - /confirmEmail/:token
        - [x] - design authentication pages UI along with account setup steps
        - [/] - develop frontend pages
            - [x] - configure authentication slice
            - [x] - setup the auth state with RTK
            - [x] - SignIn
                - [x] - show error messages
                - [x] - show the loading spinner 
                - [x] - update slice to have a initial state
                    - read the RTK and understand how to deal with initial states
                    - read examples
                    - temporarily change the api to test
                - [ ] - clear response errors between auth pages
            - [/] - SignUp
                - [x] - 1st step
                - [/] - navigation components
                    - [ ] - validation
                    - [x] - password must be more than 8 characters
                    - [x] - password match
                - [/] - 2nd step
                    - [/] - validate before go to next step
                - [ ] - 3rd step 
                - [ ] - 4th step
                
            - [x] - disable public image upload

            - [ ] - currency conversion for bigger ammounts
                - 2500000 to 2.5M
            - [ ] - match the min max validation with server
            - [ ] - optimize every view field with substr to show minimum number of characters
            - [ ] - optimize sass after styling
            - [ ] - User info step 
            - [ ] - Finance Account Step
            - [ ] - Compete Step

            - [ ] - fix auth error alert error

        - Authentication work flow
            - client sends a login request with credentials
            - if credentials are correct server will return tokens with user details
                - first name
                - last name
                - user profile url
                - email address
                - subId
            - client will store retrieved data in state
            - these data will be store in state globally to ease of access

        - [ ] - update server return object

        - Loading user preferred default settings
            - fetch user attribute object with config first
            - then based on user object config load data appropriately

        - [ ] - learn to debug code
        - [ ] - learn different test types and Q/A

        - [ ] - handle authentication in frontend

        - [ ] - fix the chart tooltip bug

    - [ ] - Settings
        - [ ] - show user name and email
        - [ ] - edit user info
        - [ ] - logout user
        - [ ] - change default user app settings
    
    - [ ] - validate the fetched data accuracy
        - test manually
    - [ ] - Optimize RTK - (https://redux.js.org/tutorials/essentials/part-6-performance-normalization)
    - [ ] - Optimize necessary components
        - Research and find out how to benchmark and test react apps and optimize performance
        - https://youtu.be/i9mMe7Esl7Y
        - https://youtu.be/4FhJkX18fS8 - react pro dos and donts

    - [ ] - Start to implement authentication


Reload Site?
changes you made may not be saved
prevent this page from creating additional dialogs
button 1 - reload
button 2 - cancel

#### Backend API

- Architecture
    - request
    - router
    - controller
        - handling stuff that related to HTTP (reqeusts and responses)
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

- [x] - Financial Account
    - [x] - Controller
    - [x] - Service
    - [x] - Model
    - [/] - /api/account/user/:id - get all the accounts related to user id
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

- [x] - User Account
    - [x] - Controller
    - [x] - Service
    - [x] - Modal
    - [x] - /api/auth/signup
    - [x] - /api/auth/signin
    - [-] - /confirmEmail/:token
    - [x] - /verifyAuth  

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

- User Entry
    - authorizeSubId
    - language
    - currency
    - defaultAccount
    - defaultSortPeriod

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

