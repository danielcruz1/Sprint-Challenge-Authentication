const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../api/api-model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash;

  Users.insert(user)
      .then(userN => {
          res.status(200).json(userN)
      })
      .catch(error => {
          console.log(error)
          res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.filtering({username})
      .then(user => {
          if(user && bcrypt.compareSync(password, user.password)){
              const token = generateToken(user);
              res.status(200).json({
                  message: `Welcome ${user.username}...you've got Token!`,
                  token,
                });
          }
          else{
              res.status(401).json({ message: 'Check your credentials.' })
          }
      })
      .catch(error => {
          console.log(error)
          res.status(500).json({message: `Login error.`})
      })
});

function generateToken(user){
  const payload = {
      username: user.username,
      subject:user.id,
      department: user.department
  };
  const options ={
      expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
