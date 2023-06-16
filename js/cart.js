


let content = document.getElementsByClassName('content')[0]
let cartcontent = document.getElementsByClassName("cartcontent")[0]
let number = document.getElementsByClassName('number')[0]
let totalamountofprice = document.getElementsByClassName('totalamountprice')[0]
let bag = JSON.parse(localStorage.getItem('shopper'))||[];


function displaycart(){
    if(bag.length !== 0){
      cartcontent.innerHTML = ""
    return  bag.forEach((x) => {
        let {id, item} = x
        let search = shopitems.find((y) => y.id === id)

      return  cartcontent.innerHTML += `
        <div class="items">
            <img src="${search.img}" alt="">
            <div class="maindetail">
            <i class="bi bi-x-lg" id="cancle" onclick="cancle(${id})"></i>
            <div class="calc">
                 <div class="names">${search.name}</div>
                <div class="price">$${search.price}</div>
                <div class="totalprice">$${search.price * item}</div>
                <div class="amount">
                    <i class="bi bi-plus" id="plus" onclick="increase(${id})"></i>
                    <p>${item}</p>
                    <i class="bi bi-dash-lg" id="minus" onclick="decrease(${id})"></i>
                </div>
            </div>
        </div>
      </div>
            
    </div>`
      })  
    }
    else{
        return cartcontent.innerHTML = `
        <div class="empty">
        <p>empty</P>
        <button><a href="ecom.html">back home</a></button></div> 
        `
    }
}
displaycart()
// render latest data
function update(){
    displaycart()
    displaycheckout()
    localStorage.setItem('shopper', JSON.stringify(bag))
}
// increase number of goods
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
   localStorage.setItem('shopper', JSON.stringify(bag))
}
// decrease number of goods
function decrease(id){
    let search = bag.find((x) => x.id === id)

    if(search !== undefined){
        search.item -= 1
    }
    else return
    bag = bag.filter((x) => x.item !== 0)
   update()  
   localStorage.setItem('shopper', JSON.stringify(bag))
}
// remove cancle items 
function cancle(id){
    bag = bag.filter((x) => x.id !== id)
    update()
    localStorage.setItem('shopper', JSON.stringify(bag))
}
// calculate total number of items
function calculatetotalnumber(){
 number.innerHTML=bag.map((x) => x.item).reduce((x, y) => x+y, 0)
}
calculatetotalnumber()
// display checkout option
function displaycheckout(){
    if(bag.length !== 0){
        let amount =  bag.map((x) => {
            let {id, item} = x
            let search = shopitems.find((y) => y.id === id)||[]
            return item * search.price
         })
    
        
    content.innerHTML=  `<div class="total">
          <p class="totalamountprice">$${amount.reduce((x, y)=> x+y, 0)}</p>
          <div class="button">
              <button class="checkout" >checkout</button> <button class="clearall" onclick="clearall()">clear all</button>
          </div>`
    }
    else {
        content.innerHTML = ""
    }
}
displaycheckout()
// clear all
function clearall(){
    bag = []
    calculatetotalnumber()
    displaycheckout()
    displaycart()
    localStorage.setItem('shopper', JSON.stringify(bag))
}
