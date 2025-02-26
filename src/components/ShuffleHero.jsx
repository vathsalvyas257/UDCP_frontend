import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      {/* Left Section: Text Content */}
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Empowering University Collaboration
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Connect, Collaborate, Succeed
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Join a unified platform designed to enhance academic engagement, streamline communication, and foster collaboration among students, faculty, and alumni.
        </p>
        <button
          className="text-white font-medium py-2 px-4 rounded transition-all hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "#B5651D", // Light brown with a mix of light red
          }}
        >
          Get Started
        </button>
      </div>

      {/* Right Section: Shuffling Grid of Images */}
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Updated with your college photos
const squareData = [
  {
    id: 1,
    src: "https://www.rguktrkv.ac.in/images/DSC_2107.jpg",
  },
  {
    id: 2,
    src: "https://images.shiksha.com/mediadata/images/1587541618php8Sjb9M.png",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546689/images_pruwjd.jpg",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740548693/images_9_ifffx2.jpg",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546690/images_1_wxoxmk.jpg",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546689/images_8_rayks9.jpg",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740548746/src_rgukt_rkvalley_logo_pn7o7a.jpg",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/images_4_trvbde.jpg",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546690/1736155179396_fzx56a.jpg",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546690/images_2_gmlpbh.jpg",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/images_6_oiutwy.jpg",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546690/images_5_plixts.jpg",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/1730613547326_hbhkcb.jpg",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/images_7_jm66ga.jpg",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dcqd5eimb/image/upload/v1740546691/1730613547326_1_d3jefl.jpg",
  },
  {
    id: 16,
    src: "https://www.rguktrkv.ac.in/images/rkvlogo.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;