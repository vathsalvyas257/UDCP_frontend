import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Adjust the threshold as needed
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Data for Bar Chart
  const barData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Student Enrollments',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [340, 358, 340, 350, 379, 360],
      },
    ],
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['Product Based Companies', 'Service Based', 'Value Based'],
    datasets: [
      {
        data: [300, 120, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const animationOptions = {
    animation: {
      duration: 2000, // Slow down the animation (in milliseconds)
      easing: 'easeInOutQuad', // Smooth easing for animation
    },
  };

  const pieOptions = {
    ...animationOptions,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.6,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#4B5563',
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1E293B',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <section
      className="py-10 ml-16 mt-12"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black-600 mb-10">
          Realtime <span className="text-blue-500">Statistics</span>
        </h2>

        {isVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <Card
              className="shadow-lg"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #e0e7ff)', // Gradient background
                borderRadius: '12px', // Rounded corners
                padding: '20px', // Padding inside the card
              }}
            >
              <CardContent>
                <Typography variant="h6" className="text-center font-semibold mb-4">
                  Student Placements in CSE Over Years
                </Typography>
                <Bar
                  data={barData}
                  options={{
                    ...animationOptions,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card
              className="shadow-lg"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #e0e7ff)', // Gradient background
                borderRadius: '12px', // Rounded corners
                padding: '20px', // Padding inside the card
              }}
            >
              <CardContent>
                <Typography variant="h6" className="text-center font-semibold mb-4">
                  Different Companies
                </Typography>
                <Pie data={pieData} options={pieOptions} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;