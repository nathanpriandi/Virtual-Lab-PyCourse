# Virtual-Lab-PyCourse

Welcome to **Virtual-Lab-PyCourse**, an interactive online platform designed to make learning Python programming engaging and accessible for everyone. This web-based application provides a virtual laboratory where users can read materials, write and execute Python code directly in the browser, and test their knowledge with quizzes.

## Features

- **Interactive Python Modules**: Step-by-step lessons covering fundamental Python concepts, from variables and data types to loops and functions.
- **Live Code Editor**: An in-browser code editor with syntax highlighting where you can write, run, and see the output of your Python code instantly.
- **Integrated Quizzes**: Test your understanding at the end of each module with multiple-choice quizzes to reinforce learning.
- **User Authentication**: Secure sign-up and login system to save your progress.
- **Progress Tracking**: Keep track of the modules you have completed.
- **Responsive Design**: Learn on the go from any device, be it a desktop, tablet, or smartphone.

## Tech Stack

This project is a full-stack application built with modern web technologies:

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool and development server for modern web projects.
  - **React Router**: For client-side routing.
  - **CodeMirror**: A versatile text editor implemented in JavaScript for the browser.
  - **Pyodide**: A port of CPython to WebAssembly, allowing Python to run directly in the browser.

- **Backend**:
  - **Node.js**: A JavaScript runtime for building server-side applications.
  - **Express**: A minimal and flexible Node.js web application framework.
  - **MongoDB**: A NoSQL database for storing user data and progress.
  - **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  - **JSON Web Tokens (JWT)**: For securing the API and managing user sessions.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: You need a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### Installation & Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/Virtual-Lab-PyCourse.git
   cd Virtual-Lab-PyCourse
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add your MongoDB connection string and a JWT secret:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```sh
     npm start
     ```
   The backend will be running at `http://localhost:5000`.

3. **Frontend Setup**:
   - Open a new terminal and navigate to the `frontend` directory:
     ```sh
     cd frontend
     ```
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Start the frontend development server:
     ```sh
     npm run dev
     ```
   The frontend will be running at `http://localhost:5173`.

4. **Access the application**:
   Open your browser and go to `http://localhost:5173` to start using the application.

## Usage

1. **Sign Up / Log In**: Create a new account or log in with your existing credentials.
2. **Explore Modules**: From the homepage, browse through the available Python modules.
3. **Learn & Code**: Click on a module to read the material and experiment with the live code editor.
4. **Take Quizzes**: After completing a module, take the quiz to test your knowledge.
5. **Track Progress**: Your completed modules will be marked, and you can view your progress on your profile page.

## Project Structure

The project is organized into two main parts: a `frontend` (client-side) and a `backend` (server-side).

```
Virtual-Lab-PyCourse/
├── backend/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── data/
    │   ├── pages/
    │   └── App.jsx
    ├── vite.config.js
    └── package.json
```

- **`backend/`**: Contains the Node.js and Express application that handles API requests, user authentication, and database interactions.
- **`frontend/`**: Contains the React application that provides the user interface, code editor, and interactive learning modules.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.
