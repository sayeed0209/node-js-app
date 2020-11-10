const fs = require('fs');
const uuid = require('uuid');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'OK',
    responsLenght: users.length,
    data: { users },
  });
};

// create a new user account
exports.createNewUser = (req, res) => {
  const newId = uuid.v4();
  const newUser = Object.assign({ _id: newId }, req.body);
  console.log(newUser);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { user: newUser },
      });
    }
  );
};

exports.getUserbyId = (req, res) => {
  const _id = req.params.id;
  const user = users.find((el) => el._id == _id);
  res.status(200).json({
    status: 'ok',
    data: { user: user },
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({ status: 'error', msg: 'user updated not defiend' });
};
exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', msg: 'user delete route not defiend' });
};
