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
const clearCartButton = document.querySelector("#clearCartButton");
const header = document.querySelector("nav");
const logInBtn = document.querySelector("#logInButton");
const bodySpinner = document.querySelector("#bodySpinner");
let query = searchField.value;
let searchResultArr = []; 
let cartArr = [];
let catalog = {};
let data = [];
const testObj = {name: 'tv',brand:'sony',description:'large',imageUrl:'https://www.lidl.cz/assets/gcpe355e6bee3e244afab6d2b4d4933e5d6.jpeg',price:100};

//const  loadDefaultProducts = async () => {
//    try{        
//        const response = 
//        await fetch("https://striveschool-api.herokuapp.com/api/product/", {
//            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE0MzgwMjAsImV4cCI6MTY2MjY0NzYyMH0.FxXNN1ADQHPQJbchifn_vi_cp1sdPcdONESnfaMV4DE"}});
//            data = await response.json();
//            console.log("data:",data);
//            return data;
//        }
//        catch(err){console.log(err)};
//        
//        
//    }
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
//    const searchCatalog = () => {
//        searchResultArr = [];
//        console.log(query);
//        modal.querySelector("div.modal-header").innerText  = `Search: "${query}"`;
//        //modal.querySelector(".modal-body img").setAttribute("src", catalog[0].img) ;
//        for(let i=0; i<catalog.length; i++){
//            //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
//            if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
//                searchResultArr.push(catalog[i]);
//                
//            }
//        }
//        console.log(searchResultArr);
//        makeCards(modalBody, searchResultArr);    
//        
//    }
    const loadData = async ()=>{
        
        let dataArr = [];
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "GET",
            headers: {'Content-Type': 'application/json',"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}})
            .then(res => {console.log("Request complete! response:", res);
                dataArr=res.json();
                console.log(dataArr)
                return dataArr}).then(data  => makeCards(cardContainerRow,data))
            .catch(err => console.log('post failed:', err));
          

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
        if(sessionStorage.cart.length>0){cartArr = sessionStorage.cart.split(",");}
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
        const addedProduct = e.target.closest(".card").querySelector(".productName").innerText + "-" +e.target.closest(".card").querySelector(".productPrice").innerText;
        cartArr.push(addedProduct);
        sessionStorage.setItem('cart',cartArr);
        e.target.closest(".card").classList.add("selcted4Cart");
        setTimeout(() => {e.target.closest(".card").classList.remove("selcted4Cart")}, 300);
        
    
        
    }
    const clearCart = () =>{
        //resetBoard();
        cartArr=[];
        sessionStorage.clear();
       
        modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items.`;
    
        for(card of modalBody.querySelectorAll("*")){
            card.remove();
        }
    }
    const detailPage = (e)=>{
        const selectedCard = e.target.closest("div.col-md-4");
        //savedata of card for detail page
        document.location.href = "details.html";

    }
    
    const makeCards = (where, array1) => {
        bodySpinner.classList.add("d-none");
        for(let i=0;i<array1.length;i++){
            const obj = array1[i];
            const newCard = document.createElement("div");
            newCard.innerHTML = `<div class="col-md-4">
            <div class="card mb-4 shadow-sm" style="width: 220px;">
            <img class="card-img-top"
            src="${obj.imageUrl}">
            <div class="card-body">
            <p class="card-text">
            <span class="productName">${obj.name}</span> - <span class="productBrand">${obj.brand}</span><br>
            <span class="productDescription">${obj.description}</span>
            </p>
            <div
            class="d-flex justify-content-between align-items-center"
            >
            <div class="btn-group">
            <a
            type="button" href= "details.html?name=${obj.name}&brand=${obj.brand}&description=${obj.description}&price=${obj.price}&imageUrl=${obj.imageUrl}"
            class="btn btn-sm btn-outline-secondary detailBtn"
            >
            Details
            </a>
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary addCart"
            >
            +🛒
            </button>
            </div>
            <small class="text-muted"> <span class="productPrice">$${obj.price}</span></small>
            </div>
            </div>
            </div>
            </div>`;
            where.append(newCard);
        };
        const cartBtns = document.querySelectorAll(".addCart");
        const detailBtns = document.querySelectorAll(".detailBtn");
        cartBtns.forEach(btn => btn.addEventListener("click", addToCart));
        detailBtns.forEach(btn => btn.addEventListener("click", detailPage));
    }
    const enroll = () => {
        if(userInput.value === "admin" && inputPassword.value === "password"){
            document.location.href = "back-office.html";
        }else{
            createAlert("Invalid Login or Password","danger");
            userInput.classList.add("is-invalid");
            inputPassword.classList.add("is-invalid");
        }
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
const clearInputFields = () => {
    userInput.classList.remove("is-invalid");
            inputPassword.classList.remove("is-invalid");
}

window.onload = () => {
    loadData();
    
    
    searchButton.addEventListener("click", resetBoard);
    viewCartButton.addEventListener("click", showCart);

    clearCartButton.addEventListener("click", clearCart);
    enrollBtn.addEventListener("click", enroll);
    logInBtn.addEventListener("click", clearInputFields);

    
    
};











