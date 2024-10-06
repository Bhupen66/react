import React, { useState } from 'react'
import Navbar from '../Components/Navbarh';

const Home = () => {
  // Car data
  const cars = [
    { id: 1, name: "Car Model 1", price: 20000, image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Car Model 2", price: 30000, image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Car Model 3", price: 25000, image: "https://via.placeholder.com/300x200" },
  ];

  const [cart, setCart] = useState([]); // Cart state
  const [emiDetails, setEmiDetails] = useState({
    carPrice: 0,
    downPayment: 0,
    interestRate: 0,
    tenure: 0,
    emi: 0,
  });

  // EMI calculation function
  const calculateEMI = (price, downPayment, rate, tenure) => {
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(2);
  };

  // Add to cart
  const addToCart = (car) => {
    setCart([...cart, car]);
  };

  // Handle EMI input changes
  const handleEMIChange = (e) => {
    const { name, value } = e.target;
    setEmiDetails({ ...emiDetails, [name]: value });
  };

  // Calculate EMI on button click
  const handleCalculateEMI = () => {
    const { carPrice, downPayment, interestRate, tenure } = emiDetails;
    const emi = calculateEMI(Number(carPrice), Number(downPayment), Number(interestRate), Number(tenure));
    setEmiDetails({ ...emiDetails, emi });
  };

  return (
    <>
    <Navbar/>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-3xl font-bold text-center">Car & Parts Marketplace</h1>
          <p className="text-center mt-2">Find your dream car or essential parts here!</p>
        </header>

        {/* Main Section */}
        <main className="container mx-auto mt-8">
          {/* Cars Section */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-6">Buy Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="bg-white shadow-md rounded-md p-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-4">{car.name}</h3>
                  <p className="text-gray-600 mt-2">Price: ${car.price}</p>
                  <button
                    onClick={() => addToCart(car)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* EMI Calculator Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">EMI Calculator</h2>
            <div className="bg-white shadow-md rounded-md p-4 max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700">Car Price ($):</label>
                <input
                  type="number"
                  name="carPrice"
                  value={emiDetails.carPrice}
                  onChange={handleEMIChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Down Payment ($):</label>
                <input
                  type="number"
                  name="downPayment"
                  value={emiDetails.downPayment}
                  onChange={handleEMIChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Interest Rate (%):</label>
                <input
                  type="number"
                  name="interestRate"
                  value={emiDetails.interestRate}
                  onChange={handleEMIChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Loan Tenure (Months):</label>
                <input
                  type="number"
                  name="tenure"
                  value={emiDetails.tenure}
                  onChange={handleEMIChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleCalculateEMI}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Calculate EMI
              </button>
              {emiDetails.emi > 0 && (
                <p className="mt-4 text-xl font-bold">EMI: ${emiDetails.emi}</p>
              )}
            </div>
          </section>

          {/* Cart Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Cart</h2>
            {cart.length > 0 ? (
              <div className="bg-white shadow-md rounded-md p-4 max-w-md mx-auto">
                <ul>
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between border-b py-2">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xl font-bold mt-4">
                  Total: ${cart.reduce((acc, item) => acc + item.price, 0)}
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 p-4 text-white mt-12">
          <p className="text-center">© 2024 Car & Parts Marketplace. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;