const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const User = require('./models/user');

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://root:zxasqw12@backend.8kyeizy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Check if the imaginary user exists in the users collection
    User.findOne({ id: 123123 })
      .then(user => {
        if (!user) {
          // Create a new document for the imaginary user
          const imaginaryUser = new User({
            id: 123123,
            first_name: 'moshe',
            last_name: 'israeli',
            birthday: 'January, 10th, 1990'
          });
          imaginaryUser.save()
            .then(() => {
              console.log('Imaginary user created');
            })
            .catch(err => {
              console.error('Error creating imaginary user:', err);
            });
        }
      })
      .catch(err => {
        console.error('Error checking user:', err);
      });
  })
  .catch(error => console.error('Failed to connect to MongoDB Atlas:', error));

// Use the routes
app.use('/', routes);

// Handle 404 errors
app.use((req, res) => {
  console.log('404 - Endpoint not found');
  res.status(404).json({ error: 'Endpoint not found' });
});

// Handle internal server errors
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
