const bakeryMenu = [
    { id: 1, name: "Premium Chocolate Cake", type: "Cakes", price: 500, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
    { id: 2, name: "Strawberry Pastry", type: "Pastries", price: 80, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500" },
    { id: 3, name: "Choco-Chip Cookies Pack", type: "Cookies", price: 150, img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500" },
    { id: 4, name: "Red Velvet Cake", type: "Cakes", price: 650, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500" },
    { id: 5, name: "Blueberry Cheesecake", type: "Cakes", price: 750, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500" },
    { id: 6, name: "Vanilla Cream Cupcake", type: "Pastries", price: 60, img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500" },
    { id: 7, name: "French Butter Croissant", type: "Desserts", price: 110, img: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500" },
    { id: 8, name: "Assorted Macarons (6pcs)", type: "Cookies", price: 290, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500" },
    { id: 9, name: "Fudgy Walnut Brownie", type: "Desserts", price: 90, img: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=500" },
    { id: 10, name: "Mango Mousse Cup", type: "Desserts", price: 120, img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500" },
    { id: 11, name: "Almond Biscotti Pack (Classic)", type: "Cookies", price: 180, img: "https://images.unsplash.com/photo-1557925923-33b27f891f88?w=500" },
    { id: 12, name: "Glazed Chocolate Donut", type: "Desserts", price: 70, img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=500" }
];

let watchlist = [];
let selectedRating = 0;

window.onload = function() {
    renderMenu();
    populateOrderDropdown();
    updateWatchlistUI();
};

function renderMenu() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";
    
    bakeryMenu.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <div class="card-img-wrapper"><img src="${item.img}" alt="${item.name}"></div>
                <div class="card-info">
                    <span class="card-tag">${item.type}</span>
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <div class="btn-group">
                        <button onclick="quickOrder('${item.name}')">Order</button>
                        <button class="btn-watchlist" onclick="toggleWatchlist(${item.id})">⭐ Watchlist</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function populateOrderDropdown() {
    const dropdown = document.getElementById("product");
    dropdown.innerHTML = "";
    bakeryMenu.forEach(item => {
        dropdown.innerHTML += `<option value="${item.name}">${item.name} - ₹${item.price}</option>`;
    });
}

function showSection(sectionId){
    let sections = document.querySelectorAll(".section");
    sections.forEach(section => section.classList.remove("active"));
    
    document.getElementById(sectionId).classList.add("active");

    let navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => link.classList.remove("active-nav"));
    document.getElementById("nav-" + sectionId).classList.add("active-nav");
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function quickOrder(itemName){
    document.getElementById("product").value = itemName;
    showSection('order');
}

function playClickSound(highPitch = false) {
    try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        let ctx = new AudioContext();
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = highPitch ? 880 : 440; 
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
}

function playSuccessSound() {
    try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        let ctx = new AudioContext();
        
        let osc1 = ctx.createOscillator();
        let gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.value = 523.25;
        gain1.gain.setValueAtTime(0.15, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc1.connect(gain1); gain1.connect(ctx.destination);
        osc1.start(); osc1.stop(ctx.currentTime + 0.1);
        
        let osc2 = ctx.createOscillator();
        let gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.value = 659.25;
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.08); osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {}
}

function toggleWatchlist(itemId) {
    const parsedId = parseInt(itemId);
    const foundItem = bakeryMenu.find(item => item.id === parsedId);
    
    if (!watchlist.some(item => item.id === parsedId)) {
        watchlist.push(foundItem);
        playClickSound(true);
        alert(`"${foundItem.name}" added to your Watchlist!`);
    } else {
        alert('Item is already inside your saved watchlist.');
    }
    updateWatchlistUI();
}

function removeFromWatchlist(itemId) {
    watchlist = watchlist.filter(item => item.id !== parseInt(itemId));
    playClickSound(false);
    updateWatchlistUI();
}

function updateWatchlistUI() {
    document.getElementById("wl-count").innerText = watchlist.length;
    const wlContainer = document.getElementById("watchlist-container");
    
    if (watchlist.length === 0) {
        wlContainer.innerHTML = `
            <div class="empty-watchlist">
                <p style="font-size: 1.2rem; color: #777; margin-bottom: 10px;">Your Watchlist is empty</p>
                <p style="font-size: 0.9rem; color: #999;">Explore our menu and save items you want to try later!</p>
            </div>
        `;
        return;
    }
    
    wlContainer.innerHTML = "";
    watchlist.forEach(item => {
        wlContainer.innerHTML += `
            <div class="card">
                <div class="card-img-wrapper"><img src="${item.img}" alt="${item.name}"></div>
                <div class="card-info">
                    <span class="card-tag">${item.type}</span>
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <button onclick="quickOrder('${item.name}')">Order Now</button>
                    <button class="btn-remove" onclick="removeFromWatchlist(${item.id})">❌ Remove</button>
                </div>
            </div>
        `;
    });
}

function placeOrder(){
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let product = document.getElementById("product").value;
    let qty = parseInt(document.getElementById("qty").value);
    let address = document.getElementById("address").value.trim();

    if(name === "" || phone === "" || isNaN(qty) || qty < 1 || address === ""){
        alert("Please completely fill out order & logistics options correctly.");
        return;
    }

    let result = document.getElementById("result");
    result.style.display = "block";
    
    result.innerHTML = `
        <h3>✅ Order Confirmed!</h3>
        <p>Thank you <b>${name}</b>, your treat is heading over shortly.</p>
        <p style="margin-top: 8px;"><b>Product chosen:</b> ${product} (Qty: ${qty})</p>
        <p><b>Contact Registry:</b> ${phone}</p>
        <p><b>Delivery Target:</b> ${address}</p>
        <p style="margin-top:8px; font-size:12px; color:#666;">💳 Payment Mode: Cash On Delivery</p>
    `;

    playSuccessSound();
    
    // Fire WhatsApp Web dispatch
    sendToWhatsAppWeb(name, phone, product, qty, address);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("qty").value = "1";
    document.getElementById("address").value = "";
}

function sendToWhatsAppWeb(name, phone, item, quantity, address) {
    let whatsappMessage = 
        "🍰 *My Sweet Bakery Order Confirmation* 🍰%0A%0A" +
        "*Customer Name:* " + encodeURIComponent(name) + "%0A" +
        "*Customer Phone:* " + encodeURIComponent(phone) + "%0A" +
        "*Item:* " + encodeURIComponent(item) + "%0A" +
        "*Quantity:* " + encodeURIComponent(quantity) + "%0A" +
        "*Delivery Address:* " + encodeURIComponent(address) + "%0A%0A" +
        "💳 *Payment Mode:* Cash On Delivery";

    let whatsappURL = "https://web.whatsapp.com/send?phone=919175017069&text=" + whatsappMessage;
    window.open(whatsappURL, "_blank");
}

function sendEmailMessage() {
    let contactName = document.getElementById("contactName").value.trim();
    let contactEmail = document.getElementById("contactEmail").value.trim();
    let contactMsg = document.getElementById("contactMsg").value.trim();

    let emailSubject = encodeURIComponent("Website Inquiry from " + contactName);
    let emailBody = encodeURIComponent(
        "Name: " + contactName + "\n" +
        "Email: " + contactEmail + "\n\n" +
        "Message:\n" + contactMsg
    );

    window.location.href = "mailto:orders@sweetbakery.com?subject=" + emailSubject + "&body=" + emailBody;

    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMsg").value = "";
}

function setRating(rating) {
    selectedRating = rating;
    let stars = document.querySelectorAll("#starRatingSelect span");
    stars.forEach((star, index) => {
        if(index < rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}

function addReview(){
    let rName = document.getElementById("revName").value.trim();
    let rComment = document.getElementById("revComment").value.trim();
    
    if(rName === "" || rComment === "" || selectedRating === 0){
        alert("Please enter your name, leave feedback text and hit standard stars rating points evaluation.");
        return;
    }

    let starString = "";
    for(let i=0; i<5; i++){
        starString += (i < selectedRating) ? "★" : "☆";
    }

    let container = document.getElementById("reviewsContainer");
    let newCard = document.createElement("div");
    newCard.className = "review-card";
    newCard.innerHTML = `
        <div class="review-header">
            <span class="review-name">${rName}</span>
            <span class="stars" style="color:var(--star-color);">${starString}</span>
        </div>
        <p>"${rComment}"</p>
    `;
    
    container.prepend(newCard);

    document.getElementById("revName").value = "";
    document.getElementById("revComment").value = "";
    setRating(0);
    alert("Thank you for your rating!");
}