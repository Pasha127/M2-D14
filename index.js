let obj = {};
const getProducts = async () => {
    fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE0MzgwMjAsImV4cCI6MTY2MjY0NzYyMH0.FxXNN1ADQHPQJbchifn_vi_cp1sdPcdONESnfaMV4DE"
}
}).then(response => obj = response).then(console.log(obj)).catch(err => console.log(err));

}
window.onload = () => {
    getProducts();
}

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