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
                console.log('form is ready to submit');
            }
        else {
                console.log(('form is not ready to submit'));
        }
})

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
            .then(data => console.log(data))
            .catch(err => console.log(err))
}

