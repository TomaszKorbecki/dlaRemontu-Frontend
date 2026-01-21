// views/components/AddToListBox.js

export function AddToListBox({ state }) {
    state.cartQty ??= 1;
  
    return `
      <section class="add-to-list-box">
        <h4 class="add-to-list-title">
          Checklista
        </h4>
  
        <p class="add-to-list-desc">

Checklista pomaga przygotować się do pracy i niczego nie pominąć. Brakujące elementy możesz dodać ręcznie albo skorzystać z pomocy asystenta.
        </p>
  
        <div class="add-to-list-actions">
          <div class="qty-control">
            <button class="qty-btn" data-action="decrease">−</button>
            <span class="qty-value">${state.cartQty} szt.</span>
            <button class="qty-btn" data-action="increase">+</button>
          </div>
  
          <button class="add-to-list-btn">
            <i class="fa-solid fa-list-ul"></i>
            Dodaj produkt
          </button>
        </div>
      </section>
    `;
  }
  