import React from "react";
import Input from "../input";
import Stripe from "stripe";
import { useAccountData } from "@/hooks/useAccountData";
import { CreatePaymentLinkParams, PaymentLinkLineItem } from "@/api/types";
import {
  getExistingProducts,
  StripeProduct,
  createPaymentLinkWithLineItems,
  StripePrice,
} from "@/api/create_payment_link";
import {
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Plus,
  X,
  Package,
  Copy,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
} from "lucide-react";
import QRCode from "react-qr-code";
import Modal from "../modal";
import Button from "../button";

const PaymentLink = () => {
  const [lineItems, setLineItems] = React.useState<PaymentLinkLineItem[]>([
    { description: "", quantity: 1, amount: 1000 },
  ]);
  const [existingProducts, setExistingProducts] = React.useState<
    StripeProduct[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [link, setLink] = React.useState<Stripe.Response<Stripe.PaymentLink>>();
  const [showExistingProducts, setShowExistingProducts] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [currentLineItemIndex, setCurrentLineItemIndex] = React.useState(0);

  const { account_id } = useAccountData();

  // Load existing products
  React.useEffect(() => {
    const loadProducts = async () => {
      if (account_id) {
        try {
          const products = await getExistingProducts(account_id);
          setExistingProducts(products);
        } catch (error) {
          console.error("Failed to load products:", error);
        } finally {
          setLoadingProducts(false);
        }
      }
    };
    loadProducts();
  }, [account_id]);

  React.useEffect(() => {
    console.log(lineItems);
  }, [lineItems]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, amount: 1000 },
    ]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (
    index: number,
    product: Partial<PaymentLinkLineItem>,
    price?: StripePrice
  ) => {
    setLineItems(prev => {
      const updated = [...prev];
      if (price) {
        updated[index] = { ...updated[index], ...product, price_id: price.id, amount: price.unit_amount };
      } else {
        updated[index] = { ...updated[index], ...product };
      }
      return updated;
    })

  };

  const selectExistingProduct = (
    product: StripeProduct,
    price: StripePrice,
    index: number
  ) => {
    updateLineItem(index, product, price);
    setShowExistingProducts(false);
  };

  const handleSubmit = React.useCallback(async () => {
    if (
      !loading &&
      account_id &&
      lineItems.every((item) => item.description && item.quantity > 0)
    ) {
      setLoading(true);
      try {
        const params: CreatePaymentLinkParams = {
          line_items: lineItems,
          currency: "usd",
        };
        const link = await createPaymentLinkWithLineItems(params, account_id);
        setLink(link);
      } catch (error) {
        console.error("Failed to create payment link:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [lineItems, account_id, loading]);

  const isValid = lineItems.every(
    (item) =>
      item.description.length > 0 &&
      item.quantity > 0 &&
      (item.price_id || (item.amount && item.amount > 0))
  );

  const totalAmount = lineItems.reduce((sum, item) => {
    const amount = item.price_id
      ? existingProducts
        .find((p) => p.prices.some((price) => price.id === item.price_id))
        ?.prices.find((p) => p.id === item.price_id)?.unit_amount || 0
      : item.amount || 0;
    return sum + amount * item.quantity;
  }, 0);

  const handleCopyLink = async () => {
    if (link?.url) {
      try {
        await navigator.clipboard.writeText(link.url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const handleShare = (platform: string) => {
    if (!link?.url) return;

    const shareText = "Check out this payment link!";
    const encodedUrl = encodeURIComponent(link.url);
    const encodedText = encodeURIComponent(shareText);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=Payment Link&body=${encodedText}%20${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (loadingProducts) {
    return (
      <div className="py-4">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {link ? (
        <div className="flex flex-col gap-4">
          <Button text="Open Link" icon={ExternalLink} onClick={() => window.open(link.url, "_blank")} color="primary" />
         
          
          <div className="flex justify-center max-w-md mx-auto rounded-lg overflow-hidden">
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={link.url}
            />
          </div>

          {/* Social Share Buttons */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">Share Payment Link</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {/* Copy Link Button */}
              <Button
                text={copySuccess ? "Copied!" : "Copy"}
                icon={Copy}
                onClick={handleCopyLink}
                color="secondary"
              />

              {/* WhatsApp */}
              <Button
                text="WhatsApp"
                icon={MessageCircle}
                onClick={() => handleShare("whatsapp")}
                color="secondary"
              />

              {/* Twitter/X */}
              <Button
                text="Twitter"
                icon={Twitter}
                onClick={() => handleShare("twitter")}
                color="secondary"
              />

              {/* Facebook */}
              <Button
                text="Facebook"
                icon={Facebook}
                onClick={() => handleShare("facebook")}
                color="secondary"
              />

              {/* LinkedIn */}
              <Button
                text="LinkedIn"
                icon={Linkedin}
                onClick={() => handleShare("linkedin")}
                color="secondary"
              />

              {/* Email */}
              <Button
                text="Email"
                icon={Mail}
                onClick={() => handleShare("email")}
                color="secondary"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold">Line Items</h3>
              <Button
                text="Add Item"
                icon={Plus}
                onClick={addLineItem}
                color="secondary"
              />
            </div>

            {lineItems.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-1">
                  {lineItems.length > 1 && (
                    <button
                      onClick={() => removeLineItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Description */}
                  <div className="md:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(index, { description: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Product description"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(
                          index,
                          { quantity: parseInt(e.target.value) || 1 }
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>

                  {/* Amount or Existing Product */}
                  <div className="md:col-span-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          title="Amount"
                          type="currency"
                          value={item.amount || 0}
                          setValue={(value) => {
                            updateLineItem(index, { amount: value as number });
                          }}
                          valid={!item.price_id && (item.amount || 0) > 0}
                          errorMessage="Enter a valid amount"
                          placeholder="0.00"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setCurrentLineItemIndex(index);
                          setShowExistingProducts(true);
                        }}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mt-8"
                        title="Use existing product"
                      >
                        <Package className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Show selected product info */}
                {item.price_id && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-700">
                      Using existing product price
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-bold">
                ${(totalAmount / 100).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            text={loading ? "Creating Payment Link..." : "Create Payment Link"}
            icon={loading ? RefreshCw : ChevronRight}
            onClick={isValid ? handleSubmit : undefined}
            disabled={!isValid || loading}
          />

          {/* Existing Products Modal */}
          <Modal
            open={showExistingProducts}
            setOpen={setShowExistingProducts}
            title="Select Existing Product"
          >
            {existingProducts.length === 0 ? (
              <p className="text-gray-500">No existing products found.</p>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-scroll">
                {existingProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{product.name}</h4>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                    )}
                    <div className="space-y-2">
                      {product.prices.map((price) => (
                        <button
                          key={price.id}
                          onClick={() =>
                            selectExistingProduct(
                              product,
                              price,
                              currentLineItemIndex
                            )
                          }
                          className="w-full text-left p-2 hover:bg-gray-100 rounded border"
                        >
                          <div className="flex justify-between items-center">
                            <span>
                              ${(price.unit_amount / 100).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {price.recurring
                                ? `${price.recurring.interval}`
                                : "one-time"}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default PaymentLink;
