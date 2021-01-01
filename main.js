

const getItem = () => {
    fetch('http://localhost:3000/api/cameras')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((camera) => {
            let product = `
            <div class="card m-2 card-index p-0 shadow mb-5 bg-white rounded " style="width: 18rem;">
            <img class="card-img-top" src="${camera.imageUrl}" height="180px" width="100%" alt="Product image">
            <div class="card-body">
            <p class="card-text title">Title: <strong>${camera.name}</strong></p>
            <p class="card-text price">Price: <strong>${camera.price} $</strong></p>
            <a href="product.html" class="btn btn-dark btn-detailed text-warning">Details</a>
            </div>
            </div>
            `;
            // Populate the index page with products
            let lastAdded = document.querySelector('.last-added');
            lastAdded.insertAdjacentHTML('afterbegin', product);
        })
    })

    .then((data) => {
        
    });
}


















getItem()
