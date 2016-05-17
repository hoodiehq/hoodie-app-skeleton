'use strict'

// initialize Hoodie
var hoodie  = new Hoodie();

$(function () {

  if (hoodie.account.username) {
    $('#login-username').append(hoodie.account.username).removeClass('hide');
    $('#logout-btn').removeClass('hide');
  } else {
    $('#login-btn').removeClass('hide');
  }

  $('#login-btn').bind('click', login);
  $('#logout-btn').bind('click', logout);
  $('#login-form').bind('submit', loginForm)
})

  var login = function login () {
    location.href = 'login.html';
  }

  var logout = function logout () {
    hoodie.account.signOut();
    location.reload();
  }

  var loginForm = function loginForm () {
    var usr = $('#formUsr').val();
    var pwd = $('#formPwd').val();

    hoodie.account.signIn(usr, pwd)
    .done(function() {
      if (hoodie.account.username) {
        location.href = 'index.html';
      }
    })
    .fail(function() {
      hoodie.account.signUp(usr, pwd, pwd)
        .done(function() {
          if (hoodie.account.username) {
            location.href = 'index.html';
          }
        })
        .fail(function() {
          alert('Your credentials are wrong!');
        })
    })

    return false;
  }