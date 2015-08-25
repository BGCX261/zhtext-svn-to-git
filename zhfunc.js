/*! zhText Text Editor $Revision$
Homepage: ./zhtext-info.html
Copyright (C) 2011 Ian Low
Released under the MIT license.
URL: ./zhtext-license.html
Date: $Date$
File: $HeadURL$ */
//---------------------------------------------------------------
//FILE: zhfunc.js
//DESC: Functions for zhText
/*---------------------------------------------------------------
OUTSTANDING CHANGES:
110409a - simplified input and chars
110408a - wait another week: add icon for frame
110407r - debug any errors
110407o - Chinese interface
110407n - Help
110407m - New
110407l - Print 
110407k - functionality to handle when user breaks out from incomplete char input
110407j - when saving as, ALWAYS saves as htm format
110407i - under info insert kx char@, fundamental etc
110407h - add tone number [1]@@@@@[2]@@@@@[3]@@@ etc to list of chars
110407g - add stroke count (1)@@@@(2)@@@@ etc to kxi index
110407f - enter 'shenme'
110407e - enter ?p - punctuation
110407d - enter ?s - symbol
110407c - enter ?m - math
110407b - display most common chars after each char selected
110407a - allow select from ta2 for char info
---------------------------------------------------------------
COMPLETED CHANGES:
110407p - font selector
110407q - save font to cookie
110407p - Copyright all source code
110411a - fix select option
110406m - if can't find in adict, then use achardict for single chars
110406l - how to make span top valign or remove top spacing or margin?
110406k - use bespoke buttons to open instead of flFile
110406j - KangXi lookup: @@@@k`ab<spc>`cd<spc>
110406i - debug=> undefined in char lookup
110406h - font selector
110406g - debuG=>input: if selection is ji`ab, user needs to enter ji`a, which then returns char @, user then needs to append b`, i.e. "@b<spc>" so that it selects the correct char.
110406f - debug=>bug caused by carriage returns missed out from pos count=>bug caused by focus for debug=> input inside ta1, keeping gCurPos, so that it is always set at correct pos using ? to lookup
110406e - show 36 chars and if single line, 1 char
110406d - enter 'ni' without tone
110406c - enter . and ,
110406b - show char selected
110406a - cookie to store list of prev files */
//---------------------------------------------------------------
/*rmvTags(str) - REMOVE HEADER AND BODY TAGS FROM SAVED HTML FILE (notes): */
function rmvTags(str){
str=str.replace(/^<HEAD><\/HEAD>\r\n<BODY>/g,"");
str=str.replace(/<\/BODY>$/g,"");
return str;
}//endFunction

//---------------------------------------------------------------
//btSaveFile.onclick() - SAVE FILE (notes):
btSaveFile.onclick=function(){
    var str=window.open();
    str.document.write(ta1.value);
    str.document.execCommand("saveas",'false',slFiles.value);
    str.close();
}//endFunction

//---------------------------------------------------------------
//dbg(str) - :
function dbg(str){
}//endFunction

//---------------------------------------------------------------
//dbg1(str) - DISPLAYS DEBUG INFO:
function dbg1(str){
  taDbg.value= gDbgCount + ":" + str + "\n"+taDbg.value;
  gDbgCount++;
  if (taDbg.value.length > 1000);
  taDbg.value=taDbg.value.substring(0, 1000);
}//endFunction

//---------------------------------------------------------------
//getSelChar(argstr) - SELECTS CHAR:
function getSelChar(argstr){
dbg("aaa1" + argstr);
   str=String(argstr).toLowerCase(); //zxc
dbg("aaa2" + str);
dbg(str);
 if (str.length==1){
   if((str>='a')&&(str<='z')){
     icol=str.charCodeAt(0) - 97;
   }else if((str>='0')&&(str<='9')){
     icol=parseInt(str) + 26;
   }else { icol=0;
   }
   ichar=icol;
dbg('3>'+ichar);
 }else {
   var irow=str.charCodeAt(1) - 97;
   str=str.charAt(0);
   if((str>='a')&&(str<='z')){
     icol=str.charCodeAt(0) - 97;
   }else if((str>='0')&&(str<='9')){
     icol=parseInt(str) + 26;
   }else { icol=0;
   }
   //var icol=str.charCodeAt(0) - 97;
   ichar=((irow+1)*36) + icol;
 }
dbg("aaa4" + "|" + irow + "^" + icol + "^" + ichar + "^" + gchars.substr(ichar,1));
   return gchars.substr(ichar,1);
}//endFunction

