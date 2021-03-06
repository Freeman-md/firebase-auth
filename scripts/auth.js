// listen for auth status changes
auth
  .onAuthStateChanged(user => {
    if (user) {
      db
        .collection('guides')
        .onSnapshot(snapshot => {
          setupGuides(snapshot.docs)
          setupUI(user)
        }, err => {
          console.log(err.message)
        })
    } else {
      setupGuides([])
      setupUI()
    }
  })

// create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()

  db
    .collection('guides')
    .add({
      title: createForm['title'].value,
      content: createForm['content'].value
    })
    .then(() => {
      const modal = document.querySelector('#modal-create')
      M.Modal.getInstance(modal).close()
      createForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

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
      return db
        .collection('users')
        .doc(cred.user.uid)
        .set({
          bio: signUpForm['signup-bio'].value
        })
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup')
      M.Modal.getInstance(modal).close()
      signUpForm.reset()
      signUpForm.querySelector('.error').innerHTML = ''
    })
    .catch(err => {
      signUpForm.querySelector('.error').innerHTML = err.message
    })

})

// logout 
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault()
  auth.signOut()
})

// login
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // get user info
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      // close login modal and reset from
      const modal = document.querySelector('#modal-login')
      M.Modal.getInstance(modal).close()
      loginForm.reset()
      loginForm.querySelector('.error').innerHTML = ''
    })
    .catch(err => {
      loginForm.querySelector('.error').innerHTML = err.message
    })

})