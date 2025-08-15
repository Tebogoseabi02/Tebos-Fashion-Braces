
// Smooth scrolling for internal header links (optional)
document.querySelectorAll('header a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

let cartCount = 0;
let cart = [];

// Show temporary toast popup
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }, 100);
}

// Update cart counter
function updateCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  cartCounter.textContent = `Cart: ${cartCount} item(s)`;
}

// Update mini cart content
function updateMiniCart() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - R${item.price} x ${item.quantity}
      <button class="remove-item" data-index="${index}" title="Remove"><i class="fas fa-times"></i></button>
    `;
    cartItemsList.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: R${total}`;
  attachRemoveButtons();
}

// Attach remove button functionality
function attachRemoveButtons() {
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      const removedItem = cart[index];
      cartCount -= removedItem.quantity;
      cart.splice(index, 1);
      updateCartCounter();
      updateMiniCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".gallery-item");
      const name = parent.querySelector(".brace-name").textContent.trim();
      const priceText = parent.querySelector(".brace-price").textContent.trim();
      const price = parseInt(priceText.replace("R", ""));

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      cartCount++;
      updateCartCounter();
      updateMiniCart();
      showToast(`${name} added to cart`);
    });
  });

  // Toggle mini cart
  const cartDisplay = document.getElementById("cart-display");
  const miniCart = document.getElementById("mini-cart");
  cartDisplay.addEventListener("click", () => {
    miniCart.classList.toggle("show");
  });

  // Checkout → redirect to coming-soon.html
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      window.location.href = "coming-soon.html";
    }
  });

  updateCartCounter();
});

showToast(`${name} Press cart items to pay`);

// When user presses Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Show the finalize popup
  const popup = document.getElementById("finalize-popup");
  const itemsList = document.getElementById("finalize-items");
  const totalDisplay = document.getElementById("finalize-total");

  // Clear and add cart items
  itemsList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - R${item.price} x ${item.quantity}`;
    itemsList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalDisplay.textContent = `Total: R${total}`;
  popup.style.display = "flex";
});

// Cancel popup
document.getElementById("cancel-btn").addEventListener("click", () => {
  document.getElementById("finalize-popup").style.display = "none";
});

// Proceed to "Coming Soon"
document.getElementById("proceed-btn").addEventListener("click", () => {
  window.location.href = "coming-soon.html";
});
