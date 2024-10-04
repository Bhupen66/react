import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll } from "framer-motion";

// Car Model Component
function CarModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// 3D Car Gallery Component
const CarGallery = ({ carModelUrl }) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <CarModel url={carModelUrl} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};

// Art Gallery Page Component
const ArtGallery = () => {
  // Sample data for car models and their creators
  const cars = [
    {
      modelUrl: "/path-to-car-model1.glb", // Replace with the path to your car model
      creator: "John Doe",
      title: "Ferrari",
    },
    {
      modelUrl: "/path-to-car-model2.glb", // Replace with the path to your car model
      creator: "Jane Smith",
      title: "Lamborghini",
    },
    // Add more cars here
  ];

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">3D Car Art Gallery</h1>
        <p className="text-lg mt-2">Scroll to explore cars and creators</p>
      </header>

      <motion.div
        className="flex flex-col items-center space-y-10 overflow-y-auto"
        style={{ opacity: scrollYProgress }}
      >
        {cars.map((car, index) => (
          <motion.div
            key={index}
            className="relative w-full max-w-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              transform: `translateY(${scrollYProgress * (index + 1) * 100}px)`,
            }}
          >
            {/* 3D Car Display */}
            <CarGallery carModelUrl={car.modelUrl} />

            {/* Creator Details Overlay */}
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-lg font-bold">{car.title}</h3>
              <p>Creator: {car.creator}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Main Page for the Art Gallery
const Art = () => {
  return <ArtGallery />;
};

export default Art;
