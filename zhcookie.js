/*! zhText Text Editor $Revision$
Homepage: ./zhtext-info.html
Copyright (C) 2011 Ian Low
Released under the MIT license.
URL: ./zhtext-license.html
Date: $Date$
File: $HeadURL$ */
//---------------------------------------------------------------
//FILE: zhcookie.js
//DESC: Cookie utilities for zhText
/*---------------------------------------------------------------
getCookieVal() - DESC (notes): */
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}//endFunction

/*---------------------------------------------------------------
getCookie() - DESC (notes): */
function getCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) 
      break;
  }
  return null;
}//endFunction

/*---------------------------------------------------------------
setCookie() - DESC (notes): */
function setCookie (name, value) {
  var argv = setCookie.arguments;
  var argc = setCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = (argc > 3) ? argv[3] : null;
  var domain = (argc > 4) ? argv[4] : null;
  var secure = (argc > 5) ? argv[5] : false;
  document.cookie = name + "=" + escape (value) +
    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
}//endFunction

/*---------------------------------------------------------------
delCookie() - DESC (notes): */
function delCookie(name) {
  var exp = new Date();
  FixCookieDate (exp); // Correct for Mac bug
  exp.setTime (exp.getTime() - 1);  // This cookie is history
  var cval = getCookie (name);
  (cval != null)
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}//endFunction

