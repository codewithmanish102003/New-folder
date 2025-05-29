import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const initialState = {
  paymentMethod: "card",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardholderName: "",
};

const Payments = () => {
  const location = useLocation();

  // Check if coming from ProductDetails or Cart
  const product = location.state?.product;
  const cartTotal = location.state?.cartTotal || 0;
  const cartItems = location.state?.cartItems || [];

  // Calculate total
  const total = product
    ? product.finalPrice || product.price // Use discounted price if available
    : cartTotal;

  const [form, setForm] = useState(initialState);
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Card type detection
  const detectCardType = (number) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) return type;
    }
    return "";
  };

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
      newValue = newValue.match(/.{1,4}/g)?.join(" ") || newValue;
      setCardType(detectCardType(value.replace(/\s/g, "")));
    }
    if (name === "expiryDate") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length >= 2) {
        newValue = newValue.substring(0, 2) + "/" + newValue.substring(2, 4);
      }
    }
    if (name === "cvv") {
      newValue = value.replace(/[^0-9]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Validation functions
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, "");
    return cleaned.length >= 13 && cleaned.length <= 19;
  };
  const validateExpiryDate = (date) => {
    const [month, year] = date.split("/");
    if (!month || !year) return false;
    const now = new Date();
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiry > now && parseInt(month) >= 1 && parseInt(month) <= 12;
  };
  const validateCVV = (cvv) => cvv.length >= 3 && cvv.length <= 4;

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.paymentMethod === "card") {
      if (!form.cardNumber || !validateCardNumber(form.cardNumber)) {
        setError("Please enter a valid card number");
        return;
      }
      if (!form.expiryDate || !validateExpiryDate(form.expiryDate)) {
        setError("Please enter a valid expiry date (MM/YY)");
        return;
      }
      if (!form.cvv || !validateCVV(form.cvv)) {
        setError("Please enter a valid CVV");
        return;
      }
      if (!form.cardholderName.trim()) {
        setError("Please enter the cardholder name");
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Your ${form.paymentMethod.toUpperCase()} payment is being processed securely.`);
      setForm(initialState);
      setCardType("");
    }, 2000);
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-5 w-full max-w-full lg:max-w-full animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <i className="fas fa-credit-card text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-500 text-sm">Secure and fast checkout</p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="security-badge text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center">
            <i className="fas fa-shield-alt mr-2 text-green-400"></i>
            256-bit SSL Encrypted
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-wallet mr-2 text-purple-600"></i>
              Select Payment Method
            </h2>
            <div className="space-y-3">
              <label className={`payment-option flex items-center justify-between cursor-pointer p-4 rounded-xl bg-gray-50 ${form.paymentMethod === "card" ? "selected" : ""}`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    className="custom-radio"
                    checked={form.paymentMethod === "card"}
                    onChange={() => setForm((prev) => ({ ...prev, paymentMethod: "card" }))}
                  />
                  <div className="ml-4">
                    <span className="text-gray-800 font-medium">Credit/Debit Card</span>
                    <div className="flex items-center mt-1">
                      <i className="fab fa-cc-visa text-blue-600 text-lg mr-1"></i>
                      <i className="fab fa-cc-mastercard text-red-500 text-lg mr-1"></i>
                      <i className="fab fa-cc-amex text-blue-500 text-lg mr-1"></i>
                      <i className="fab fa-cc-discover text-orange-500 text-lg"></i>
                    </div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </label>
              <label className={`payment-option flex items-center justify-between cursor-pointer p-4 rounded-xl bg-gray-50 ${form.paymentMethod === "paypal" ? "selected" : ""}`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    className="custom-radio"
                    checked={form.paymentMethod === "paypal"}
                    onChange={() => setForm((prev) => ({ ...prev, paymentMethod: "paypal" }))}
                  />
                  <div className="ml-4">
                    <span className="text-gray-800 font-medium">PayPal</span>
                    <div className="flex items-center mt-1">
                      <i className="fab fa-paypal text-blue-600 text-lg mr-2"></i>
                      <span className="text-sm text-gray-500">Pay with your PayPal account</span>
                    </div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </label>
              <label className={`payment-option flex items-center justify-between cursor-pointer p-4 rounded-xl bg-gray-50 ${form.paymentMethod === "cod" ? "selected" : ""}`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    className="custom-radio"
                    checked={form.paymentMethod === "cod"}
                    onChange={() => setForm((prev) => ({ ...prev, paymentMethod: "cod" }))}
                  />
                  <div className="ml-4">
                    <span className="text-gray-800 font-medium">Cash on Delivery</span>
                    <div className="flex items-center mt-1">
                      <i className="fas fa-money-bill-wave text-green-600 text-lg mr-2"></i>
                      <span className="text-sm text-gray-500">Pay when you receive</span>
                    </div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </label>
            </div>
          </div>
          {/* Card Details Section */}
          {form.paymentMethod === "card" && (
            <div className="space-y-4 animate-slideUp" id="cardDetails">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <i className="fas fa-lock mr-2 text-green-500"></i>
                  Card Information
                </h3>
                {/* Card Number */}
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="card-input w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={handleChange}
                    />
                    <i className="fas fa-credit-card absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <div id="cardType" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {cardType && (
                        <i className={`fab fa-cc-${cardType} text-xl`} />
                      )}
                    </div>
                  </div>
                </div>
                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        className="card-input w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        maxLength={5}
                        value={form.expiryDate}
                        onChange={handleChange}
                      />
                      <i className="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                      <i className="fas fa-question-circle text-gray-400 ml-1 cursor-help" title="3-4 digit security code on the back of your card"></i>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        className="card-input w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        maxLength={4}
                        value={form.cvv}
                        onChange={handleChange}
                      />
                      <i className="fas fa-shield-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                    </div>
                  </div>
                </div>
                {/* Cardholder Name */}
                <div className="mt-4">
                  <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      placeholder="John Doe"
                      className="card-input w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      value={form.cardholderName}
                      onChange={handleChange}
                    />
                    <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <i className="fas fa-receipt mr-2 text-purple-600"></i>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-purple-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full gradient-purple text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center space-x-2 bg-purple-500"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-lock text-sm"></i>
                <span>Pay ₹{total.toFixed(2)} Now</span>
                <i className="fas fa-arrow-right text-sm"></i>
              </>
            )}
          </button>
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-shield-alt mr-1 text-green-500"></i>
              Secure Payment
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-undo mr-1 text-blue-500"></i>
              30-Day Returns
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-truck mr-1 text-purple-500"></i>
              Fast Shipping
            </div>
          </div>
          {/* Continue Shopping Link */}
          <div className="text-center pt-6">
            <Link to="/products" className="text-sm text-gray-500 hover:text-purple-600 transition-colors flex items-center justify-center group">
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
              Continue Shopping
            </Link>
          </div>
          {/* Error/Success Messages */}
          {error && <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideUp">{error}</div>}
          {success && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center animate-fadeIn">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-500 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Processing!</h3>
                <p className="text-gray-600 mb-6">{success}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <i className="fas fa-shield-alt text-green-500"></i>
                  <span>256-bit SSL Encryption</span>
                </div>
                <button onClick={() => setSuccess("")} className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
  
};

export default Payments;