const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
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

let searchResultArr = []; 
let cartArr = [];
if(sessionStorage.cart){let cartArr = sessionStorage.cart.split(",");}
let catalog = {};
let data = [];

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
    const clearCart = () =>{        
        cartArr=[];
        sessionStorage.clear();       
        modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items.`;
        for(card of modalBody.querySelectorAll("*")){
            card.remove();
        }
    }    
    
    const makeCards = () => {  
            const newCard = document.createElement("div");
            newCard.innerHTML = `<div class="card mb-4 shadow-sm" style="width: 80vw;">
            <img class="card-img-top"
            src="${urlParams.get('imageUrl')}">
            <div class="card-body">
            <p class="card-text"> 
            <span class="productName"> ${urlParams.get('name')}</span> - <span class="productBrand">${urlParams.get('brand')}</span><br>
            <span class="productDescription">${urlParams.get('description')}</span>
            </p>
            <div
            class="d-flex justify-content-between align-items-center"
            >
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary addCart"
            >
            +🛒
            </button>
            <small class="text-muted"><span class="productPrice">${'$'+ urlParams.get('price')}</span></small>
            </div>
            </div>
            </div>
            </div>`
            cardContainerRow.append(newCard);
            
       
        
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
const addToCart = (e) => {
    const addedProduct = e.target.closest(".card").querySelector(".productName").innerText + "-" +e.target.closest(".card").querySelector(".productPrice").innerText;
    cartArr.push(addedProduct);
    sessionStorage.setItem('cart',cartArr);
    e.target.closest(".card").classList.add("selcted4Cart");
    setTimeout(() => {e.target.closest(".card").classList.remove("selcted4Cart")}, 300);
    

    
}
window.onload = () => {
    makeCards();
    viewCartButton.addEventListener("click", showCart);
    clearCartButton.addEventListener("click", clearCart);
    enrollBtn.addEventListener("click", enroll);
    logInBtn.addEventListener("click", clearInputFields);
    const cartBtn = document.querySelector(".addCart");
    cartBtn.addEventListener("click", addToCart); 
};








