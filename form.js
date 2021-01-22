//get the product array from the localstorage
//the array is autopopulating  (overwriting)
let idArray = localStorage.getItem('ID ORDERS');
let parsedProd = JSON.parse(idArray);

// form elements
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let email = document.getElementById('email');
let city = document.getElementById('city');
let completeOrder = document.querySelector('.completeOrder');
let errorScreen = document.querySelector('.errorScreen');

// ----------------------------FROM VALIDATIONS-----------------------------------
// this function display an error on the errorScreen
let inputError = (i) => {
    errorScreen.textContent = `${i.name} input is not valid!`;
}

// this function check for empty values
//input field should be return true to pass the test
let checkInput = (i) => {
    if (i.value == '' || i.value == null)  {
        inputError(i);
        return false;
    }
    else {
        return true;
    }
} 

// this method check input to make sure that it contains only letters#
//input field should be return true to pass the test
let validateLetters = (i) => {  
    let letters = /^[A-Za-z]+$/;
    if (!i.value.match(letters)) {
        inputError(i);
        return false;
    }
    else {
        return true;
    }
}

// this event check if the form is ready or not to submit
completeOrder.addEventListener('click', ($event) => {
    $event.preventDefault();
        if (    
            checkInput(firstName) && validateLetters(firstName) &&
            checkInput(lastName)  && validateLetters(lastName)  &&
            checkInput(city)      && validateLetters(city)      &&
            checkInput(email)     && checkInput(address)
            ){
                // this is the OBJECT CONTACT
                const body = {
                    contact: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value,
                    },
                    products: parsedProd
                }

                request(body);
                }
        else {
                console.log(('form is not ready to submit'));
        }
})

// this is the request function. here, in the body is presented the object that need to be send to the API( stringfied ).
//after, the data can be passed to the checkLocalStorage(data) function that check and update the localstorage every time a change has been done
let request = (body) => {
    fetch('http://localhost:3000/api/cameras/order', {
        method : 'POST',
        body : JSON.stringify(body),

        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
                  }
    })
            .then(response => response.json())
            .then(data => checkLocalStorage(data))
            .catch(err => console.log(err))
}

// this function check if the order confirmation exists. IF it exists, it will remove it and create another one with the updated data.
// if the local storage object does not exist, the function will create it
let checkLocalStorage = (data) => {
    if (localStorage.getItem('confirmation') == true) {
            localStorage.setItem('confirmation', JSON.stringify(data));
            window.location = 'order_confirm.html';
    }
    else {
            localStorage.removeItem('confirmation');
            localStorage.setItem('confirmation', JSON.stringify(data));
            window.location = 'order_confirm.html';        
    }
}