//---------------------------------------------------------------
//showInf(char) - SHOWS INFO FOR EACH CHAR:
function showInf(char){
var infstr=adict[char];
if (infstr==null){ infstr=achar[char]; }
inf(char + "  " + infstr, 'inf');
}//endFunction

/*=========================================================
==========================================================*/
function inf(msg,type){
  spInf.style.border='solid';
   if (type=='err'){
  spInf.style.borderWidth='1px';
  spInf.style.borderColor='#ff0000';
  spInf.style.backgroundColor='#ffcccc';
   }else {
  spInf.style.borderWidth='1px';
  spInf.style.borderColor='#0000ff';
  spInf.style.backgroundColor='#ccccff';
   }
  spInf.innerHTML=msg;
}
/*=========================================================
==========================================================*/
//document.onmouseup=function(e){
//document.onmouseup=function(e){
ta1.onselect=function(){
var char=document.selection.createRange().text;
showInf(char);
}
ta2.onselect=function(){
var char=document.selection.createRange().text;
showInf(char);
}
/*=========================================================
==========================================================*/
/*=========================================================
function fmtSelChars(str)
==========================================================*/
function fmtSelChars_keep110404(str){
var str=String(str);
gchars=str;
var retstr="a b c d e f g h i j k l m n o p q r s t u v w x y z";
var i=0;
var j=97;
try{
while (i<str.length){
 // retstr += ("\n" + String.fromCharCode(j++) + ": ");
  retstr += ("\n"); 
  retstr += str.substring(i, i+26);
  retstr += " " +  String.fromCharCode(j++);
  i += 26;
}//endwhile
ta2.rows=j-92;
}catch(e){
dbg(e.message);
}
return retstr;
}
/*=========================================================
function fmtSelChars(str)
==========================================================*/
function fmtSelChars(str){
var str=String(str);
gchars=str;
var retstr="a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9";
var i=0;
var j=97;
try{
while (i<str.length){
 // retstr += ("\n" + String.fromCharCode(j++) + ": ");
  retstr += ("\n"); 
  retstr += str.substring(i, i+36);
  if (i) retstr += "+" +  String.fromCharCode(j++) + "<spc>";
  i += 36;
}//endwhile
ta2.rows=j-92;
}catch(e){
dbg(e.message);
}
return retstr;
}
/*=========================================================
==========================================================*/
function loadFile(file){
var xmlhttp=window.ActiveXObject?
  new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
  try{
     ta1.value=xmlhttp.responseText;
     ta1.value=ta1.value.replace(/\r/g,"");
     inf(file);

dbg('a1');
gprevFiles='|' + file + '?' + file + '|';
dbg('a2');
for (var i=0; i<slFiles.options.length; i++){
dbg('a3');
  if (slFiles.options[i].value != file){
dbg('a4');
   gprevFiles += slFiles.options[i].value;
   gprevFiles += '?';
   gprevFiles += slFiles.options[i].value;
dbg('a5');
   gprevFiles += '|';
dbg('a6');
  }//endif
dbg('a7');
}//endfor
dbg('a8');
setCookie('prevFiles',gprevFiles,expiresDt);
aprevFiles=getCookie('prevFiles').split('|');
loadSelectOptions(slFiles, gprevFiles);


  }catch(e){
     inf("Error " + e.number + ": " + e.message + ". This file could be corrupted.", 'err');
  }finally{
  }
 }	
  xmlhttp.open("GET",file,true);
  xmlhttp.send();
}

