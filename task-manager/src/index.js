const app = require('./app');
const port = process.env.PORT;
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
