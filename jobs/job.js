const User = require('../models/User'); 

module.exports = (agenda) => {
  agenda.define('delete unverified user', async (job) => {
    const { email } = job.attrs.data; // Access the email passed during job scheduling
    const user = await User.findOne({ email });

    if (user && !user.verified) {
      await User.deleteOne({ email });
      console.log(`Deleted unverified user with email: ${email}`);
    } else {
      console.log(`User with email: ${email} is already verified or does not exist.`);
    }
  });
};
