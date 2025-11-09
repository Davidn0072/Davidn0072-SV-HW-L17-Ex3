const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// מאפשר קבלת JSON מהבקשות
app.use(express.json());

// מאפשר לשרת קבצים סטטיים מתיקיית public
app.use(express.static('public'));

// GET לדף הבית
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST לטופס הרישום
app.post('/submit-register-data', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  let errMsg = "";

  if (!(username.length >= 4 && username.length <= 8))
    errMsg = `Invalid username length (${username.length})`;
  else if (!email.includes('@'))
    errMsg = 'Invalid Email';
  else if (!(password.length >= 5 && password.length <= 10))
    errMsg = `Invalid password length (${password.length})`;
  else if (!password.includes('$'))
    errMsg = 'Password must contain $';
  else if (password !== confirmPassword)
    errMsg = 'Confirm password does not match password';

  if (errMsg === "") {
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;
    const fullpath = path.join(__dirname, 'users.txt');

    fs.appendFile(fullpath, userData, (err) => {
      if (err) {
        console.error(err);
        return res.send('<h2>Server Error</h2>');
      }
      res.send(`<h2>Hello ${username}</h2><a href="/">Back</a>`);
    });
  } else {
    res.send(`<h2>Error Registration</h2><br>${errMsg}<br><a href="/">Back</a>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
