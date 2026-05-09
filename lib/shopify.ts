/**
 * Shopify Storefront API integration point.
 *
 * The site currently reads products from `lib/products.ts` (mock layer).
 * When the Shopify store is provisioned, replace the body of these functions
 * with real Storefront GraphQL calls and re-export `getAllProducts` /
 * `getProductBySlug` from `lib/products.ts`.
 *
 * Environment variables expected at that point:
 *   SHOPIFY_STORE_DOMAIN          (e.g. prestige.myshopify.com)
 *   SHOPIFY_STOREFRONT_TOKEN      (public Storefront API token)
 *
 * Cart/checkout uses the Storefront `cart` mutations and surfaces the
 * Shopify-hosted checkout URL — no PCI data ever lives in this app.
 */

import type { Product } from './products';

export type ShopifyHandle = string;

export async function getAllProducts(): Promise<Product[]> {
  throw new Error(
    'shopify.getAllProducts not implemented — site is currently using lib/products.ts mocks.'
  );
}

export async function getProductByHandle(_handle: ShopifyHandle): Promise<Product | null> {
  void _handle;
  throw new Error(
    'shopify.getProductByHandle not implemented — site is currently using lib/products.ts mocks.'
  );
}

export async function createCart(): Promise<{ id: string; checkoutUrl: string }> {
  throw new Error('shopify.createCart not implemented.');
}

export async function addCartLine(
  _cartId: string,
  _variantId: string,
  _quantity: number
): Promise<void> {
  void _cartId;
  void _variantId;
  void _quantity;
  throw new Error('shopify.addCartLine not implemented.');
}
