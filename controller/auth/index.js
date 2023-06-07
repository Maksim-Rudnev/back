const { whoAmI } = require('./whoAmI');
const { signIn } = require('./signIn');
const { registration } = require('./registration');

module.exports = {
  auth: {
    whoAmI,
    signIn,
    registration,
  },
};
