let cart = [];

function renderCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    cartList.innerHTML += `
      <li class="flex items-center justify-between mb-3 bg-[#e6f4ea] rounded-lg shadow">
        <div class="flex-1 p-3">
          <h1>${item.name}</h1>
          <p>৳${item.price} x ${item.qty}</p>
        </div>
        <div>
          <button onclick="removeFromCart(${idx})">
            <i class='fa-solid fa-xmark'></i>
          </button>
        </div>
      </li>
    `;
  });
  const totalSpan = document.getElementById("cart-total");
  totalSpan.innerHTML = `
  <div class="flex justify-between">
    <h1>Total:</h1>
    <p>৳${total}</p>
  </div>
  `;
}

window.removeFromCart = function (idx) {
  cart.splice(idx, 1);
  renderCart();
};
