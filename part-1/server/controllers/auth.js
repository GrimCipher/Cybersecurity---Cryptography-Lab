const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
    }
}
register: (req, res) => {
  console.log('Registering User')
  console.log(req.body)
  const { username, password, otherProperties } = req.body
  
  bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
          return res.status(500).send("Error hashing password")
      }
      const newUser = {
          username: username,
          passwordHash: hash,
          otherProperties: otherProperties
      }
      users.push(newUser)
      res.status(200).send(newUser)
  })
}

login: (req, res) => {
  console.log('Logging In User')
  console.log(req.body)
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  if (!user) {
      return res.status(400).send("User not found.")
  }
  
  bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (err || !result) {
          return res.status(401).send("Invalid username or password")
      }
      
      const { passwordHash, ...userWithoutHash } = user;
      res.status(200).send(userWithoutHash)
  })
}


const { encrypt, decrypt } = require('./cipher')


const plaintext = "I love cryptography!"
const ciphertext = encrypt(plaintext)
console.log("Encrypted:", ciphertext)
console.log("Decrypted:", decrypt(ciphertext))
