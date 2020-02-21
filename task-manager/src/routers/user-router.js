const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send('Logged out successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send('Logged out all sessions successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get('/users/:id', async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send('User Not Found!!!');
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.send(400).send({ error: 'Inavlid updates' });
  }

  try {
    // const _id = req.params.id;
    // const options = {
    //   new: true,
    //   runValidators: true
    // };
    // const user = await User.findByIdAndUpdate(_id, req.body, options);
    const user = req.user;
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    // if (!user) {
    //   return res.status(404).send();
    // }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

const upload = multer({
  // dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload jpg, jpeg or png files'));
    }
    cb(undefined, true);
  }
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
