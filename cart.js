
// GET NEEDED ELEMENTS HERE
let prodHolder = document.querySelector('.prodHolder');
let quantityTitle = document.querySelector('.quantityTitle');
let subTotal = document.querySelector('.subTotal');
let deliverPrice = 122;
let totalSum = document.querySelector('.totalSum');
let checkout = document.querySelector('.checkout');

// this is the array taken from the local storage parsed to be used 
let items = JSON.parse(localStorage.getItem('cart'));

// image function create an img and replace it in the containers 
let changeImg = (div) => {
  let img = document.createElement('img');
  img.setAttribute('src', i.imageUrl);
  img.classList.add('imagee');
  div.appendChild(img);
}

// check if cart is empty
let checkIfEmpty = () => {
  if (items.length == 0) {
    quantityTitle.textContent = 'Your Cart is empty';
  } else {
    quantityTitle.textContent = 'Your Cart ' + '(' + items.length + ')';
  }
}

// the template literal that builds the string
let renderProduct = (i) => {
  let product = `
                  <div class="col border-bottom p-4 parent mt-2">
                  <div class="col upper d-flex flex-wrap">  
                    <div class="col-lg-4 col-md-12 col-xs-12 px-3 my-auto imgContainer"></div>
                    <div class="col-lg-4 col-md-12 col-xs-12 description">
                      <h5 class="text-dark py-2 prodName">${i.name}</h5>
                      <div class="col middle p-2">
                        <p class="text-dark"><strong>Product ID:</strong> ${i._id}</p>
                        <p><strong>Design</strong> 123Dp21-model</p>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-xs-12">
                      <p class="text-warning text-center prodPrice"><strong>${i.price} $</strong></p>
                    </div>
                  </div>
                  <div class="col bottom d-flex justify-content-center p-3">
                    <button type="button" class="btn btn-outline-dark px-5 mx-2 removeItem">REMOVE</button>
                    <button type="button" class="btn btn-outline-dark px-5 mx-2">EDIT</button>
                  </div>
                </div>
                  `;
  prodHolder.insertAdjacentHTML('afterbegin', product);

  // get the specifyed item and remove it. (here i moved the element to the end of the array, with splice, and removed it with POP method, and after i replaced the localstorage)
  //  I COUDNT MAKE THIS FUNCTION SHORTER !!
  let removeItem = document.querySelector('.removeItem');
  removeItem.onclick = () => {
    let value = i.name;
    let p = items.find((item) => {
      return item.name == value;
    })
    items.push(items.splice(items.indexOf(p), 1)[0]);
    items.pop();
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(items));
    window.location.reload();
  }
}

// render items on the cart with template strings;  MAIN FUNCTION
let populate = () => {
  for (i of items) {
    // render product
    renderProduct(i);
    // images
    let imgContainer = document.querySelector('.imgContainer');
    changeImg(imgContainer);
  }
}

// this method calculate the price with map and populate the form details.
let calculatePrice = () => {
  let price = items.map(i => i.price);
  if (price.length < 1) {
    return 'CART IS EMPTY';
  } else {
    let total = price.reduce((a, b) => a + b);
    subTotal.textContent = total + ' $';
    totalSum.textContent = total + deliverPrice + ' $';
  }
}

//  create the array of product ID's for the POST method and send it to the local storage
let prodIDorder = () => {
  let idProdArray = items.map(i => i._id);
  localStorage.setItem('ID ORDERS', JSON.stringify(idProdArray));
}

//checkout button that send user to the 

// SHOULD I LIVE THIS ON WINDOW ONLOAD???????
// once the page loaded, execute the functions
window.onload = () => {
    calculatePrice();  //calculate total prices and display to form thing
    populate();        //populate the div with the template literal divs
    checkIfEmpty();    //check if cart is empty and display title
    prodIDorder();     //sent the array of ID that the client want to buy to local storage
    checkoutForm();    //go to form page
}

// go to form section to complete order
let checkoutForm = () => {
  checkout.onclick = () => {
    if (items.length == 0) {
      quantityTitle.textContent = 'Cannot checkout an empty Cart!';
    }
      else {
        window.location = '/form.html';
      }
  }
}

