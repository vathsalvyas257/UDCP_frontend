import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between h-screen px-6 py-5 md:py-0 md:px-12 text-black">
      {/* Left Section: Text Content */}
      <motion.div
        className="max-w-2xl text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
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
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Right Section: Image with Tilt Effect */}
      <motion.img
        src="https://avatars.githubusercontent.com/u/156291108?v=4"
        alt="Hero"
        className="w-80 md:w-96 rounded-lg shadow-xl mt-8 md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        whileHover={{
          rotateY: 10,
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.3 },
        }}
      />
    </section>
  );
};

export default Hero;