/*---------------------------------------------------------------
slFiles.onchange() - SLFILES SELECT CHANGE EVENT (): */
slFiles.onchange=function(){
  loadFile(slFiles.value);
}//endFunction

/*=========================================================
==========================================================*/
flFile.onchange=function(e){
  loadFile(slFiles.value);
loadFile(flFile.value);
}

/*=========================================================
==========================================================*/
function getCaret(e1){

  if (e1.selectionStart){
    return e1.selectionStart;
  }else {
    e1.focus();
    var r=document.selection.createRange();
    if (r==null) return 0;
    var re=e1.createTextRange(), rc=re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart',re);
    return rc.text.length; 
  }
  return 0;


}
/*=========================================================
==========================================================*/
/*
function getCursorPosition(el,pos){
if (document.selection){
el.focus();
var sel=document.selection.createRange();
var sel2=sel.duplicate();
sel2.moveToElementText(el);
if (sel.text.length>1){
pos=pos-sel.text.length;
if(pos<0){
pos=0;
}
}
var caretPos=-1+pos;
sel2.moveStart('character',pos);
while(sel2.inRange(sel)){
sel2.moveStart('character');
caretPos++;
}
var selStr=sel.text.replace(/\r/g,"");
return {start: caretPos, end: selStr.length + caretPos};
}else if(el.selectionStart||el.selectionStart==0)
return {start: el.selectionStart, end: el.selectionEnd};
}
}
*/
/*=========================================================
==========================================================*/
function setCaretPosition(ctrl,pos){
if(ctrl.setSelectionRange){
   ctrl.focus();
   ctrl.setSelectionRange(pos,pos);
}else if (ctrl.createTextRange){

   var range=ctrl.createTextRange();
   range.collapse(true);
   range.moveEnd('character',pos);
   range.moveStart('character',pos);
   range.select();
}
}
/*=========================================================
==========================================================*/
function doGetCaretPosition(ctrl){
  var CaretPos=0;
  //IE
  if (document.selection){
     ctrl.focus();
     var sel=document.selection.createRange();
     sel.moveStart('character', -ctrl.value.length);
     CaretPos=sel.text.length;
  }
  //Firefox
  else if (ctrl.selectionStart || ctrl.selectStart == '0' ) 
     CaretPos=ctrl.selectionStart;
  return (CaretPos);
}
/*=========================================================
==========================================================*/
function insertChar(lchar, seq){
 var ita2=getSelChar(lchar);
 dbg1('638>'+lchar+"|"+ita2);

 showInf(ita2);
 if (seq=='1st'){
   ta1.value = ta1.value.substring(0,spStartPos.innerHTML) 
     + ita2  + ta1.value.substring(parseInt(spEndPos.innerHTML)+1);
   gCountKeysDown=0;
   spKeysPress.innerHTML=gCountKeysDown;
 }else {
   ta1.value = ta1.value.substring(0,spStartPos.innerHTML) 
     + ita2  + ta1.value.substring(parseInt(spEndPos.innerHTML)
     +  parseInt(spLinePos.innerHTML) -1);
 }
 gCurPos= parseInt(spStartPos.innerHTML) -
          parseInt(spLinePos.innerHTML) + 3 ;
 spEndPos.innerHTML=gCurPos;
 dbg1('692>' + gCurPos);
 setCaretPosition(ta1,gCurPos);
 window.event.keyCode=null;
}
/*=========================================================
==========================================================*/
ta1.onkeypress=function(){
gCountKeysDown++;
spKeysPress.innerHTML=gCountKeysDown;
var keycode=window.event.keyCode;
dbg("keycodepress>" + keycode);
var lchar=String.fromCharCode(keycode);
gLastKey3=gLastKey2;
gLastKey2=gLastKey1;
gLastKey1=lchar;



if (keycode==32){ //Space
   if (spKeysPress.innerHTML=='2'){
     dbg1('631>' + gLastKey2+"|" + gLastKey3);
     insertChar(gLastKey3 + gLastKey2, '');
     window.event.keyCode=null;
    }
}else if (keycode==96){ //`
  spEndPos.innerHTML=gCurPos;
  var preStr=ta1.value.substring(0, gCurPos);
  lLastKey2Tmp=gLastKey2;
  gLastKey2='';

  var lcode='\u4000';
  if ( ta1.value.charCodeAt(gCurPos - 1) > '\u4000'.charCodeAt(0) ){
        var retval=akx[ta1.value.charAt(gCurPos-1)];
          if (retval!=null){
             ta2.value=fmtSelChars(retval);
          }  
  }else {
    for (var i=gCurPos; i>0; i--){
       //if (ta1.value.charAt(i)=='`'){
       /* 3 conditions: @@@@ni1`
       1: prev char is a-z
       2: curr char is @ or non a-z
       3: at least 1 char prev to ` */
       if(
           (!((ta1.value.charAt(i) >='a')&&(ta1.value.charAt(i) <='z')))
         &&  ((ta1.value.charAt(i+1) >='a')&&(ta1.value.charAt(i+1) <='z'))
         &&( (gCurPos - i)>1)  ){
  
          spStartPos.innerHTML=i+1;
          lStart=i;
          lInput=ta1.value.substring(lStart+1,gCurPos);
        //----------------------------------
        var retval=apron[lInput];
        var tmp;
        dbg("here2");
        if (retval==null){
        tmp=apron[lInput + '1']; if(tmp==null) tmp='';
        if (tmp!=null) retval = tmp;
        tmp=apron[lInput + '2']; if(tmp==null)tmp='';
        if (tmp!=null) retval += tmp;
        tmp=apron[lInput + '3'];if(tmp==null)tmp='';
        if (tmp!=null) retval += tmp;
        tmp=apron[lInput + '4'];if(tmp==null)tmp='';
        if (tmp!=null) retval += tmp;
        tmp=apron[lInput + '5'];if(tmp==null)tmp='';
        if (tmp!=null) retval += tmp;
        tmp=apron[lInput + '0'];if(tmp==null)tmp='';
        if (tmp!=null) retval += tmp;
        }
        
        //alert(retval);
          if (retval!=null){
             ta2.value=fmtSelChars(retval);
             gLastKey2=lLastKey2Tmp;
          }  
        //----------------------------------
          break;
       }//endIf
    }//endfor
  }//endIf

}else if (keycode==27){ //Esc Key <DON'T USE!!
}else {
   dbg1('651>'+gLastKey2);
   if (gLastKey2=='`'){
       insertChar(lchar, '1st');
   }//endIf
}//endif
}//endfunction
/*=========================================================
==========================================================*/
ta1.onkeyup=function(){
     //ta1.value=ta1.value.replace(/\r/g,"");
dbg1('1>');
   var lcaret=getCaret(ta1);
dbg1('2>');
//lcaret=lcaret -     ta1.value.substring(0,lcaret).match(/\n/g).length;
dbg1('3>');
spLinePos.innerHTML=ta1.value.substring(0,lcaret).match(/\n/g).length + 2;
dbg1('4>');
var keycode=window.event.keyCode;
dbg1('5>');
if (keycode==-27){ //Esc Key << DON'T USE
}else {

 dbg("keyup1:"+lcaret +"|" + gCurPos);  
if (gCurPos!=lcaret){
 dbg("keyup2:"+lcaret +"|" + gCurPos);  
 dbg("keyup3:"+lcaret +"|" + gCurPos + "|" + keycode);  
     gCurPos=lcaret;
  setCaretPosition(gCurPos);
  spCurPos.innerHTML=gCurPos;

}//endif
}//endif
}//endfunction

