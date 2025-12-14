const shopItems = [
    {
        id: 1,
        image: "assets/guitar-stock.jpg",
        name: "Akoestische Gitaar",
        description: "Mooie gitaar met goede klank. Komt met een tas en reserve snaren erbij. Heel geschikt voor beginners.",
        price: 349,
        productPage: "product-gitaar.html"
    },
    {
        id: 2,
        image: "assets/piano-stock.jpg",
        name: "Digitale Piano",
        description: "Digitale piano met 88 toetsen. Heeft ingebouwde speakers dus je kan meteen spelen. Toetsen voelen best realistisch aan.",
        price: 599,
        productPage: "product-piano.html"
    },
    {
        id: 3,
        image: "assets/drums-stock.jpg",
        name: "Elektronisch Drumstel",
        description: "Elektrisch drumstel voor thuis. Niet te luid dus je buren worden niet gek. Krijg je er stokken, koptelefoon en een krukje bij.",
        price: 749,
        productPage: "product-drums.html"
    },
    {
        id: 4,
        image: "assets/microphone-stock.jpg",
        name: "Studio Microfoon",
        description: "Studio mic voor opnames. Kwaliteit is prima, gebruik hem zelf ook. Komt met een popfilter en shockmount.",
        price: 189,
        productPage: "product-microfoon.html"
    },
    {
        id: 5,
        image: "assets/saxophone-stock.jpg",
        name: "Tenor Saxofoon",
        description: "Tenor sax met gouden afwerking. Klinkt goed en speelt lekker. Krijg je een complete set bij met alles wat je nodig hebt.",
        price: 899,
        productPage: "product-saxofoon.html"
    },
    {
        id: 6,
        image: "assets/violin-stock.jpg",
        name: "Viool",
        description: "Student viool die best goed klinkt. Ideaal om mee te beginnen. Krijg je er een koffer, strijkstok en hars bij.",
        price: 279,
        productPage: "product-viool.html"
    }
];

let cart = [];
let wishlist = [];

document.addEventListener('DOMContentLoaded', () => {
    renderShopItems();
    renderCart();
    renderWishlist();
});

function renderShopItems() {
    const grid = document.getElementById('shop-items-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    shopItems.forEach(shopItem => {
        const article = document.createElement('article');
        article.className = 'item';
        
        article.innerHTML = 
            '<button class="wishlist-heart" data-id="' + shopItem.id + '">&hearts;</button>' +
            '<div class="img-wrap" style="background-image: url(\'' + shopItem.image + '\');"></div>' +
            '<div class="details">' +
                '<h3><a href="' + shopItem.productPage + '">' + shopItem.name + '</a></h3>' +
                '<p>' + shopItem.description + '</p>' +
                '<p class="price">€' + shopItem.price + '</p>' +
                '<button class="addCart" data-id="' + shopItem.id + '">Toevoegen aan winkelmandje</button>' +
            '</div>';
        
        grid.appendChild(article);
    });
    
    document.querySelectorAll('.addCart').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    document.querySelectorAll('.wishlist-heart').forEach(btn => {
        btn.addEventListener('click', handleWishlistToggle);
    });
    
    updateHeartStates();
}

function handleAddToCart(e) {
    const itemId = parseInt(e.target.dataset.id);
    const item = shopItems.find(shopItem => shopItem.id === itemId);
    
    if (!item) return;
    
    const existing = cart.find(cartItem => cartItem.id === item.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    renderCart();
}

function renderCart() {
    const cartEl = document.querySelector('.cart');
    if (!cartEl) return;
    
    if (cart.length === 0) {
        cartEl.innerHTML = '<h3>Winkelmandje</h3><p class="msg-empty">Je winkelmandje is leeg</p>';
        return;
    }
    
    const total = cart.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
    
    let html = '<h3>Winkelmandje</h3>';
    
    cart.forEach(cartItem => {
        html += '<div class="cart-item">' +
                '<img src="' + cartItem.image + '" alt="' + cartItem.name + '">' +
                '<div class="item-info">' +
                    '<p class="item-name">' + cartItem.name + '</p>' +
                    '<p class="item-price">€' + (cartItem.price * cartItem.quantity).toFixed(2) + '</p>' +
                    '<p class="item-quantity">Aantal: ' + cartItem.quantity + '</p>' +
                '</div>' +
                '<button class="remove-btn" data-id="' + cartItem.id + '">&times;</button>' +
            '</div>';
    });
    
    html += '<div class="total">Totaal: €' + total.toFixed(2) + '</div>';
    
    cartEl.innerHTML = html;
    
    cartEl.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const removeId = parseInt(e.target.dataset.id);
            cart = cart.filter(cartItem => cartItem.id !== removeId);
            renderCart();
        });
    });
}

function handleWishlistToggle(e) {
    e.stopPropagation();
    const itemId = parseInt(e.target.dataset.id);
    const item = shopItems.find(shopItem => shopItem.id === itemId);
    
    if (!item) return;
    
    const index = wishlist.findIndex(wishItem => wishItem.id === item.id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image
        });
    }
    
    renderWishlist();
    updateHeartStates();
}

function updateHeartStates() {
    document.querySelectorAll('.wishlist-heart').forEach(heart => {
        const itemId = parseInt(heart.dataset.id);
        const item = shopItems.find(shopItem => shopItem.id === itemId);
        
        if (item) {
            const inWishlist = wishlist.find(wishItem => wishItem.id === item.id);
            heart.classList.toggle('active', !!inWishlist);
        }
    });
}

function renderWishlist() {
    const wishlistEl = document.querySelector('.wishlist');
    if (!wishlistEl) return;
    
    if (wishlist.length === 0) {
        wishlistEl.innerHTML = '<h3>Wishlist</h3><p class="msg-empty">Je wishlist is leeg</p>';
        return;
    }
    
    const total = wishlist.reduce((sum, wishItem) => sum + wishItem.price, 0);
    
    let html = '<h3>Wishlist</h3>';
    
    wishlist.forEach(wishItem => {
        html += '<div class="wishlist-item">' +
                '<img src="' + wishItem.image + '" alt="' + wishItem.name + '">' +
                '<div class="item-info">' +
                    '<p class="item-name">' + wishItem.name + '</p>' +
                    '<p class="item-price">€' + wishItem.price.toFixed(2) + '</p>' +
                '</div>' +
            '</div>';
    });
    
    html += '<div class="total">Totaal: €' + total.toFixed(2) + '</div>';
    
    wishlistEl.innerHTML = html;
}
