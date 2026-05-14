import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';

test.describe('Automation Exercise Tests', () => {
    test('Assert search results should contain "Dress" keyword', async ({ productsPage }) => {
        await productsPage.goto();
        await productsPage.searchProduct('Dress');

        const names = await productsPage.getProductNames();
        expect(names.length).toBeGreaterThan(0);
       
        /* Note: Not all results contain "Dress" in their name.
          The site appears to match by category, not just product name.
          This is considered a bug — search should return name-matched results only.
          See README for details.*/
        for (const name of names) {
         expect(name.toLowerCase()).toContain('dress');
        }
    });

});