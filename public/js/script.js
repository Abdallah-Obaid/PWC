'use strict';

let URL = 'https://www.linkedin.com/oauth/v2/authorization';

let options = {
  response_type:'code',
  client_id:'77wcte95rcnlli',
  redirect_uri:'https://ems-access-denied.herokuapp.com/oauth',
  scope:'r_emailaddress r_liteprofile',
};

let QueryString = Object.keys(options).map((key) => {
  return `${key}=` + encodeURIComponent(options[key]);
}).join('&');

let authURL = `${URL}?${QueryString}`;
let link = document.getElementById('oauth');
link.setAttribute('href', authURL);