import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-4xl text-center text-white px-6">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Elevate Your Business with Innovation
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Unlock endless possibilities with cutting-edge technology and seamless solutions.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.button
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Image with Animation */}
      <motion.img
        src="https://avatars.githubusercontent.com/u/156291108?v=4"
        alt="Hero"
        className="absolute bottom-10 right-10 w-96 rounded-lg shadow-xl"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </section>
  );
};

export default Hero;
