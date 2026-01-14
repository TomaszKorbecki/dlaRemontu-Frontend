import { productDetailTemplate } from './productDetail.template.js';

export async function productDetailView(
    container,
    productId,
    {
      API_URL,
      state,
      renderSearchBar,
      hasUserLocation,
      initLocationsMap
    }
  ) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`);

    if (!res.ok) {
      container.innerHTML =
        '<p class="p-6 text-red-600">Nie znaleziono produktu</p>';
      return;
    }

    const { product, availability } = await res.json();

    container.innerHTML = productDetailTemplate({
        product,
        availability,
        state,
        renderSearchBar,
        hasUserLocation
      });

    if (hasUserLocation()) {
      initLocationsMap({
        elementId: 'product-map-canvas',
        locations: availability.map(a => ({
          lat: a.lat,
          lng: a.lng,
          name: a.name,
          address: a.address
        }))
      });
    }
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="p-6 text-red-600">Błąd ładowania produktu</p>';
  }
}