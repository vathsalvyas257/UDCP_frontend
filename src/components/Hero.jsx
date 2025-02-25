import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>

<section className="relative flex flex-col md:flex-row items-center justify-between h-screen px-6 py-5 md:py-0 md:px-12 text-black">
        {/* Left Section: Text Content */}
        <motion.div
          className="max-w-2xl text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Elevate Your Business with Innovation
          </motion.h1>
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Unlock endless possibilities with cutting-edge technology and seamless solutions.
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </motion.div>

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


      {/* About Us Section */}
      <section  id="about" className="h-screen flex flex-col md:flex-row items-center text-center md:text-left px-6 md:px-12 bg-gray-100">
        <motion.img
          src="https://st2.depositphotos.com/3591429/10566/i/450/depositphotos_105666254-stock-photo-business-people-at-meeting-and.jpg"
          alt="About Us"
          className="w-full md:w-2/5 rounded-lg shadow-lg mb-6 md:mb-0 m-2"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="w-full md:w-3/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg leading-relaxed">
            We provide innovative solutions that revolutionize industries, helping businesses grow and adapt in the digital age. Our dedicated team works with cutting-edge technologies to create future-proof solutions that drive growth, efficiency, and long-term success.
          </p>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section id="what" className="h-screen flex flex-col md:flex-row-reverse items-center text-center md:text-left px-6 md:px-12 bg-white">
        <motion.img
          src="https://st2.depositphotos.com/1092019/9700/i/450/depositphotos_97006952-stock-illustration-what-we-do-on-white.jpg"
          alt="What We Do"
          className="w-full md:w-2/5 rounded-lg shadow-lg mb-6 md:mb-0 m-2"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="w-full md:w-3/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">What We Do</h2>
          <p className="text-lg leading-relaxed">
            Our team specializes in cutting-edge technology, automation, and AI-driven solutions that streamline business operations. We build scalable, efficient systems tailored to your needs, ensuring seamless user experiences and maximum productivity.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="h-screen flex flex-col md:flex-row items-center text-center md:text-left px-6 md:px-12 bg-gray-100">
        <motion.img
          src="https://www.shutterstock.com/image-photo/why-choose-us-businessman-holding-600nw-1431803342.jpg"
          alt="Why Choose Us"
          className="w-full md:w-2/5 rounded-lg shadow-lg mb-6 md:mb-0 m-2"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="w-full md:w-3/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-lg leading-relaxed">
            We prioritize innovation, efficiency, and customer satisfaction to help businesses thrive in a competitive market. Our solutions are designed to maximize impact, ensuring that you stay ahead in an ever-evolving digital landscape. With our expert team, tailored strategies, and relentless drive for excellence, we help you achieve sustainable success.
          </p>
        </motion.div>
      </section>

    </>
  );
};

export default Hero;
