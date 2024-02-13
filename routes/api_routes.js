// Create a 'router' using express
const router = require('express').Router();


// Import the User model
const { User } = require('../models')


/*
Create a POST route to register a new user and send the new user object back to the client
- If mongoose throws an 11000 error(unique/already created), send back a json response with a 'User already exists' message
- For any other mongoose errors(err.errors), send back a json response with a 'messages' property that is an array of all mongoose errors that were thrown
*/
router.post('/register', async (req, res) => {
  try {
    // const user = await connection;
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({
        error: 403,
        message: 'A user already exists with that email address'
      });
    }

    // If user ID not long enough
    if (err.kind === 'ObjectId') {
      return res.status(403).json({
        message: 'User with that ID could not be found'
      })
    }

    // 
    if (!err.errors) {
      return res.status(500).json({
        message: 'The server encountered an error'
      })
    }

    let messages = [];
    for (let prop in err.errors) {
      messages.push(err.errors[prop].message)
    }
    res.json({
      error: 403,
      messages
    });
  }

  })




// const userController = require('../../controllers/userControllers')

// Export the router object
module.exports = router