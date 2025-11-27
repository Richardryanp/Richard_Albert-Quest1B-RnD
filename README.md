# Feedback Project

This project is a full-stack application built with React.js on the frontend and Express.js on the backend.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)

## Setup Instructions

### 1. Install Dependencies
# Go to the project root
cd feedback-project

# Install backend dependencies
cd server
npm i

# Install frontend dependencies
cd ..
cd client
npm i

### 2. Initialize BackEnd
# Go to server folder
cd ..
cd server

# Generate Prisma client
npx prisma generate

# Run the backend script
npx tsx script.ts

### 3. Run FrontEnd
# Go to client folder
cd ..
cd client

# Start the React development server
npm run dev

