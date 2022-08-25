
const cardZone = document.querySelector("div.album.py-5.bg-light");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal div.modal-body .row");
const cardContainerRow = cardZone.querySelector("div.row");
const viewCartButton = document.querySelector("#viewCartButton");
const addItemBtn = document.querySelector("#addItemButton");
const header = document.querySelector("nav");
const logInBtn = document.querySelector("#logInButton");
const subAllBtn = document.querySelector("#submitButton");
const inputName = document.querySelector('#inputName');
const inputDescription = document.querySelector('#inputDescription');
const inputBrand = document.querySelector('#inputBrand');
const inputImg = document.querySelector('#inputImg');
const inputPrice = document.querySelector('#inputPrice'); 
let searchResultArr = []; 
let productsArr = [];
let newItem = {};
let data = [];



    const  loadDefaultProducts = async () => {
    try{        
        const response = 
        await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE0MzgwMjAsImV4cCI6MTY2MjY0NzYyMH0.FxXNN1ADQHPQJbchifn_vi_cp1sdPcdONESnfaMV4DE"}});
            data = await response.json();
            console.log("data:",data);
            return data;
        }
        catch(err){console.log(err)};
        
        
    }
    const submitProduct = (e) =>{

        
            e.target.closest("div.col-md-4").remove();
            createAlert("Submitted Item", "success");
        
    }
    const submitAll = ()=>{
        const activeCards = document.querySelectorAll("div.col-md-4");
        activeCards.forEach(element => {element.remove()});
        createAlert(`Submitted ${activeCards.length} Items`, "success" );        
    } 
    
    
    const changeDisplayed = () => {
        searchResultArr = [];
        query = searchField.value;
        if(query.length >=3){
            for(card of document.querySelectorAll(".col-md-4")){
                card.remove();
            };
            
            for(let i=0; i<catalog.length; i++){
                //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
                if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
                    searchResultArr.push(catalog[i]);
                    
                }
            }
            console.log(searchResultArr);
            makeCards(cardContainerRow, searchResultArr);
        }
    }
    const resetBoard = () => {
        searchField.value = "";
        for(card of document.querySelectorAll(".col-md-4")){
            card.remove();
        };
        makeCards(cardContainerRow, catalog);
    }
   
    const skip = (e) => {
        e.target.closest("div.col-md-4").remove();
        createAlert("Deleted Item", "danger");
    }
    
    const addItem = () => {
        newItem.name=inputName.value
        newItem.description=inputDescription.value
        newItem.brand=inputBrand.value
        newItem.imageUrl=inputImg.value
        newItem.price=inputPrice.value

        makeCards(cardContainerRow, newItem);
    }

    const makeCards = (where, obj) => {     
            
            const newCard = document.createElement("div");
            newCard.innerHTML = `<div class="col-md-4">
            <div class="card mb-4 shadow-sm" style="width: 220px;">
            <img class="card-img-top"
            src="${obj.imageUrl}">
            <div class="card-body">
            <p class="card-text">
            ${obj.name} - ${obj.brand}<br>
            ${obj.description}
            </p>
            <div
            class="d-flex justify-content-between align-items-center"
            >
            <div class="btn-group">
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary skipBtn"
            >
            Delete
            </button>
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary submitProduct"
            >
            Submit
            </button>
            </div>
            <small class="text-muted">${'$'+obj.price}</small>
            </div>
            </div>
            </div>
            </div>`
            where.append(newCard);
            createAlert(`Added ${obj.brand} ${obj.name}`,"success");
        
        const subBtn = newCard.querySelector(".submitProduct");
        const skipBtn = newCard.querySelector(".skipBtn");
        subBtn.addEventListener("click", submitProduct);
        skipBtn.addEventListener("click", skip);
    }
    

const createAlert = (string,color) => {
    const previousAlerts = document.querySelectorAll(".alertBar");
    for(bar of previousAlerts){bar.remove()};
    const alertContainer = document.createElement("div");
    alertContainer.setAttribute("class", "container d-flex justify-content-center");
    const alertBody = document.createElement("div");
    alertBody.setAttribute("class", `alert alert-${color} alertBar`);
    alertBody.setAttribute("role", "alert");
    header.after(alertContainer);
    alertContainer.append(alertBody);
    alertBody.innerText = `${string}`;
    setTimeout(function () {alertContainer.remove()}, 5000)

}


window.onload = () => {  
    addItemBtn.addEventListener("click", addItem);   
    subAllBtn.addEventListener("click", submitAll);   
};

//product model full
//{
//    "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//    "name": "app test 1",  //REQUIRED
//    "description": "somthing longer", //REQUIRED
//    "brand": "nokia", //REQUIRED
//    "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
//    "price": 100, //REQUIRED
//    "userId": "admin", //SERVER GENERATED
//    "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//    "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//    "__v": 0 //SERVER GENERATED
//  }
//product model user
//{    
//    "name": "app test 1",  //REQUIRED
//    "description": "somthing longer", //REQUIRED
//    "brand": "nokia", //REQUIRED
//    "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
//    "price": 100, //REQUIRED
//  }
// to get new key:
// POST https://striveschool-api.herokuapp.com/api/account/login 
//{ "username": "testusername@yourmail.com", "password":"pass" }



//const  loadDefaultProducts = async () => {
    //    try{
    //        const response = await fetch("https://striveschool-api.herokuapp.com/books");
    //        catalog = await response.json();
    //        makeCards(cardContainerRow, catalog);
    //        return catalog;
    //    }
    //    catch(err){console.log(err)};
    //    console.log(catalog);
    //};
    //const searchCatalog = () => {
    //    searchResultArr = [];
    //    console.log(query);
    //    modal.querySelector("div.modal-header").innerText  = `Search: "${query}"`;
    //    //modal.querySelector(".modal-body img").setAttribute("src", catalog[0].img) ;
    //    for(let i=0; i<catalog.length; i++){
    //        //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
    //        if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
    //            searchResultArr.push(catalog[i]);
    //            
    //        }
    //    }
    //    console.log(searchResultArr);
    //    makeCards(modalBody, searchResultArr);    
    //    
    //}
    //const showCart = () => {
    //    if(cartArr.length === 1){
    //        modal.querySelector("div.modal-header").innerText  = `Your Cart has 1 item.`;
    //    }else{    
    //        modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items.`;
    //    }   
    //
    //    
    //    for(card of modalBody.querySelectorAll("*")){
    //        card.remove();
    //    }
    //    cartArr.forEach(element => {
    //        const newP = document.createElement('p') 
    //        newP.innerText = element;
    //        modalBody.append(newP);
    //    })   
    //}






