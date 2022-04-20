
const key ="websiteslist";
var blockedPagesArray = new Array();
let addUrlButton    = document.getElementById("add");
let removeUrlButton = document.getElementById("remove");
let UrlInput =        document.getElementById("input");// if getElementById will always return null, wtf



ShowLocalStorage();







// const timer = setInterval(() => {
//     const UrlInput = document.getElementById('input');
//     if(UrlInput) {
//       clearTimeout(timer);
//       alert(UrlInput.value);
//     }
//   }, 150);

ShowLocalStorage();



document.addEventListener('DOMContentLoaded', documentEvents  , false);
function documentEvents() {    

 //#region ButtonListeners
if(addUrlButton){//          add button
    addUrlButton.addEventListener('click', async evt => {
        evt.preventDefault(); // prevents `submit` event from reloading the popup
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        const text = document.getElementById('input').value;
        await chrome.scripting.executeScript({
          target: {tabId: tab.id},
          func: (text) => {
            AddUrlButtonClicked(text);
          },
          args: [ text],
        });
      });
    }
    if(removeUrlButton){//      remove button
        removeUrlButton.addEventListener('click', async evt => {
            evt.preventDefault(); // prevents `submit` event from reloading the popup
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            const text = document.getElementById('input').value;
            await chrome.scripting.executeScript({
              target: {tabId: tab.id},
              func: (text) => {
                RemoveUrlButtonClicked(text);
              },
              args: [ text],
            });
          });
    }
}




//#endregion
function AddUrlButtonClicked(Url){//currently use url of page
    console.log("add button clicked");
    AddToLocalStorage(Url);
    ShowLocalStorage();


}
function RemoveUrlButtonClicked(){

    DeleteFromLocalStorage(curUrl);
    ShowLocalStorage();

}
function GetCurrentUrl(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        curUrl = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
    });    
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
    if(blockedPagesArray)blockedPagesArray = removeElementFromArray(url);
    SetLocalStorage(blockedPagesArray);
}
function SetLocalStorage(ourArray){
    localStorage.setItem(key,JSON.stringify(ourArray));
}
function GetLocalStorage(){
    var storedArray = localStorage.getItem(key);
    ourArray = JSON.parse(storedArray);
    if(ourArray!==null)return ourArray;
    return new Array("");
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
