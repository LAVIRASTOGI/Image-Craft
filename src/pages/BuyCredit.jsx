import { useContext, useState } from "react";
import { plans, assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const BuyCredit = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const { backendUrl, token, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Initialize payment with Razorpay
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        {
          planId: selectedPlan,
          amount: plans.find((plan) => plan.id === selectedPlan)?.price,
          credits: plans.find((plan) => plan.id === selectedPlan)?.credits,
        },
        { headers: { token } }
      );

      if (!data.order) {
        console.log(data);
        toast.error("Could not create payment order");
        return;
      }

      // Step 2: Configure Razorpay options
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Imagify",
        description: `${selectedPlan} Plan Purchase`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyData = await axios.post(
              backendUrl + "/api/user/verify-razor",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: selectedPlan,
              }
            );

            if (verifyData.data.success) {
              navigate("/result");
              toast.success("Payment successful");
              loadCreditsData();
            } else {
              toast.error(
                verifyData.data.message || "Payment verification failed"
              );
            }
          } catch (error) {
            toast.error(error.response?.data?.message || error.message);
          }
        },
        prefill: {
          name: "User",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      // Step 4: Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your needs and unlock the full potential
          of ImageCraft&apos;s AI-powered tools.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden ${
                selectedPlan === plan.id
                  ? "ring-4 ring-blue-500 transform scale-105"
                  : "border border-gray-200"
              } transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {plan.id === "Professional" && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div
                className={`p-8 ${
                  plan.id === "Professional" ? "pt-10" : ""
                } bg-white/90 backdrop-blur-sm h-full flex flex-col`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.id}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="ml-1 text-gray-500">/one-time</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Credits</span>
                    <span className="text-xl font-bold text-blue-600">
                      {plan.credits}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{plan.desc}</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Text to Image Generation
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-600">Background Removal</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-600">Watermark Removal</span>
                  </li>
                  {plan.id !== "Basic" && (
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-600">Priority Processing</span>
                    </li>
                  )}
                  {plan.id === "Enterprise" && (
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-600">Dedicated Support</span>
                    </li>
                  )}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`mt-auto w-full py-3 rounded-lg font-medium transition-all ${
                    selectedPlan === plan.id
                      ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPlan && (
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Payment Method
            </h3>

            <div className="space-y-4 mb-8">
              <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === "razorpay"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-3 flex items-center justify-between w-full">
                  <span className="text-gray-700 font-medium">Razorpay</span>
                  <img
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                    className="h-8"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
              <span className="text-gray-700">Selected Plan:</span>
              <span className="font-semibold text-gray-900">
                {selectedPlan}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-8">
              <span className="text-gray-700">Total Amount:</span>
              <span className="font-bold text-xl text-blue-600">
                ₹{plans.find((plan) => plan.id === selectedPlan)?.price}
              </span>
            </div>

            <button
              onClick={onSubmitHandler}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              Proceed to Payment
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By proceeding, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BuyCredit;
