import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between h-screen px-6 md:px-12 bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Left Section: Text Content */}
      <div className="max-w-2xl text-left text-white">
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

      {/* Right Section: Image */}
      <motion.img
        src="https://avatars.githubusercontent.com/u/156291108?v=4"
        alt="Hero"
        className="w-80 md:w-96 rounded-lg shadow-xl mt-8 md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </section>
  );
};

export default Hero;
