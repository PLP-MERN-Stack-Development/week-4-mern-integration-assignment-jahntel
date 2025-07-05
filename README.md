MERN Stack Blog Application

![Blog Application Screenshot](screenshots/app-screenshot.png)

A full-featured blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, post management, categories, comments, and image uploads.

## Features

- **User Authentication**
  - Registration and login system
  - JWT token-based authentication
  - Protected routes
  - User profiles

- **Blog Post Management**
  - Create, read, update, and delete posts
  - Rich text content
  - Featured images with Cloudinary integration
  - Post categories

- **Interactive Features**
  - Comment system
  - Post liking functionality
  - Search and filtering
  - Pagination

- **Admin Features**
  - User management
  - Category management
  - Content moderation

## Technologies Used

### Frontend
- React.js
- React Router
- Context API (State Management)
- React Bootstrap (UI Components)
- Axios (HTTP Client)
- React Hook Form (Form Handling)
- Cloudinary (Image Upload)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Multer (File Upload)
- Cloudinary SDK (Image Storage)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas connection string)
- Cloudinary account (for image uploads)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-blog-app.git
   cd mern-blog-app
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```
   Edit the `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Run the application**
   - In one terminal:
     ```bash
     cd server
     npm run dev
     ```
   - In another terminal:
     ```bash
     cd ../client
     npm run dev
     ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Documentation

The backend API follows RESTful conventions. Here are the main endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/me` - Get current user profile

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comments` - Add a comment

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category (admin only)

## Project Structure

```
mern-blog-app/
├── client/               # Frontend React application
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   │   ├── api/          # API service modules
│   │   ├── assets/       # Images, styles, etc.
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context providers
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # App entry point
│   └── .env             # Frontend environment variables
│
├── server/              # Backend Node.js application
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
│
├── screenshots/         # Application screenshots
└── README.md            # This file
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
