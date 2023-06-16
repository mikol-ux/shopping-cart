let search = document.getElementById("search")
let output = document.getElementsByClassName("searchoutput")[0]
let indivi = document.getElementsByClassName("outputingindi")[0]
let all = document.getElementsByClassName("outputingall")[0]
let ent = document.getElementById("enter")
let cartnum = document.getElementsByClassName('cartitemnum')[0]

let bag = JSON.parse(localStorage.getItem('shopper'))||[]
let current =JSON.parse(sessionStorage.getItem('current'))||[];
let now =JSON.parse(sessionStorage.getItem('now'))||[]
// render all similar similar item in the search input when a value is entered 
search.addEventListener("keyup", (e) => {
   let a = e.target.value
   let ink = shopitems.filter((x) => {
    return (
        x.name.includes(a)
    )
   })
   print(ink)
   
})
// render all similar items from the search value when enter is clicked
ent.addEventListener("click", (e)=> {
    
    let inkall = shopitems.filter((x) => {
     return(
        x.name.includes(search.value)
     )
    })
   let arr = inkall.map(({id}) => { return {id}})
   console.log(arr)
    sessionStorage.setItem('now', JSON.stringify(arr)) 
    location.reload()
})
// render item from the search result
function print(values){
    if(search.value === ""){
        output.style.display = "none"
    }
    else if (search.value !== ""){
        output.style.display = "flex"
        output.innerHTML = ""
    values.forEach((x) => {
        console.log(x.id)
      output.innerHTML += `<div class="searchresultitem" onclick="addtoshow(${x.id})">
      <img src="${x.img}" alt="">
      <div class="description">
      <p class="searchresultitemname">${x.name}</p>
      <p class="searchresultprice">$${x.price}</p>
      </div>
      </div>
      `
    })
    }
    else return
    
}
//  store latestest clicked item for full description
function addtoshow(value){
   /*  console.log(value) */
    sessionStorage.setItem('current', JSON.stringify(value))
    location.href = "full.html"
   /*  location.reload() */
  }
// update render when item is clicked in search scroll or in the rendered items from clicking search button
  function update(){
    printall()
  }
// render all item from search when enter is clicked
function printall(){
    all.innerHTML = ""

    now.forEach((x) => {
        let {id} = x
        let sortit = shopitems.find((y) => y.id === id)

       return all.innerHTML +=`<div class="allitem">
      <img src="${sortit.img}" alt="" onclick="addtoshow(${id})" >
      <div class="alldescription">
      <p class="allitemname">${sortit.name}</p>
      <p class="alldecs">
          ${sortit.desc}
      </p>
      <div class="allmath">
          <p>$${sortit.price}</p>
        <i class="bi bi-bag-plus-fill" onclick="addtocart(${x.id})"></i>
      </div>
      </div>
  </div>`
    })
    
} 
 printall()
// show render item description 
/* function show(){
   indivi.innerHTML =""
        let itemcase = shopitems.find((y) => y.id === current)
        indivi.innerHTML += 
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
    output.style.display = "none"
    search.value = ""
}
show() */
// close full description
/* function closefulldescription(){
    indivi.innerHTML = ""
    sessionStorage.removeItem('current')
} */
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
    updatecart()
}
function updatecart(){
    shomnum()
    localStorage.setItem('shopper', JSON.stringify(bag))
}


function shomnum(){
    cartnum.innerHTML =  bag.map((x) => x.item).reduce((x, y) => x+y, 0)
}
shomnum()
