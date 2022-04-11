
const key ="websiteslist";
var blockedPagesArray;
var curPage = window.location.hostname;
let addUrlButton    = document.getElementById("add");
let removeUrlButton = document.getElementById("remove");
let UrlInput = document.getElementById("url");

console.log("console started");
ShowLocalStorage();

//#region ButtonListeners
if(addUrlButton){//          add button
addUrlButton.addEventListener("click",async()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: AddUrlButtonClicked,
    });
});
}
if(removeUrlButton){//      remove button
    removeUrlButton.addEventListener("click",async()=>{
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: RemoveUrlButtonClicked,
        });
    });
}
//#endregion
function AddUrlButtonClicked(){
    
}
function RemoveUrlButtonClicked(){
    
}

function removeElementFromArray(element){
    return blockedPagesArray.filter(function(value){
        return value != element;
    });
}
//#region LocalStorage Methods
function AddToLocalStorage(url){
    blockedPagesArray = GetLocalStorage(key);
    blockedPagesArray.push(url);
    SetLocalStorage(blockedPagesArray);
}
function DeleteFromLocalStorage(url){
    blockedPagesArray = GetLocalStorage(key);
    blockedPagesArray = removeElementFromArray(url);
    SetLocalStorage(blockedPagesArray);
}
function SetLocalStorage(ourArray){
    localStorage.setItem(key,JSON.stringify(ourArray));
}
function GetLocalStorage(){
    var storedArray = localStorage.getItem(key);
    ourArray = JSON.parse(storedArray);
    return ourArray;
}
function ShowLocalStorage(){
    blockedPagesArray = GetLocalStorage();
    console.log(blockedPagesArray);
}
//#endregion
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
function ReplaceContent(url){
    document.head.innerHTML = generateStyle();
    document.body.innerHTML = generateHTML(url);
}
