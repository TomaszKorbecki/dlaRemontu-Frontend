import { PageLayout } from './layouts/PageLayout.js';
import { BackgroundBubbles } from './layouts/BackgroundBubbles.js';

import { ProductSidePanel } from './components/ProductSidePanel.js';
import { ProductBreadcrumb } from './components/ProductBreadcrumb.js';
import { ProductInfoBox } from './components/ProductInfoBox.js';
import { ProductSummaryBox } from './components/ProductSummaryBox.js';
import { ProductGallery } from './components/ProductGallery.js';
import { ProductSpecs } from './components/ProductSpecs.js';
import { ProductDescription } from './components/ProductDescription.js';
import { ProductAssistantTeaser } from './components/ProductAssistantTeaser.js';
import { ProductAssistantSection } from './components/ProductAssistantSection.js';

export function productDetailTemplate({
  product,
  availability,
  state,
  renderSearchBar,
  hasUserLocation
}) {
  return PageLayout({
    content: `
      <!-- HERO PRODUKTU -->
      <section class="relative overflow-hidden isolate pt-24">

        <!-- BĄBLE – HERO KARTY PRODUKTU -->
        ${BackgroundBubbles()}

        <!-- UI -->
        <div class="relative z-10">

          <!-- SEARCH -->
          <div class="relative z-30 pb-8 max-w-7xl mx-auto px-6">
            ${renderSearchBar()}
          </div>

          <!-- CONTENT PRODUKTU -->
          <div class="fade-in max-w-7xl mx-auto px-6 py-10 space-y-10">

            ${ProductBreadcrumb({ product })}

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <!-- LEWA KOLUMNA -->
              <div class="lg:col-span-8 space-y-8">

                <h1 class="text-3xl font-bold text-stone-900">
                  ${product.name}
                </h1>

                <div class="grid md:grid-cols-2 gap-6">
                  ${ProductInfoBox({ product })}
                  ${ProductSummaryBox()}
                </div>

                ${ProductAssistantTeaser()}
                ${ProductGallery({ images: product.images || [] })}
                ${ProductDescription({ description: product.description })}
                ${ProductSpecs({ specs: product.specs || {} })}

              </div>

              ${ProductSidePanel({
                product,
                availability,
                state,
                hasUserLocation
              })}

            </div>
          </div>

        </div>
      </section>
    `
  });
}
