const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/privacy-notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Note Schema
const noteSchema = new mongoose.Schema({
  userId: String,
  encryptedTitle: String,
  encryptedContent: String,
  updatedAt: Date
});

const Note = mongoose.model('Note', noteSchema);

// Middleware to verify user token
const authenticate = (req, res, next) => {
  // In a real app, verify JWT or session token here
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).send('Unauthorized');
  }
  req.userId = userId;
  next();
};

// API Routes
app.get('/api/notes', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/notes', authenticate, async (req, res) => {
  try {
    const { encryptedTitle, encryptedContent } = req.body;
    const note = new Note({
      userId: req.userId,
      encryptedTitle,
      encryptedContent,
      updatedAt: new Date()
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.put('/api/notes/:id', authenticate, async (req, res) => {
  try {
    const { encryptedTitle, encryptedContent } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { encryptedTitle, encryptedContent, updatedAt: new Date() },
      { new: true }
    );
    if (!note) {
      return res.status(404).send('Note not found');
    }
    res.json(note);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.delete('/api/notes/:id', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!note) {
      return res.status(404).send('Note not found');
    }
    res.send('Note deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});