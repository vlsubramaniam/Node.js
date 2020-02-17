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

const bcrypt = require('bcryptjs');

const myFunction = async () => {
  const password = 'Red12345!';
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};

myFunction();
