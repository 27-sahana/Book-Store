let user = null;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let books = [
{
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    description: "A classic novel of the Jazz Age",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg"
},
{
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    description: "An American classic about injustice",
    image: "https://cdn2.penguin.com.au/covers/original/9780434020485.jpg"
},
{
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 13.99,
    description: "A dystopian novel",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
},
{
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    price: 11.99,
    description: "A fantasy series",
    image: "https://wallpapers.com/images/hd/harry-potter-all-characters-lvbwsigjt3yykg3n.jpg"
},
{
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 13.99,
    description: "A story of teenage rebellion",
    image: "https://i.pinimg.com/originals/30/e1/2c/30e12c42d2d82b40bd611dcbf2d4f979.jpg"
},
{
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 15.99,
    description: "Fantasy adventure",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg"
},
{
    id:7,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    price: 14.99,
    description: "A mystery thriller",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720313229i/968.jpg"
},
{
    id:8,
    title: "Yellow Face",
    author: "Cormac McCarthy",
    price: 16.99,
    description: "A gripping tale of identity and belonging",
    image: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UIAVQ6PVPNBWNJTBMJBU436BR4_size-normalized.jpg&w=1440"
}
];

renderBooks();
updateCartCount();

function showPage(page){
document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

document.getElementById(page)
.classList.add("active");

if(page==="cart") renderCart();

if(page==="orders") renderOrders();
}

function renderBooks(){

const grid=document.getElementById("booksGrid");

grid.innerHTML=books.map(book=>`

<div class="book-card">

<div class="book-image">
<img src="${book.image}">
</div>

<div class="book-info">

<div class="book-title">
${book.title}
</div>

<p>${book.author}</p>

<div class="book-price">
$${book.price}
</div>

<button
class="btn cart-btn"
onclick="addToCart(${book.id})">
Add To Cart
</button>

<button
class="btn buy-btn"
onclick="buyNow(${book.id})">
Buy Now
</button>

</div>

</div>

`).join("");
}

function login(e){
e.preventDefault();

user={
email:document.getElementById("email").value
};

alert("Login Success");

showPage("home");
}

function addToCart(id){

if(!user){
alert("Please login");
showPage("login");
return;
}

const book=books.find(b=>b.id===id);

cart.push(book);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert("Added To Cart");
}

function updateCartCount(){

document.getElementById(
"cartCount"
).innerText=cart.length;
}

function renderCart(){

const container=
document.getElementById("cartItems");

if(cart.length===0){
container.innerHTML=
"<h3>Cart Empty</h3>";
return;
}

container.innerHTML=cart.map(item=>`

<div class="cart-item">

<div>
<h3>${item.title}</h3>
<p>$${item.price}</p>
</div>

<button onclick="removeCart(${item.id})">
Remove
</button>

</div>

`).join("");
}

function removeCart(id){

cart=cart.filter(
item=>item.id!==id
);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

renderCart();
}

function buyNow(id){

if(!user){
alert("Please Login");
showPage("login");
return;
}

const book=
books.find(b=>b.id===id);

orders.push({
id:Date.now(),
book:book.title,
price:book.price
});

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

alert("Order Placed");

renderOrders();
}

function renderOrders(){

const container=
document.getElementById("ordersList");

if(orders.length===0){
container.innerHTML=
"<h3>No Orders</h3>";
return;
}

container.innerHTML=
orders.map(order=>`

<div class="order-card">

<h3>${order.book}</h3>

<p>
Price :
$${order.price}
</p>

<p>
Order ID :
${order.id}
</p>

</div>

`).join("");
}