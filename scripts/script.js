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

function addToCart(plant) {
  const found = cart.find((item) => item.id === plant.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...plant, qty: 1 });
  }
  renderCart();
}

async function fetchCategories() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    if (data.status && data.categories) {
      const list = document.getElementById("category-list");
      list.innerHTML = "";
      list.innerHTML += `<li><a href='#' data-id='all' class='category-btn bg-green-800 text-white w-[250px] px-4 py-1 rounded-lg block'>All Trees</a></li>`;
      data.categories.forEach((cat) => {
        list.innerHTML += `<li><a href='#' data-id='${cat.id}' title='${cat.small_description}' class='category-btn w-[250px] px-4 py-1 rounded-lg block'>${cat.category_name}</a></li>`;
      });
      list.querySelectorAll(".category-btn").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          list.querySelectorAll(".category-btn").forEach((btn) => {
            btn.classList.remove("bg-green-800", "text-white");
          });
          link.classList.add("bg-green-800", "text-white");
          const id = link.getAttribute("data-id");
          if (id === "all") {
            fetchPlants();
          } else {
            fetchPlantsByCategory(id);
          }
        });
      });
      const select = document.getElementById("category-select");
      if (select) {
        select
          .querySelectorAll('option:not([value="all"]):not([disabled])')
          .forEach((opt) => opt.remove());
        data.categories.forEach((cat) => {
          const option = document.createElement("option");
          option.value = cat.id;
          option.textContent = cat.category_name;
          select.appendChild(option);
        });
        select.value = "all";
        select.onchange = function () {
          const id = select.value;
          if (id === "all") {
            fetchPlants();
          } else {
            fetchPlantsByCategory(id);
          }
        };
      }
      async function fetchPlantsByCategory(categoryId) {
        try {
          showSpinner();
          const res = await fetch(
            `https://openapi.programming-hero.com/api/category/${categoryId}`
          );
          const data = await res.json();
          hideSpinner();
          if (data.status && data.plants) {
            const container = document.getElementById("card-container");
            container.innerHTML = "";
            data.plants.forEach((plant) => {
              container.appendChild(renderCard(plant));
            });
          }
        } catch (error) {
          hideSpinner();
          console.error("Error fetching plants by category:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
fetchCategories();
