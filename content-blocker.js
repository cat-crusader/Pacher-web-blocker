
const key ="websiteslist";
let blockedPagesArray;
let CurrentPageUrl;

let addUrlButton    = document.getElementById("add");
let removeUrlButton = document.getElementById("remove");
let UrlInput =        document.getElementById("input");// if getElementById will always return null, wtf


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





ShowLocalStorage();

GetCurrentPageUrl();
CheckIfPageBanned();




document.addEventListener('DOMContentLoaded', documentEvents  , false);
function documentEvents() {    

 //#region ButtonListeners
if(addUrlButton){//          add button
    addUrlButton.addEventListener('click', async evt => {
        evt.preventDefault(); // prevents `submit` event from reloading the popup
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        const text = document.getElementById('input').value;// value from input
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
    console.log("test");
    AddToLocalStorage(Url);
    ShowLocalStorage();
    // let lol =["lol1","lol"];
    // removeElementFromArray(lol,"lol");



}
function RemoveUrlButtonClicked(Url){
    console.log("remove button clicked");
    DeleteFromLocalStorage(Url);
    ShowLocalStorage();

}
function removeElementFromArray(array,element){
    const index = array.indexOf(element);
    console.log(array);
    console.log("index of "+element+index);
    if (index > -1) {
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(array);
    return array;
}
//#region LocalStorage Methods
function AddToLocalStorage(url){

    blockedPagesArray = [...GetLocalStorage()];
    console.log("array:"+ blockedPagesArray);
    blockedPagesArray.push(url);
    SetLocalStorage(blockedPagesArray);
}
function DeleteFromLocalStorage(url){
    blockedPagesArray = [...GetLocalStorage()];
    blockedPagesArray = [...removeElementFromArray(blockedPagesArray,url)];
    SetLocalStorage(blockedPagesArray);
}


function SetLocalStorage(ourArray){
    localStorage.setItem(key,JSON.stringify(ourArray));
}
function GetLocalStorage(){
    var emptyArray =[""];
    if(localStorage.getItem(key)===null)return emptyArray;
    var storedArray = localStorage.getItem(key);
    var ourArray = JSON.parse(storedArray);
    return ourArray;


}
function ShowLocalStorage(){
    blockedPagesArray = [...GetLocalStorage()];
    console.log("array:"+ blockedPagesArray);
}
//#endregion
function CheckIfPageBanned(){
    blockedPagesArray = [...GetLocalStorage()];
    const index = blockedPagesArray.indexOf(CurrentPageUrl);
    console.log(CurrentPageUrl+index);
    if(index>-1)ReplaceContent();
}
function GetCurrentPageUrl(){
    CurrentPageUrl = window.location.toString();
}
