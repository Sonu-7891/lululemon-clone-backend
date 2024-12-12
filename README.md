# Lululemon Clone Project

This project is a full-stack web application inspired by the Lululemon website. It includes a feature-rich frontend built with React and a robust backend implemented with Node.js and Express. Below are the details for setting up and running both the frontend and backend components of the project.

---

## Table of Contents

- [Backend](#backend)
  - [Technologies Used](#backend-technologies-used)
  - [API Endpoints](#api-endpoints)
  - [Setup](#backend-setup)
  - [Scripts](#backend-scripts)
- [Screenshots](#screenshots)
- [License](#license)

---


## Backend

### Backend Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- dotenv for environment configuration

### API Endpoints
| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| POST   | `/auth/register` | Registers a new user            |
| POST   | `/auth/login`    | Logs in a user                  |
| GET    | `/products`     | Fetches all products            |
| GET    | `/products/:id` | Fetches a specific product      |
| POST   | `/cart`         | Adds an item to the cart        |
| GET    | `/cart`         | Retrieves user’s cart items     |
| DELETE | `/cart/:id`     | Removes an item from the cart   |

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. The backend will run at:
   ```
   http://localhost:5000
   ```

### Backend Scripts
| Script         | Description                           |
|----------------|---------------------------------------|
| `npm start`    | Starts the server                     |
| `npm test`     | Runs unit tests (if configured)       |

---



## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

### Contribution Guidelines
Feel free to fork this repository and submit pull requests for new features or bug fixes. Make sure to adhere to the coding standards and include proper documentation for any new functionality.

