    // get the 'confirmation' obj from local storage
    let responseObj = localStorage.getItem('confirmation');
    let readyData = JSON.parse(responseObj);

    //console.log(readyData);

    // get the elements 
    let fName = document.querySelector('.fName');
    let lName = document.querySelector('.lName');
    let address = document.querySelector('.address');
    let email = document.querySelector('.email');
    let city = document.querySelector('.city');
    let orderId = document.querySelector('.orderId');
    let holder = document.querySelector('.holder');

// this function populates the fields with the returned object from the localstorage
    let populate = () => {
        fName.textContent = readyData.contact.firstName; 
        lName.textContent = readyData.contact.lastName;
        email.textContent = readyData.contact.email;
        address.textContent = readyData.contact.address;
        city.textContent = readyData.contact.city;
        orderId.textContent = readyData.orderId;
    }

//  this function use the fetch function that get the specified product from the API
// for each element in products, it will create a template literal 
    let populateProducts = () => {
        readyData.products.forEach(el => {
            request(el._id);
        })
    }
    
// this function create the template literal and populate it with the details
    let request = (id) => {
        fetch('http://localhost:3000/api/cameras' + '/' + id) 
                    .then(response => response.json())
                    .then(data => {
                        let product = `
                        <div class="col p-3 border-bottom d-flex">
                        <div class="col-2  imageContainer"><img src="${data.imageUrl}" width="110" height="90" alt="camera picture"></div>
                        <div class="col">
                            <h6 class="text-dark p-1">Camera title: ${data.name}</h6>
                            <p class="text-dark p-1">Camera ID: ${data._id}</p>
                        </div>
                        </div>
                        `;
                        holder.insertAdjacentHTML('beforeend', product);
                    })
                    } 


// execute the main functions
populate();
populateProducts()