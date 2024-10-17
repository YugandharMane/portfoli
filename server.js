const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nileshPortfolioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});

// Create a model for the form
const Contact = mongoose.model('Contact', contactSchema);

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Save the form data to MongoDB
  const newContact = new Contact({ name, email, phone, message });
  
  newContact.save()
    .then(() => res.status(200).json({ message: 'Form submitted successfully' }))
    .catch(err => res.status(500).json({ error: 'Form submission failed' }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
