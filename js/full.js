let current =JSON.parse(sessionStorage.getItem('current'))||[];
let bag = JSON.parse(localStorage.getItem('shopper'))||[];
let indivi = document.getElementsByClassName('fulldetail')[0]


function show(){
    indivi.innerHTML =""
         let itemcase = shopitems.find((y) => y.id === current)
        let itemcass = bag.find((x) => x.id === current)
        
         indivi.innerHTML += 
         `<div class="fullitem">
         <div class="upperdescription">
         <img src="${itemcase.img}" alt="">
         </div>
         <div class="fulldescription">
         <p class="fullitemname">${itemcase.name}</p>
         <p class="fulldecs">
             ${itemcase.fulldetail}
         </p>
         <div class="fullmath">
             <p class="fullprice">$${itemcase.price}</p>
             <div class="control">
             <i class="bi bi-plus" id="plus" onclick="increase(${current})"></i>
                    <p>${itemcass !== undefined ? itemcass.item : 0 }</p>
                    <i class="bi bi-dash-lg" id="minus" onclick="decrease(${current})"></i>
             </div>
         </div>
     
         </div>
     </div>`
 }
 show()


 function update(){
    show()
    localStorage.setItem('shopper', JSON.stringify(bag))
}

function increase(id){
    let search = bag.find((x) => x.id === id)

    if(search === undefined){
        bag.push({
            id: id,
            item: 1
        })
    }
    else{
        search.item +=1
    }
   update()   
}

function decrease(id){
    let search = bag.find((x) => x.id === id)

    if(search !== undefined){
        search.item -= 1
    }
    else return
    bag = bag.filter((x) => x.item !== 0)
   update()   
}
 /* <i class="bi bi-bag-plus-fill" onclick="addtocart(${itemcase.id})"></i> */

 /* <i class="bi bi-x-lg" onclick="closefulldescription()"></i> */