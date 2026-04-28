import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { productsApi } from './productsService';
import { server } from '../test/server';
import { ProductCategory } from '../utils/enum';

const product = {
  product_id: 'product-1',
  name: 'Large Popcorn Bucket',
  category: ProductCategory.Food,
  price: 100,
  image: 'https://example.com/image.jpg',
};

describe('products API', () => {
  it('creates a product', async () => {
    server.use(
      http.post('http://localhost:8000/products', async ({ request }) => {
        expect(await request.json()).toEqual({
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
        });
        return HttpResponse.json(product, { status: 201 });
      }),
    );

    await expect(
      productsApi.createProduct({
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
      }),
    ).resolves.toEqual(product);
  });

  it('gets all products and one product by ID', async () => {
    server.use(
      http.get('http://localhost:8000/products', () =>
        HttpResponse.json([product]),
      ),
      http.get('http://localhost:8000/products/product-1', () =>
        HttpResponse.json(product),
      ),
    );

    await expect(productsApi.getAllProducts()).resolves.toEqual([product]);
    await expect(
      productsApi.getProductById(product.product_id),
    ).resolves.toEqual(product);
  });

  it('updates a product and deletes it', async () => {
    server.use(
      http.patch(
        'http://localhost:8000/products/product-1',
        async ({ request }) => {
          expect(await request.json()).toEqual({ name: 'Renamed Product' });
          return HttpResponse.json({ ...product, name: 'Renamed Product' });
        },
      ),
      http.delete(
        'http://localhost:8000/products/product-1',
        () => new HttpResponse(null, { status: 204 }),
      ),
    );

    await expect(
      productsApi.updateProduct(product.product_id, {
        name: 'Renamed Product',
      }),
    ).resolves.toEqual({ ...product, name: 'Renamed Product' });
    await expect(
      productsApi.deleteProduct(product.product_id),
    ).resolves.toBeUndefined();
  });
});
