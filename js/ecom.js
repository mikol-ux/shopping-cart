let shopdisplay = document.getElementsByClassName("shopdisplay")[0]
let cartcontent = document.getElementsByClassName("cartdisplay")[0]
let retail = document.getElementsByClassName("seee")[0]
let carts = document.getElementsByClassName("cartitemnum")[0]
let plus = document.getElementById("plus")
let bag = JSON.parse(localStorage.getItem('shopper'))||[];
let current =JSON.parse(sessionStorage.getItem('current'))||[];
let filtered = JSON.parse(sessionStorage.getItem('filtered'))||[]



// for filtering and displaying items
function shopitemsdisplay(value){
    let filteritem = shopitems.filter((x) => x.category === value)
    let secondfilter = filteritem.map(({id}) => {return{id}})
     sessionStorage.setItem('filtered', JSON.stringify(secondfilter))
     displayproduct()
     location.reload()
}
// for displaying filtered items
 function   displayproduct(){
    shopdisplay.innerHTML =""
    if(filtered.length === 0){
    shopitems.forEach((x) => {
  shopdisplay.innerHTML +=`<div class="item">
         <img src="${x.img}" alt="" onclick="addtoshow(${x.id})">
         <div class="descript">
         <p class="nam">${x.name}</p>
         <p class="decs">
             ${x.desc}
         </p>
         <div class="math">
             <p>$${x.price}</p>
             <p onclick="fulldetail(${x.id})">full</p>
             <i class="bi bi-bag-plus-fill" onclick="addtocart(${x.id})"></i>
         </div>
 
         </div>
     </div>`})
    }
    else{

        
        filtered.forEach((x) => {
            let {id} = x
            let search = shopitems.find((y) => y.id === id)
 
         return   shopdisplay.innerHTML +=`<div class="item">
                   <img src="${search.img}" alt="" onclick="addtoshow(${id})">
                   <div class="descript">
                   <p class="nam">${search.name}</p>
                   <p class="decs">
                       ${search.desc}
                   </p>
                   <div class="math">
                       <p>$${search.price}</p>
                       <p onclick="fulldetail(${search.id})">full</p>
                       <i class="bi bi-bag-plus-fill" onclick="addtocart(${id})"></i>
                   </div>
           
                   </div>
               </div>`})
    }
     
} 
displayproduct()

// adding to cart
function addtocart(id){
    let selected = id
    let search = bag.find((x) => x.id === selected)
    if(search === undefined){
        bag.push(
            {
                id: selected,
                item : 1
            }
        )
    }
    else return
    update()
}
// display selected product


// increase the amount of a particular product
function increment(id){
   let selected = id
    let search = bag.find((x) => x.id === selected)
    if(search !== undefined){
        search.item += 1
    }
    update()
}
// update on new data in cart
 function update(){
    rendercartitems()
    localStorage.setItem('shopper', JSON.stringify(bag))
 }
// decrease the amount of a particular product
function decrement(id){
    let selected = id
    let search = bag.find((x) => x.id === selected)
    if(search !== undefined){
        search.item -= 1
    }
    bag = bag.filter((x) => x.item !== 0)
    update()
}

// show full description but is unfinished
function fulldetail(id){
    let selected = id
  let full = shopitems.find((x) => x.id === selected)

  retail.innerHTML = full.name

}
// remove individual items from cart
function removeitem(id){
    let selected = id
    bag = bag.filter((x) => x.id !== selected)
   update()
}
// show the amount of items in cart
function rendercartitems(){
   let totalitem = bag.map((x) => x.item).reduce((x, y) => x+y, 0)
   carts.innerHTML = totalitem
}
rendercartitems()
// display cart products
/* plus.addEventListener("click", (e) => {
   if(cartcontent.style.display === "none"){
     cartcontent.style.display = "flex"
   }
   else {
   cartcontent.style.display = "none"
   }
}) */
// show fulldescription
function addtoshow(value){
    console.log(value)
    sessionStorage.setItem('current', JSON.stringify(value))
    location.href = "full.html"
}
/* function addtoshow(value){
    console.log(value)
    sessionStorage.setItem('current', JSON.stringify(value))
    retail.innerHTML =""
         let itemcases = shopitems.find((y) => y.id === value)
         retail.innerHTML += 
         `<div class="fullitem">
         <div class="upperdescription">
         <img src="${itemcases.img}" alt=""><i class="bi bi-x-lg" onclick="closefulldescription()"></i>
         </div>
         <div class="fulldescription">
         <p class="fullitemname">${itemcases.name}</p>
         <p class="fulldecs">
             ${itemcases.fulldetail}
         </p>
         <div class="fullmath">
             <p class="fullprice">${itemcases.price}</p>
           <i class="bi bi-bag-plus-fill" onclick="addtocart(${itemcases.id})"></i>
         </div>
     
         </div>
     </div>` 
  } */
/*  function show(){
    retail.innerHTML =""
         let itemcase = shopitems.find((y) => y.id === current)
         retail.innerHTML += 
         `<div class="fullitem">
         <div class="upperdescription">
         <img src="${itemcase.img}" alt=""><i class="bi bi-x-lg" onclick="closefulldescription()"></i>
         </div>
         <div class="fulldescription">
         <p class="fullitemname">${itemcase.name}</p>
         <p class="fulldecs">
             ${itemcase.fulldetail}
         </p>
         <div class="fullmath">
             <p class="fullprice">${itemcase.price}</p>
           <i class="bi bi-bag-plus-fill" onclick="addtocart(${itemcase.id})"></i>
         </div>
     
         </div>
     </div>`
 }
 show() */ 
 function closefulldescription(){
    retail.innerHTML = ""
    sessionStorage.removeItem('current')
 }
