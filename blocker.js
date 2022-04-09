//alert('you want to visit forbidden website!')
const key ="websiteslist";

// #region ErrorPageGenerators
const generateStyle = ()=>{
    return``;
}
const generateHTML = (pageName) =>{
    return `
<div class='c'>
    <div>404</div>
    <hr>
    <div>THE PAGE</div>
    <div>WAS NOT FOUND</div>
</div>`;
}
// #endregion

var ourArray =["www.youtube.com"];
var curPage = window.location.hostname;

setLocalStorage(ourArray);
ourArray = getLocalStorage(key);
console.log(ourArray);
if(ourArray[0] == curPage)replaceContent(curPage);


//#region Getter&Setter
function setLocalStorage(ourArray){
    localStorage.setItem(key,JSON.stringify(ourArray));
}
function getLocalStorage(key){
    var storedArray = localStorage.getItem(key);
    ourArray = JSON.parse(storedArray);
    return ourArray;
}
//#endregion

function replaceContent(url){
    document.head.innerHTML = generateStyle();
    document.body.innerHTML = generateHTML(url);
}