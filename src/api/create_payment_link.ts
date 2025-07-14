"use server";

import stripe from "./stripe";
import {
  CreatePaymentLinkParams,
} from "./types";

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  prices: StripePrice[];
}

export interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: string;
  };
}

const getExistingProducts = async (
  account_id: string
): Promise<StripeProduct[]> => {
  const products = await stripe.products.list(
    { limit: 100 },
    { stripeAccount: account_id }
  );

  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list(
        { product: product.id, limit: 100 },
        { stripeAccount: account_id }
      );

      return {
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        prices: prices.data.map((price) => ({
          id: price.id,
          unit_amount: price.unit_amount || 0,
          currency: price.currency,
          recurring: price.recurring || undefined,
        })),
      };
    })
  );

  return productsWithPrices;
};

const createPaymentLinkWithLineItems = async (
  params: CreatePaymentLinkParams,
  account_id: string
) => {
  const lineItems = await Promise.all(
    params.line_items.map(async (item) => {
      if (item.price_id) {
        // Use existing price
        return {
          price: item.price_id,
          quantity: item.quantity,
        };
      } else {
        // Create new price for this item
        const price = await stripe.prices.create(
          {
            currency: params.currency || "usd",
            product_data: {
              name: item.description,
            },
            unit_amount: item.amount || 0,
          },
          { stripeAccount: account_id }
        );
        return {
          price: price.id,
          quantity: item.quantity,
        };
      }
    })
  );

  const link = await stripe.paymentLinks.create(
    {
      line_items: lineItems,
      currency: params.currency || "usd",
    },
    {
      stripeAccount: account_id,
    }
  );
  return link;
};

export { getExistingProducts, createPaymentLinkWithLineItems };
