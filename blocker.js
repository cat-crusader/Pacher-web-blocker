//alert('you want to visit forbidden website!')


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

var ourArray =["www.google.com"];
var curPage = window.location.hostname;
console.log(curPage);
saveToLocalStorage(ourArray);
ourArray = retrieveFromLocalStorage();
if(ourArray[0] == curPage)replaceContent(curPage);

function saveToLocalStorage(ourArray){
    localStorage.setItem("websiteslist",JSON.stringify(ourArray));
}
function retrieveFromLocalStorage(){
    var storedArray = localStorage.getItem("websiteslist");
    ourArray = JSON.parse(storedArray);
    return ourArray;
}


function replaceContent(url){
    document.head.innerHTML = generateStyle();
    document.body.innerHTML = generateHTML(url);
}