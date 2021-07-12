// signup
const signUpForm = document.querySelector('#signup-form')
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  // get user info
  const email = signUpForm['signup-email'].value
  const password = signUpForm['signup-password'].value

  // sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.querySelector('#modal-signup')
      M.Modal.getInstance(modal).close()
      signUpForm.reset()
    })

})

// logout 
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault()
  auth
    .signOut()
    .then(() => {
      console.log('User signed out')
    })
})