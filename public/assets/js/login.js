/* global alert, hoodie */
'use strict'

var $form = document.querySelector('#login-form')
var $signOut = document.querySelector('[data-action=sign-out]')
var $signIn = document.querySelector('[data-action=sign-in]')
var $signUp = document.querySelector('[data-action=sign-up]')
var $username = document.querySelector('#username')
var $loginLink = document.querySelector('#login-link')

if ($signOut) {
  $signOut.addEventListener('click', handleSignOutClick)
}
if ($form) {
  $signIn.addEventListener('click', handleSignInClick)
  $signUp.addEventListener('click', handleSignUpClick)
}

if (hoodie.account.isSignedIn()) {
  handleSignedIn()
} else {
  handleSignedOut()
}

hoodie.account.on('signout', handleSignedOut)
hoodie.account.on('signin', handleSignedIn)

function handleSignedOut () {
  $username.classList.add('hide')
  $signOut.classList.add('hide')
  $loginLink.classList.remove('hide')
}

function handleSignedIn () {
  $username.innerText = hoodie.account.username
  $username.classList.remove('hide')
  $signOut.classList.remove('hide')
  $loginLink.classList.add('hide')
}

function handleSignOutClick () {
  hoodie.account.signOut()
}

function handleSignInClick (event) {
  event.preventDefault()

  var username = document.querySelector('#formUsr').value
  var password = document.querySelector('#formPwd').value

  // sign in, if it fails, try to sign up first
  hoodie.account.signIn({
    username: username,
    password: password
  })
  .then(function () {
    $form.reset()
  })
  .catch(function (error) {
    alert(error)
  })
}

function handleSignUpClick (event) {
  event.preventDefault()

  var username = document.querySelector('#formUsr').value
  var password = document.querySelector('#formPwd').value

  return hoodie.account.signUp({
    username: username,
    password: password
  })

  .then(function () {
    return hoodie.account.signIn({
      username: username,
      password: password
    })
  })
  .then(function () {
    $form.reset()
  })
  .catch(function (error) {
    alert(error)
  })
}
