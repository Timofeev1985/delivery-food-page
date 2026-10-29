const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
let login = localStorage.getItem("delivery");
const products = [
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4.5",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Тануки",
    time: "40",
    rating: "5",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Food Pizza",
    time: "45",
    rating: "4.7",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4.8",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4.6",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "5",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4.5",
  },
  {
    image: "img/pizza-plus/preview.jpg",
    name: "Пицца плюс",
    time: "50",
    rating: "4.8",
  },
];

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("delivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }
  console.log("Авторизован");
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}
cardsRestaurants.innerHTML = `<h4 style="text-align:center; width:100%;">Загрузка...</h4>`;
function createCardRestaraunt() {
  console.log("Карточка создана");

  cardsRestaurants.innerHTML = "";
  products.forEach((product) => {
    console.log(product);
    const card = `
  <a class="card card-restaurant">
						<img src="${product.image}" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${product.name}</h3>
								<span class="card-tag tag">${product.time} мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									${product.rating}
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
							<!-- /.card-info -->
						</div>
						<!-- /.card-text -->
					</a>
 `;

    cardsRestaurants.insertAdjacentHTML("beforeend", card);
  });
}
setTimeout(() => {
  createCardRestaraunt();
}, 1000);

function notAuthorized() {
  console.log("не авторизован");
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    localStorage.setItem("delivery", login);
    toggleModalAuth();
    buttonAuth.removeEventListener("click", toggleModalAuth);
    closeAuth.removeEventListener("click", toggleModalAuth);
    logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}
function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
