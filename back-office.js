
const cardZone = document.querySelector("div.album.py-5.bg-light");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal div.modal-body .row");
const cardContainerRow = cardZone.querySelector("div.row");
const viewCartButton = document.querySelector("#viewCartButton");
const addItemBtn = document.querySelector("#addItemButton");
const editItemBtn = document.querySelector("#editItemButton");
const deleteItemBtn = document.querySelector("#deleteItemButton");
const header = document.querySelector("nav");
const logInBtn = document.querySelector("#logInButton");
const subAllBtn = document.querySelector("#submitButton");
const inputId = document.querySelector('#inputId');
const inputName = document.querySelector('#inputName');
const inputDescription = document.querySelector('#inputDescription');
const inputBrand = document.querySelector('#inputBrand');
const inputImg = document.querySelector('#inputImg');
const inputPrice = document.querySelector('#inputPrice');
const modifyInventoryBtn =  document.querySelector('#modifyInventoryButton');
const enterANewProductBtn =  document.querySelector('#enterANewProductButton');
const editAProductBtn =  document.querySelector('#editAProductButton');
const deleteAProductBtn =  document.querySelector('#deleteAProductButton');
const inventory = document.querySelector('.inventory');
let selectedId = "";
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

    const fieldsFilled = () => {
        if(      
            inputName.value !== "" &&      
            inputDescription.value !== "" &&
            inputBrand.value !== "" &&     
            inputImg.value  !== "" &&      
            inputPrice.value !== ""   
        ){return true}
    }
    
    const invalidateFields = () =>{
        for(field of document.querySelectorAll("input")){field.classList.add("is-invalid");};
    }
    const validateFields = () =>{
        for(field of document.querySelectorAll("input")){field.classList.remove("is-invalid");};
    }

    const submitProduct = async (input) =>{       
        let card = null;
        console.log("submit input", input);        
        if(input.target){card = input.target.closest(".col-md-4");}
        else{card = input;}        ;  
        const postObj = {name:`${card.querySelector("span.productName").innerText}`,brand:`${card.querySelector("span.productBrand").innerText}`,description:`${card.querySelector("span.productDescription").innerText}`,imageUrl:`${card.querySelector(".card-img-top").getAttribute("src")}`,price:`${card.querySelector("span.productPrice").innerText}`};
        fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            method: "POST",
            headers: {'Content-Type': 'application/json',"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}, 
            body: JSON.stringify(postObj)
          }).then(res => {
            if(!res.ok){createAlert(`Item Not Submitted`, "danger")}else{createAlert("Submitted Item", "success");};
            console.log("Request complete! response:", res);
          }).catch(err => createAlert(`Item Not Uploaded - ${err}`, "danger"));
            card.remove();
            
        
    }
    const editProduct = async (input) =>{
        if(fieldsFilled()){
            validateFields();
        if(idMatchCheck()){

        inputId.classList.remove("is-invalid");
        const postObj = {name:`${inputName.value}`,brand:`${inputBrand.value}`,description:`${inputDescription.value}`,imageUrl:`${inputImg.value}`,price:`${inputPrice.value}`};
        fetch(`https://striveschool-api.herokuapp.com/api/product/${inputId.value}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json',"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}, 
            body: JSON.stringify(postObj)
          }).then(res => {            
            console.log("Request complete! response:", res);
            if(!res.ok){createAlert(`Item Not Edited`, "danger")}else{createAlert("Edited Item", "success");};
        }).catch(err => createAlert(`Item Not Edited - ${err}`, "danger"));
        $('#modal').modal('hide');
    }else{inputId.classList.add("is-invalid");
        createAlert(`Not a Valid ID`, "danger")
    }  
    }else{createAlert(`All Fields Required`, "danger");
    invalidateFields();
};    
    }
    const deleteProduct = async (input) =>{               
        if(idMatchCheck()){
            inputId.classList.remove("is-invalid");
        fetch(`https://striveschool-api.herokuapp.com/api/product/${inputId.value}`, {
            method: "DELETE",
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}
          }).then(res => {            
            console.log("Request complete! response:", res);
            if(!res.ok){createAlert(`Item Not Deleted`, "danger")}else{createAlert("Deleted Item", "success");};
        }).catch(err => createAlert(`Item Not Deleted - ${err}`, "danger"));           
        $('#modal').modal('hide');
    }else{inputId.classList.add("is-invalid");
        createAlert(`Not a Valid ID`, "danger")
    }  
    }
    const submitAll = ()=>{
        const activeCards = document.querySelectorAll("div.col-md-4");
        for(element of activeCards){
            console.log("submission loop element",element);
            submitProduct(element);
            element.remove();
        }
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
        createAlert("Deleted Item", "success");
    }
    
    const addItem = () => {
        if(fieldsFilled()){
            validateFields()
        newItem.name=inputName.value
        newItem.description=inputDescription.value
        newItem.brand=inputBrand.value
        newItem.imageUrl=inputImg.value
        newItem.price=inputPrice.value      
        makeCards(cardContainerRow, newItem); 
        $('#modal').modal('hide');
        }else{
            invalidateFields();
            createAlert("All Fields Required", "danger");
        }; 
    }

    const idMatchCheck = () => {
        for(item of document.querySelectorAll(".inventoryId")){if(item.innerText === inputId.value){
            return true;
        }}
    }

    const addOrEdit = ()=>{
        validateFields();
        eraseInventory();
        for(element of modalBody.querySelectorAll("input")){element.classList.add("d-none")};
        modalBody.querySelector(".input-group").classList.add("d-none");
        addItemBtn.classList.add("d-none");
        editItemBtn.classList.add("d-none");
        deleteItemBtn.classList.add("d-none");
        enterANewProductBtn.classList.remove("d-none");
        editAProductBtn.classList.remove("d-none");
        deleteAProductBtn.classList.remove("d-none");
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "GET",
            headers: {'Content-Type': 'application/json',"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE0MzgwMjAsImV4cCI6MTY2MjY0NzYyMH0.FxXNN1ADQHPQJbchifn_vi_cp1sdPcdONESnfaMV4DE"}})
            .then(res => data=res.json()).then(data => showInventory(data))
            .catch(err => console.log('post failed:', err));

    }
    const showInventory = (data)=>{
        for(element of data){
            const newLine = document.createElement("p");
            newLine.innerHTML =`<span class="inventoryName">${element.name}</span> - ID: <span class="inventoryId">${element._id} </span>`;
            inventory.append(newLine);
            newLine.addEventListener("click", copyId);
            newLine.classList.add("inventoryItem");            
        } 
    }
    const copyId = (e)=>{
        const selected = e.target.closest(".inventoryItem");
        const idValue = selected.querySelector(".inventoryId").innerText;
        inputId.value = idValue;
        for(item of document.querySelectorAll(".inventoryItem")){item.classList.remove("selectedItem")}
        selected.classList.add("selectedItem");
        fetch(`https://striveschool-api.herokuapp.com/api/product/${idValue}`, {
            method: "GET",
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}})
            .then(res => {console.log("Request complete! response:", res);
                dataArr=res.json();
                console.log(dataArr)
                return dataArr}).then(data  => {
                    inputId.value = idValue;      
                    inputName.value = data.name;      
                    inputDescription.value = data.description;
                    inputBrand.value = data.brand;     
                    inputImg.value = data.imageUrl;      
                    inputPrice.value = data.price;  
                })
            .catch(err => console.log('post failed:', err));

    }
    const eraseInventory = ()=>{
        for(garbage of inventory.querySelectorAll("*")){
            garbage.remove();
        }
    }
    const inventoryActionChoice = (e) =>{
        inputId.value = "";      
        inputName.value = "";      
        inputDescription.value = "";
        inputBrand.value = "";     
        inputImg.value = "";      
        inputPrice.value = "";  
        enterANewProductBtn.classList.add("d-none");
        editAProductBtn.classList.add("d-none");
        deleteAProductBtn.classList.add("d-none");
        switch(e.target.innerText){
            case "Enter A New Product": 
                addItemBtn.classList.remove("d-none");
                //inputId.classList.remove("d-none");      
                inputName.classList.remove("d-none");      
                inputDescription.classList.remove("d-none");
                inputBrand.classList.remove("d-none");     
                inputImg.classList.remove("d-none");      
                inputPrice.classList.remove("d-none");
                modalBody.querySelector(".input-group").classList.remove("d-none");
                for(item of document.querySelectorAll(".inventoryItem")){item.classList.remove("inventoryItem")}    
            break;
            case "Edit A Product": 
                editItemBtn.classList.remove("d-none");
                inputId.classList.remove("d-none");      
                inputName.classList.remove("d-none");      
                inputDescription.classList.remove("d-none");
                inputBrand.classList.remove("d-none");     
                inputImg.classList.remove("d-none");      
                inputPrice.classList.remove("d-none");
                modalBody.querySelector(".input-group").classList.remove("d-none");    
            break;
            case "Delete A Product":
                deleteItemBtn.classList.remove("d-none");
                inputId.classList.remove("d-none"); 
            
        }
    }

    const makeCards = (where, obj) => {     
            
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
            <small class="text-muted">$<span class="productPrice">${obj.price}</span></small>
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
    deleteItemBtn.addEventListener("click", deleteProduct);   
    editItemBtn.addEventListener("click", editProduct);   
    subAllBtn.addEventListener("click", submitAll);   
    modifyInventoryBtn.addEventListener("click", addOrEdit);
    enterANewProductBtn.addEventListener("click", inventoryActionChoice);
    editAProductBtn.addEventListener("click", inventoryActionChoice);
    deleteAProductBtn.addEventListener("click", inventoryActionChoice);
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






