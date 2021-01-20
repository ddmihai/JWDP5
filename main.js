"use strict";

// set the productwith the ITEM parameter
let displayProduct = (item) => {
        let product = `
                <div class="card m-2 card-index p-0 shadow mb-5 bg-white rounded " style="width: 18rem;">
                <img class="card-img-top" src="${item.imageUrl}" height="180px" width="100%" alt="Product image">
                <div class="card-body">
                <p class="card-text title">Title: <strong>${item.name}</strong></p>
                <p class="card-text price">Price: <strong>${item.price} $</strong></p>
                <button type="button" class="btn btn-dark btn-detailed">Details</button>
                </div>
                </div>
                `;
                let lastAdded = document.querySelector('.last-added');
                lastAdded.insertAdjacentHTML('afterbegin', product); 

                document.querySelector('.btn-detailed').addEventListener('click', () => {
                    localStorage.setItem('prod', item._id);
                     window.location.pathname = '/product.html';
                })

}

// main URL
let url = new URL('http://localhost:3000/api/cameras/');

// set the header what type of files should accept from the server
let header = new Headers();
header.append('Accept', 'application/json');

// new obj to be modified to post
let newReq = new Request(url, {
    method : 'GET',
    headers: header,
    mode: 'cors'
});

// main fetch
fetch(newReq)
    .then (response => {
            return response.json()})
    .then (data => {
        data.forEach(element => {
            displayProduct(element);
        })
    })
    .catch(err => console.log(err));