//---------------------------------------------------------------
//ta1.onfocus() - TA1 ONFOCUS EVENT FUNCTION (the main text editing textarea):
ta1.onfocus=function(){
dbg("focus:" + gCurPos);
  gUpdCurPos='true';
}//endfunction

//---------------------------------------------------------------
//ta2.onfocus() - TA2 ONFOCUS EVENT FUNCTION (the char selection textarea):
ta2.onfocus=function(){
//   ta1.focus();
}//endfunction

/*---------------------------------------------------------------
myfunc1() - DESC (notes): */
slFont.onchange=function(){
  setFont(this.value);
}//endFunction

/*---------------------------------------------------------------
setFont(font) - SETS FONT IN TA1 (format name?sizeInPx): */
function setFont(font){
  //slFont.value=font;
  var aval=font.split('_');
  ta1.style.fontFamily=aval[0];
  ta1.style.fontSize=aval[1];
  /*-----------------------
  80 14; 70 16; 60 18; 50 20; 40 22; 30 24;
  keep these statistics->
  var lICols=Math.round(parseInt(aval[1])/-0.17)+170;
  var lICols=Math.round(parseInt(aval[1])/-0.37)+128;
  var lICols=Math.round(parseInt(aval[1])/-0.39)+124;
  ------------------------*/
  var lICols=Math.round(parseInt(aval[1])/-0.39)+124;
  ta1.cols=lICols;
  ta1.rows=Math.round(lICols/5);
  spCols.innerHTML=ta1.cols;
  spRows.innerHTML=ta1.rows;
  setCookie('currFont',font,expiresDt);
}//endFunction

