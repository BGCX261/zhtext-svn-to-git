/*! zhText Text Editor $Revision$
Homepage: ./zhtext-info.html
Copyright (C) 2011 Ian Low
Released under the MIT license.
URL: ./zhtext-license.html
Date: $Date$
File: $HeadURL$ */
//---------------------------------------------------------------
//FILE: zhmain.js
//DESC: global main for zhtext
/*---------------------------------------------------------------
GLOBALS - GLOBAL VARIABLES DECLARATIONS (notes): */
var gCurPos=0;
var gDbgCount=0;
var gLastKey1='';
var gLastKey2='';
var gLastKey3='';
var gUpdCurPos='false';
var gCountKeysDown=100;

var slFiles=document.getElementById('slFiles');
var slFont=document.getElementById('slFont');
var taDbg=document.getElementById('taDbg');
var bd1=document.getElementById('bd1');
var ta1=document.getElementById('ta1');
var dvInf=document.getElementById('dvInf');
var ta2=document.getElementById('ta2');
var spInf=document.getElementById('spInf');
var spChar=document.getElementById('spChar');
var spStartPos=document.getElementById('spStartPos');
var spEndPos=document.getElementById('spEndPos');
var spCols=document.getElementById('spCols');
var spRows=document.getElementById('spRows');
var spKeysPress=document.getElementById('spKeysPress');
var spCurPos=document.getElementById('spCurPos');
var spLinePos=document.getElementById('spLinePos');
var flFile=document.getElementById('flFile');
var btSaveFile=document.getElementById('btSaveFile');
var btPrintFile=document.getElementById('btPrintFile');
var btOpenFile=document.getElementById('btOpenFile');
var btNewFile=document.getElementById('btNewFile');
var btHelp=document.getElementById('btHelp');
var btChinese=document.getElementById('btChinese');
var btDownload=document.getElementById('btDownload');
var btDonate=document.getElementById('btDonate');
var retval;
var gchars="";

var expiresDt = new Date();
var num_visits;
/*---------------------------------------------------------------
main() - GLOBAL MAIN (notes): */
expiresDt.setTime(expiresDt.getTime() + (5*24*60*60*1000));
if (!(num_visits = getCookie("num_visits")))
  num_visits = 0;
num_visits++;
setCookie("num_visits",num_visits,expiresDt);
//alert("num_visits:"+num_visits);
//----------------------------------
var aprevFiles=getCookie('prevFiles').split('|');
if (aprevFiles.length > 10){
aprevFiles.length=10;
}


btSaveFile.style.border='solid';
btSaveFile.style.borderWidth='1px';
btSaveFile.style.backgroundColor='#ddeeff';
btPrintFile.style.border='solid';
btPrintFile.style.borderWidth='1px';
btPrintFile.style.backgroundColor='#ddeeff';
btNewFile.style.border='solid';
btNewFile.style.borderWidth='1px';
btNewFile.style.backgroundColor='#ddeeff';
btOpenFile.style.border='solid';
btOpenFile.style.borderWidth='1px';
btOpenFile.style.backgroundColor='#ddeeff';
btHelp.style.border='solid';
btHelp.style.borderWidth='1px';
btHelp.style.backgroundColor='#ddeeff';
btChinese.style.border='solid';
btChinese.style.borderWidth='1px';
btChinese.style.backgroundColor='#ddeeff';
btDownload.style.fontWeight='bold';
btDownload.style.width='140px';
btDownload.style.border='solid';
btDownload.style.borderWidth='1px';
btDownload.style.borderColor='#11ddbb';
btDownload.style.backgroundColor='#11ddbb';
btDownload.style.color='#ffffff';
btDonate.style.fontWeight='bold';
btDonate.style.border='solid';
btDonate.style.borderWidth='1px';
btDonate.style.borderColor='#ff88bb';
btDonate.style.backgroundColor='#ff88bb';
btDonate.style.color='#ffffff';
flFile.style.border='solid';
flFile.style.borderWidth='1px';
flFile.style.backgroundColor='#ddeeff';
flFile.style.fontFamily='MingLiu';
flFile.style.faceColor='#ccddff';


spCopyRight.style.fontSize='9';
spCopyRight.style.fontFamily='arial';


dbg("here1");
dbg("here2");
bd1.style.fontFamily='MingLiu';
bd1.style.fontSize='15px';
taDbg.rows=17;
taDbg.cols=20;
taDbg.style.fontSize='9px';
ta2.rows=10;
ta2.cols=80;
ta2.style.border='none';
btSaveFile.style.fontFamily='Arial';
btOpenFile.style.fontFamily='Arial';
btHelp.style.fontFamily='Arial';
btSaveFile.style.fontSize='11px';
btOpenFile.style.fontSize='11px';
btHelp.style.fontSize='11px';
ta2.style.fontFamily='MingLiu';

var gCurrFont=getCookie('currFont');
if (gCurrFont != null){
  setFont(gCurrFont);
}else {
ta1.rows=16;
ta1.cols=80;
ta1.style.fontFamily='MingLiu';
ta1.style.fontSize='15px';
}

spInf.style.fontFamily='MingLiu';
spInf.style.fontSize='15px';

dvInf.style.fontSize='11px';
ta2.style.fontSize='15px';
slFiles.style.fontSize='11px';
slFiles.style.fontFamily='Arial';
slFont.style.fontSize='11px';
slFont.style.fontFamily='Arial';
btNewFile.style.fontFamily='Arial';
btPrintFile.style.fontFamily='Arial';
btNewFile.style.fontSize='11px';
btPrintFile.style.fontSize='11px';


flFile.style.fontFamily='MingLiu';
flFile.style.opacity=0;

taDbg.style.fontFamily='MingLiu';
inf('New File');


loadSelectFromCookie(slFiles, 'prevFiles');
loadFile(slFiles[0].text);

dvInf.style.visibility='hidden';
