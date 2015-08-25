/*! zhText Text Editor $Revision$
Homepage: ./zhtext-info.html
Copyright (C) 2011 Ian Low
Released under the MIT license.
URL: ./zhtext-license.html
Date: $Date$
File: $HeadURL$ */
//---------------------------------------------------------------
//FILE: zhutils.js
//DESC: JavaScript utilities for zhText
/*---------------------------------------------------------------
loadSelectOptions(id) - POPULATES SELECT OBJECT (obj - obj of select object, opts - pipe-delimited string with carat delimitig value and option e.g. "|val1?opt|val2?opt2|") !*/
function loadSelectOptions(obj, opts){
  var aOpts=opts.split('|');
  var count=0;
  for (var i=0; i<aOpts.length; i++){
    var aValOpt=aOpts[i].split('?');
    if ((aValOpt[0]!= null)&&(aValOpt[1]!= null)){
      obj[count] = new Option(aValOpt[1], aValOpt[0]);
      count++;
    }
  }//endFor
}//endFunction

/*---------------------------------------------------------------
loadSelectFromCookie(obj,cookieStr) - LOAD SELECT OPTIONS FROM COOKIE (obj - select object, cookieStr - cookie name string): */
function loadSelectFromCookie(obj, cookieStr){
  var listOpts=getCookie(cookieStr); 
  loadSelectOptions(obj, listOpts);
}//endFunction

/*---------------------------------------------------------------
MAIN - MAIN OF ZHUTILS.JS (once tested, this should go in bodyInit()): */

/*
var allNodes='';
for (var i=0; i<document.all.length; i++){
  allNodes+='[' + i + ') ';
  //if (document.all[i].nodeType!=null) allNodes+=document.all[i].nodeType + ': ';
  if (document.all[i].nodeName!=null) allNodes+=document.all[i].nodeName + ': ';
  if (document.all[i].id!=null)allNodes+=document.all[i].id + ': ';
  if (document.all[i].value!=null) allNodes+=document.all[i].value + ': ';
  //allNodes+=document.all[i].text + ': ';
  allNodes+='] ';
}//endFor
//alert(allNodes);
*/

