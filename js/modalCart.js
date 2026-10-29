"use strict";

(function () {
  // Состояние корзины: массив объектов { id, name, price, count }
  const cart = [];

  // DOM-элементы
  const cartModal = document.querySelector(".modal-cart");
  const cartBody = cartModal.querySelector(".modal-body");
  const modalPricetag = cartModal.querySelector(".modal-pricetag");
  const clearCartBtn = cartModal.querySelector(".clear-cart");
  const cartButton = document.getElementById("cart-button");

  // Утилита: форматирование цены
  const formatPrice = (value) => `${value} ₽`;

  // Отрисовка корзины
  const renderCart = () => {
    // Если корзина пуста — показываем заглушку
    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="food-row food-row-empty">
          <span class="food-name">Корзина пуста</span>
        </div>
      `;
      modalPricetag.textContent = formatPrice(0);
      return;
    }

    // Генерируем строки товаров
    cartBody.innerHTML = cart
      .map(
        (item) => `
        <div class="food-row" data-id="${item.id}">
          <span class="food-name">${item.name}</span>
          <strong class="food-price">${formatPrice(item.price * item.count)}</strong>
          <div class="food-counter">
            <button class="counter-button counter-minus" data-action="minus">-</button>
            <span class="counter">${item.count}</span>
            <button class="counter-button counter-plus" data-action="plus">+</button>
          </div>
        </div>
      `,
      )
      .join("");

    // Считаем общую стоимость
    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    modalPricetag.textContent = formatPrice(total);
  };

  // Добавление товара в корзину
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.count += 1;
    } else {
      cart.push({ ...product, count: 1 });
    }

    renderCart();
  };

  // Изменение количества товара
  const changeCount = (id, delta) => {
    const item = cart.find((el) => el.id === id);
    if (!item) return;

    item.count += delta;

    // Если количество упало до 0 — удаляем товар
    if (item.count <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }

    renderCart();
  };

  // Полная очистка корзины
  const clearCart = () => {
    cart.length = 0;
    renderCart();
  };

  // Делегирование кликов внутри корзины (+ / -)
  cartBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".counter-button");
    if (!btn) return;

    const row = btn.closest(".food-row");
    const id = row.dataset.id;
    const action = btn.dataset.action;

    changeCount(id, action === "plus" ? 1 : -1);
  });

  // Обработчик кнопки "Отмена" — очищает корзину
  clearCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearCart();
  });

  // Обработчик кнопки "Оформить заказ"
  const submitBtn = cartModal.querySelector(".modal-footer .button-primary");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Корзина пуста");
        return;
      }
      alert(`Заказ оформлен на сумму ${modalPricetag.textContent}`);
      clearCart();
    });
  }

  // Делегирование добавления товаров из меню
  const menuCards = document.querySelector(".cards-menu");
  if (menuCards) {
    menuCards.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".button-add-cart");
      if (!addBtn) return;

      const card = addBtn.closest(".card");
      const name = card.querySelector(".card-title").textContent.trim();
      const priceText = card.querySelector(".card-price-bold").textContent;
      const price = parseInt(priceText.replace(/\D/g, ""), 10);

      // Уникальный id — имя товара (достаточно для демо)
      const id = name;

      addToCart({ id, name, price });
    });
  }

  // Начальная отрисовка (корзина пуста при загрузке)
  renderCart();
})();
let modalCart = function () {
  const modalCart = document.querySelector(".modal.modal-cart");

  const modalDialog = document.querySelector(".modal-dialog");
  document.addEventListener("click", (e) => {
    if (
      e.target.dataset.toggle == "modal-cart" ||
      e.target.parentNode.dataset.toggle == "modal-cart" ||
      (!e.composedPath().includes(modalDialog) &&
        modalCart.classList.contains("is-open"))
    ) {
      e.preventDefault();
      modalCart.classList.toggle("is-open");
    }
  });
  document.addEventListener("keyup", (event) => {
    console.log(event.key);
    if (event.key == "Escape" && modalCart.classList.contains("is-open")) {
      modalCart.classList.toggle("is-open");
    }
  });
};
modalCart();
