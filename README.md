# Burger Stellar - create your own burger and order :yum:

Click [here](https://dzhal.github.io/burger-stellar/) to see the deployed App.

This is an educational project Yandex Practicum:

1. **Techonologies**

- React JS
- React Router Dom (v6)
- Redux Toolkit
- React DND
- Typescript
- Websocket
- uuid
- React intersection observer
- Module CSS structure
- Jest for unit tests
- Cypress for e2e tests
- ESlint: Airbnb

2. **Features**

- Auth/registration with JWT
- Validation of inputs auth/reg forms
- Protected routes
- Drag and drop mechanic to add ingredient to constructor
- Drag and drop mechanic to change order of ingredients in constructor
- Removing ingredient on click trash icon from contructor
- Real-time calculating price of burger
- Order feed with websocket
- Modals with createPortal
- Getting ingredients from API
- Scroll to block with ingredients on tab click
- Setting active tab on scroll
- Creating orders for auth users
- Used [UI library](https://yandex-praktikum.github.io/react-developer-burger-ui-components/docs/) from Yandex
- Real-time refreshing data in order feed (./feed) with websocket

3. **How to install**
   1. Clone project `https://github.com/dzhal/burger-stellar.git`
   2. Install all dependencies `npm install`
   3. Start dev project `npm start`
   4. Launch unit tests `npm test`
   5. Launch e2e test `npx cypress open`
   6. If you want to deploy project in not root directory, you need to add props `basename="yourPath"` to `BrowserRouter`
   7. Create build package for deploy `npm run build`
