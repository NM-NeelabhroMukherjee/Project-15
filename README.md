# Project-15- Privacy-Focused Notes App with Encryption

A secure note-taking application with client-side encryption using React.js and IndexedDB/MongoDB.

## Features
- Client-side AES-256 encryption
- Offline-first functionality (IndexedDB)
- Optional MongoDB backend
- Responsive design

## Prerequisites
- Node.js v16+ [Download](https://nodejs.org/)
- MongoDB (for backend) [Install Guide](https://docs.mongodb.com/manual/installation/)
- Git

# Install Dependencies
Frontend:
bash
cd ../client
npm install
Backend (optional):
bash
cd ../server
npm install


# Configuration
Encryption Key
Set your secret key in:

text
client/src/utils/encryption.js
Replace:

javascript
const SECRET_KEY = 'your-secret-key-123'; // Change this!
MongoDB (for backend)
Create a .env file in /server:

env
MONGODB_URI=mongodb://localhost:27017/privacy-notes

# Running the Application
Development Mode:
bash
Terminal 1: Start backend (optional)
cd ../server
node index.js

Terminal 2: Start frontend
cd ../client
npm start

Production Build:
bash
cd client
npm run build

Available Scripts
Frontend (/client)
npm start: Runs app in development mode

npm test: Launches test runner

npm run build: Creates production build

npm run eject: Advanced configuration

Backend (/server)
node index.js: Starts Express server

npm run dev: Starts with nodemon (if configured)

# Troubleshooting
Common Issues
Blank Page on Start

Clear cache: npm start -- --reset-cache

Check browser console for errors

MongoDB Connection Issues

Ensure MongoDB service is running

Verify connection string in .env

Encryption Errors

Ensure consistent SECRET_KEY across sessions

Don't change key after storing data