/*---------------------------------------------------------------
btHelp.onclick() - HELP BUTTON CLICK (notes): */
btHelp.onclick=function(){
  window.open('zhtext-info.html');
 //var strHelp='<strong>zhText Help</strong>';
 //strHelp+='<br/>Contents';
 //str.document.write(strHelp);
}//endFunction

/*---------------------------------------------------------------
btNewFile.onclick() - NEW (notes): */
btNewFile.onclick=function(){
//var newFile=prompt('Please enter your filename:');
btSaveFile.click();
slFiles.value='new file';
inf('new file');
ta1.value='';
ta1.focus();
}//endFunction

function printTextArea(objname){
  printWin = window.open("about:blank","_blank","width=760,height=500");
  printWin.document.open("html/text");
  var theObj=objname; //document.frm1[objname];
  var newdoc="<html><body><form><pre>";
  newdoc+=theObj.value+"</pre></form></body></html>";
  printWin.document.write(newdoc);
  printWin.document.close();
  if(window.print) printWin.print();
  else printWin.alert("User the menu or Ctrl+P to print");
}
var isReady=false;
function doPrint(){
  if (document.execCommand){
  if (isReady){document.execCommand("Print");}
  }
}
/*---------------------------------------------------------------
btPrintFile.onclick() - DESC (notes): */
btPrintFile.onclick=function(){
  printTextArea(ta1);
}//endFunction

/*---------------------------------------------------------------
btOpenFile.onclick() - DESC (notes): */
btOpenFile.onclick=function(e){
flFile.click();

//dvInf.style.visibility='hidden';

loadSelectOptions(slFont, 
'MingLiu_14?MingLiu 14|'+
'MingLiu_15?MingLiu 15|'+
'MingLiu_16?MingLiu 16|'+
'MingLiu_18?MingLiu 18|'+
'MingLiu_20?MingLiu 20|'+
'DFKai-SB_16?DFKai-SB 16|'+
'DFKai-SB_18?DFKai-SB 18|'+
'DFKai-SB_20?DFKai-SB 20|'+
'DFKai-SB_22?DFKai-SB 22|'+
'DFKai-SB_24?DFKai-SB 24|'+
'DFKai-SB_26?DFKai-SB 26|'+
'DFKai-SB_26?DFKai-SB 28|'+
'DFKai-SB_30?DFKai-SB 30|'+
'DFKai-SB_30?DFKai-SB 32'
);
flFile.width=1;
flFile.value='Open';
ta1.focus();
}

/*---------------------------------------------------------------
myfunc5() - DESC (notes): */
function myfunc5(){
}//endFunction

/*---------------------------------------------------------------
myfunc5() - DESC (notes): */
function myfunc5(){
}//endFunction

/*---------------------------------------------------------------
myfunc5() - DESC (notes): */
function myfunc5(){
}//endFunction

