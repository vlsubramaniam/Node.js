const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');

const app = express();
const port = process.env | 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server stared at port ${port}`));

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
//     expiresIn: '7 days'
//   });
//   // console.log(token);
//   // const data = jwt.verify(token, 'thisismynewcourse');
//   // console.log(data);
// };

// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1ODE5NTY5OTd9.noQTxgfwBJNScdznA4dSft4g_xBxp8ZpkZSOQ4q6ciA
// /*
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 -> base64 encoded json string - "Header"
// eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1ODE5NTY5OTd9 -> base64 encoded json string - "Payload or Body"
// noQTxgfwBJNScdznA4dSft4g_xBxp8ZpkZSOQ4q6ciA -> "Signature" used to verify the token
// */
// myFunction();
const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload PDF'));
    }
    // cb(new Error('File must be a PDF'));
    cb(undefined, true);
    // cb(undefined, false);
  }
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});
