# 📚 BookBazaar

A full-stack online marketplace for buying and selling new and used books. BookBazaar allows users to list books they no longer need, discover affordable used books, add books to their cart or wishlist, place orders, and manage their sales and profile.

## 🚀 Project Overview

BookBazaar is designed to give books a second life instead of letting unused books go to waste.

Users can:

- 📚 Sell books they no longer need
- 🔍 Search books by title, author, or category
- 🏷️ Filter books by category
- 💰 Filter books by maximum price
- 📖 View detailed information about books
- 🛒 Add books to a shopping cart
- ❤️ Add books to a wishlist
- 📦 Place orders
- 🛍️ View their purchased books/orders
- 💼 View sales received for their listed books
- ✏️ Edit their listed books
- 🗑️ Delete their listed books
- 👤 Manage their profile
- 🔐 Register and securely log in
- 🚪 Log out of their account

---

## ✨ Features

### 🔐 User Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Logout functionality
- Login/Register navigation based on authentication status

### 📚 Book Management

Users can list books for sale with:

- Book title
- Author
- Price
- Description
- Category
- Condition

Users can also:

- View their listed books
- Edit their books
- Delete their books
- View detailed book information
- See seller information

### 🔎 Search & Filtering

The home page provides:

- Search by book title
- Search by author
- Search by category
- Category filtering
- Maximum price filtering
- Clear filters option

### ❤️ Wishlist

Users can:

- Add books to their wishlist
- View saved books
- Remove books from wishlist
- Open book details directly from the wishlist

### 🛒 Shopping Cart

The cart supports:

- Adding books to cart
- Preventing duplicate books
- Removing books
- Automatic total price calculation
- Item count
- Proceeding to checkout

Cart data is stored using browser `localStorage`.

### 💳 Checkout & Orders

Users can:

- Review their selected books
- View subtotal and total
- Remove books before ordering
- Place orders
- Automatically create an order for each book
- View placed orders

### 📦 My Orders

Buyers can view:

- Purchased book
- Price
- Seller information
- Order status
- Order date

### 💰 My Sales

Sellers can view orders received for their books.

They can:

- View buyer information
- View order price
- View order status
- Accept pending orders
- Reject pending orders

Order statuses include:

- Pending
- Accepted
- Rejected
- Shipped
- Delivered

### 👤 User Profile

Users can:

- View their profile
- View name and email
- View phone number
- View location
- Edit profile information
- Update phone number and location

### 🎨 User Interface

The project includes responsive UI for:

- Home
- Login
- Register
- Sell Book
- Book Details
- My Books
- Edit Book
- Cart
- Checkout
- Wishlist
- My Orders
- My Sales
- Profile

---

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Axios
- HTML
- CSS
- JavaScript
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Development Tools

- VS Code
- Git
- GitHub
- MongoDB Atlas
- Postman / Thunder Client

---

## 🏗️ Project Architecture

```text
BookBazaar
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SellBook.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── MyBooks.jsx
│   │   │   ├── EditBook.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── SellerOrders.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── orderController.js
│   │   └── wishlistController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── orderRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md



🔄 Application Flow
                    ┌──────────────┐
                    │   Register   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │    Login     │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │     Home     │
                    └──────┬───────┘
                           ↓
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
     Browse Books      Sell Book        Wishlist
          ↓                ↓                ↓
     Book Details      My Books       Saved Books
          ↓                ↓
        Cart          Edit/Delete
          ↓
      Checkout
          ↓
      Place Order
          ↓
     My Orders
          │
          │
          ↓
      Seller
          ↓
      My Sales
          ↓
   Accept / Reject

🔐 Authentication Flow

JWT is used for authentication.

After successful login:
User Login
    ↓
Backend verifies credentials
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
User redirected to Home
    ↓
Protected features become available


⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/indira7-kosaraju/BookBazaar.git

2. Open the project
cd BookBazaar

3. Install backend dependencies
cd server
npm install

4. Configure environment variables
Create a .env file inside the server folder.
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

5. Start the backend
npm run dev
or:
node server.js

6. Install frontend dependencies
Open another terminal:
cd client
npm install

7. Start the frontend
npm run dev
The frontend will normally run at:
http://localhost:5173
The backend will normally run at:
http://localhost:5000



🧪 Features Tested
The following features have been implemented and tested:
✅ User registration
✅ User login
✅ JWT authentication
✅ Logout
✅ Home page
✅ Book listing
✅ Search
✅ Category filtering
✅ Price filtering
✅ Book details
✅ Sell book
✅ My Books
✅ Edit book
✅ Delete book
✅ Cart
✅ Checkout
✅ Place order
✅ My Orders
✅ My Sales
✅ Accept order
✅ Reject order
✅ Wishlist
✅ Remove wishlist item
✅ Profile
✅ Edit profile
✅ Update profile
✅ Responsive UI




🎯 Future Improvements::

Possible future enhancements:
💳 Online payment integration
🖼️ Book image uploads
⭐ Book ratings and reviews
🔔 Order notifications
📍 Location-based book search
💬 Buyer-seller messaging
📊 Seller dashboard with sales statistics
🔎 Advanced filtering
📦 Shipping and delivery tracking
🔐 Password reset
📧 Email notifications
🌐 Deployment to production



🎓 Project Purpose
BookBazaar aims to create a simple and affordable platform where students and readers can exchange books.
Instead of keeping unused books on shelves, users can sell them to other readers while buyers can find used books at lower prices.
Give Your Books a New Life.
Sell the books you no longer need and discover quality used books at affordable prices.

👨‍💻 Author
BookBazaar — Full Stack Web Development Project
Built using the MERN stack.

⭐ If you like this project
If you find this project useful, consider giving the repository a ⭐ on GitHub.

## Live URLs

Frontend URL : https://book-bazaar-git-main-indira3.vercel.app/
Backend URL :https://bookbazaar-backend-9llb.onrender.com/
