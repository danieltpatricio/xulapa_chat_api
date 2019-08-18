const admin = require("firebase-admin");
const serviceAccount = require("./xulapa-chat-api-firebase-adminsdk.json");

const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xulapa-chat-api.firebaseio.com"
  });
};

const createUser = ({ email, password }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

module.exports = {
  init,
  createUser
};
