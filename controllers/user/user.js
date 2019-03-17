const User = require('../../schemas/user');

exports.register = (req) => {
  return new Promise((resolve, reject) => {
    let {id, firstname, lastname, phone, address} = req.body;
    if(!id || !firstname || !lastname || !phone || !address)
      reject('id || firstname || lastname || phone || address params are missing');

    const newUser = new User({
      _id: id,
      firstname, lastname, phone, address
    });
    newUser.save((err, user) => {
      if (err) reject(err.message);
      resolve(user);
    });
  });
}
