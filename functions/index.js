const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  return admin
          .auth()
          .getUserByEmail(data.email)
          .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
              admin: true
            })
          }).then(() => {
            messafe = `Success: ${data.email} has been made an admin`
          })
          .catch(err => {
            return err
          })
})

// Deploy function sin terminal using - 
// firebase deploy --only functions