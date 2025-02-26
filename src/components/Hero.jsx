import { motion } from "framer-motion";
import ShuffleHero from "./ShuffleHero";

const Hero = () => {
  // Faculty data
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. A V S S Kumara Swami Gupta",
      position: "College Director",
      photo: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740550276/download_uly3vv.jpg",
    },
    {
      id: 2,
      name: "Dr. Penugonda Ravi Kumar",
      position: "Administrative Officer (AO)",
      photo: "https://www.rguktrkv.ac.in/images/staff/CS/1171605.jpg",
    },
    {
      id: 3,
      name: "Dr. Ratna Kumari. Ch",
      position: "HOD of CSE",
      photo: "https://www.rguktrkv.ac.in/images/staff/CS/1161604.jpg",
    },
    {
      id: 4,
      name: "Mr. N. Satyanandaram",
      position: "Professor, CSE",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Mr. K Vinod Kumar",
      position: "Assistant Professor, CSE",
      photo: "https://www.rguktrkv.ac.in/images/staff/CS/2181604.jpg",
    },
    {
      id: 6,
      name: "Mr. P. Santhosh kumar",
      position: "Assitant Professor, IT",
      photo: "https://www.rguktrkv.ac.in/images/staff/CS/8181604.jpg",
    },
    {
      id: 7,
      name: "Mr. K. Abdul Munaf",
      position: " Assistant Professor,ECE",
      photo: "https://www.rguktrkv.ac.in/images/staff/EC/2181901.jpg",
    },
  ];


  return (
    <>
      {/* Hero Section */}
      <br />
      <br />
      <ShuffleHero />

      {/* About Us Section */}
      <section
        id="about"
        className="h-screen flex flex-col md:flex-row items-center text-center md:text-left px-6 md:px-12 bg-white"
      >
        <motion.img
          src="https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546690/images_5_plixts.jpg"
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
          <h2 className="text-4xl font-bold mb-6">About UniConnect Hub</h2>
          <p className="text-lg leading-relaxed">
            Our platform is designed to enhance academic engagement, streamline university communication, and foster collaboration among students, faculty, and alumni. We aim to create a unified space where knowledge sharing, networking, and career growth thrive.
          </p>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section
        id="what"
        className="h-screen flex flex-col md:flex-row-reverse items-center text-center md:text-left px-6 md:px-12 bg-gray-100"
      >
        <motion.img
          src="https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/images_6_oiutwy.jpg"
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
          <h2 className="text-4xl font-bold mb-6">What UniConnect Hub Do</h2>
          <p className="text-lg leading-relaxed">
            We provide a comprehensive platform for academic discussions, event management, club collaboration, and alumni networking. Our tools include discussion forums, real-time notifications, timetables, and career opportunities to empower students and faculty.
          </p>
        </motion.div>
      </section>

      {/* Faculty Section */}
   
      {/* Why Choose Us Section */}
      <section
  id="why"
  className="h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-12 bg-white gap-8"
>
  <motion.img
    src="https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/images_7_jm66ga.jpg"
    alt="Why Choose Us"
    className="w-full md:w-2/5 rounded-lg shadow-lg"
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
    <h2 className="text-4xl font-bold mb-6">Why UniConnect Hub?</h2>
    <p className="text-lg leading-relaxed">
      Our platform is built to simplify university life, offering tools for seamless communication, collaboration, and career growth. With features like discussion forums, event calendars, and alumni networking, we help students and faculty stay connected and productive.
    </p>
  </motion.div>
</section>


      <section id="faculty" className="py-12 bg-white overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-8">Our Esteemed Faculty</h2>
        <motion.div
          className="flex space-x-8"
          animate={{
  x: ["-100%", "0%"], // Scroll from left to right
}}

          transition={{
            duration: 20, // Adjust speed of scrolling
            repeat: Infinity, // Infinite loop
            ease: "linear", // Smooth linear animation
          }}
        >
          {/* Double the faculty array for seamless looping */}
          {[...facultyMembers, ...facultyMembers].map((faculty, index) => (
            <motion.div
              key={`${faculty.id}-${index}`}
              className="flex-shrink-0 w-48 text-center"
              whileHover={{ scale: 1.1 }} // Scale up on hover
              transition={{ duration: 0.3 }}
            >
              <img
                src={faculty.photo}
                alt={faculty.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">{faculty.name}</h3>
              <p className="text-sm text-gray-600">{faculty.position}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </>
  );
};

export default Hero;