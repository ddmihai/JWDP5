
"use strict";

//get item ID from pages
let prodID = localStorage.getItem('prod');

// get the elements
let mainImage = document.querySelector('.imagecontainer');                          
let cameraName = document.querySelector('.cameraName');                             
let cameraDescription = document.querySelector('.cameraDescription');                   
let lensesContainer = document.querySelector('.lenses');
let pricedd = document.querySelector('.pricedd');
let alertSuccess = document.querySelector('.alert'); 
let addCart = document.querySelector('.addCart');
let cartLink = document.querySelector('.cartLink');

// counter
let counter = 0;
let items = [];


// set image background
let imageContainer = (item) => {
    let img = document.createElement('img');
    img.setAttribute('src',item.imageUrl);
    img.setAttribute('background-size', 'cover')
    mainImage.appendChild(img);
}

// get the name, description, lenses and price. this function append the lense in the UI component with the help of a button
let lenses = (item) => {
    let lenses = item.lenses;
    for (let i = 0; i < lenses.length; i ++) {
        let prod = `<button type="button" class="btn btn-outline-dark lenseBtn m-1">${lenses[i]}</button>`;
        lensesContainer.insertAdjacentHTML('afterbegin', prod);
    }
}

// get the camera description and the price button
let priceAndDescription = (item) => {
    cameraDescription.textContent = item.description;
    pricedd.textContent = `Price:   ${item.price} $`;
    cameraName.textContent = item.name;
}

//the fetch function where are located all the functions
let url = new URL('http://localhost:3000/api/cameras/' + prodID);
fetch(url)
    .then(response => {
           return response.json();
    })
    .then(data => {
            imageContainer(data);
            lenses(data);
            priceAndDescription(data);
            addToCart(data);
        })


// if the memory that contains the array does not exist, create one
    let addToCart = (item) => {
                addCart.addEventListener('click', () => {
// check if localstorage that contains the cart does not exist
                    if (localStorage.getItem('cart') === null) {
                        items.push(item);
                        localStorage.setItem('cart', JSON.stringify(items));
                        window.location = '/index.html';
                      }
                      else {
                        let parsed = JSON.parse(localStorage.getItem('cart')); //retrive the data
                        parsed.push(item);
                        localStorage.setItem('cart', JSON.stringify(parsed));
                        window.location = '/index.html';
                      }
        })
    }


