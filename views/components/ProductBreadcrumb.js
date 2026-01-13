export function ProductBreadcrumb({ product }) {
    return `
      <div class="text-sm text-stone-500 mb-6">
        <span
          class="text-[#cd5341] hover:opacity-80 cursor-pointer font-medium"
          onclick="app.router('home')"
        >
          Strona główna
        </span>
  
        <span class="mx-1">/</span>
  
        <span>
          ${product.categoryName || 'Kategoria'}
        </span>
  
        <span class="mx-1">/</span>
  
        <span class="text-stone-700 font-medium">
          ${product.name}
        </span>
      </div>
    `;
  }  