const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const userInput = document.querySelector("#userInput");
const inputPassword = document.querySelector("#inputPassword");
const enrollBtn = document.querySelector("#enrollBtn");
const cardZone = document.querySelector("div.album.py-5.bg-light");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal div.modal-body .row");
const cardContainerRow = cardZone.querySelector("div.row");
const viewCartButton = document.querySelector("#viewCartButton");
const addItemButton = document.querySelector("#addItemButton");
const header = document.querySelector("nav");
const logInBtn = document.querySelector("#logInButton");
let searchResultArr = []; 
let cartArr = [];
let catalog = {};
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
    const searchCatalog = () => {
        searchResultArr = [];
        console.log(query);
        modal.querySelector("div.modal-header").innerText  = `Search: "${query}"`;
        //modal.querySelector(".modal-body img").setAttribute("src", catalog[0].img) ;
        for(let i=0; i<catalog.length; i++){
            //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
            if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
                searchResultArr.push(catalog[i]);
                
            }
        }
        console.log(searchResultArr);
        makeCards(modalBody, searchResultArr);    
        
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
    const showCart = () => {
        if(cartArr.length === 1){
            modal.querySelector("div.modal-header").innerText  = `Your Cart has 1 item.`;
        }else{    
            modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items.`;
        }   
    
        
        for(card of modalBody.querySelectorAll("*")){
            card.remove();
        }
        cartArr.forEach(element => {
            const newP = document.createElement('p') 
            newP.innerText = element;
            modalBody.append(newP);
        })   
    }
    
    const addToCart = (e) => {    
        const addedProduct = catalog.filter(element => element.title === e.target.closest(".card").querySelector(".card-text").innerText);
        cartArr.push(addedProduct[0].title);
        e.target.closest(".card").classList.add("selcted4Cart");
    
        
    }
    const clearCart = () =>{
        resetBoard();
        cartArr=[];
       
        modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items.`;
    
        for(card of modalBody.querySelectorAll("*")){
            card.remove();
        }
    }
    const skip = (e) => {
        e.target.closest("div.col-md-4").remove();
    }
    
    const makeCards = (where, array1) => {
        array1.forEach(element => {
            
            const newCard = document.createElement("div");
            newCard.innerHTML = `<div class="col-md-4">
            <div class="card mb-4 shadow-sm" style="width: 220px;">
            <img class="card-img-top"
            src="${element.img}">
            <div class="card-body">
            <p class="card-text">
            ${element.title}
            </p>
            <div
            class="d-flex justify-content-between align-items-center"
            >
            <div class="btn-group">
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary skipBtn"
            >
            Skip
            </button>
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary addCart"
            >
            Add to Cart
            </button>
            </div>
           
            </div>
            </div>
            </div>
            </div>`
            where.append(newCard);
        });
        const cartBtns = document.querySelectorAll(".addCart");
        const skipBtns = document.querySelectorAll(".skipBtn");
        cartBtns.forEach(btn => btn.addEventListener("click", addToCart));
        skipBtns.forEach(btn => btn.addEventListener("click", skip));
    }
    const enroll = () => {
        if(userInput.value === "admin" && inputPassword.value === "password"){
            document.location.href = "back-office.html";
        }else{
            createAlert("Invalid Login or Password");
            userInput.classList.add("is-invalid");
            inputPassword.classList.add("is-invalid");
        }
}
const createAlert = (string) => {
    const alertContainer = document.createElement("div");
    alertContainer.setAttribute("class", "container d-flex justify-content-center");
    const alertBody = document.createElement("div");
    alertBody.setAttribute("class", "alert alert-danger alertBar");
    alertBody.setAttribute("role", "alert");
    header.after(alertContainer);
    alertContainer.append(alertBody);
    alertBody.innerText = `${string}`;
    setTimeout(function () {alertContainer.remove()}, 5000)

}
const clearInputFields = () => {
    userInput.classList.remove("is-invalid");
            inputPassword.classList.remove("is-invalid");
}

window.onload = () => {
    
    loadDefaultProducts();    
    searchField.addEventListener("keydown", changeDisplayed)
    searchButton.addEventListener("click", resetBoard);
    viewCartButton.addEventListener("click", showCart);
    clearCartButton.addEventListener("click", clearCart);
    enrollBtn.addEventListener("click", enroll);
    logInBtn.addEventListener("click", clearInputFields);

    
    
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










