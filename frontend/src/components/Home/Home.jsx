// import React from 'react';
// import './Home.css';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { IoCreate } from "react-icons/io5";


// const Home = () => {
//   return (
//     <div className="home">
//       <section className="hero">
//         <motion.div
//           className="hero-content"
//           initial={{ x: '-100vw', opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ type: 'spring', stiffness: 60, duration: 1.5 }}
//         >
//           <h1>Stay Organized, Stay Ahead</h1>
//           <p>Boost your productivity with smart task tracking and deadline reminders.</p>
//           <Link to="/developer">
//             <button className="hero-btn">🚀 Get Started</button>
//           </Link>
//         </motion.div>

//         <motion.div
//           className="hero-image"
//           initial={{ x: '100vw', opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ type: 'spring', stiffness: 60, duration: 1.5, delay: 0.2 }}
//         >
//           <img src="/multitasking.png" alt="Multitasking Illustration" className="hero-illustration" />
//           <p className="quote">"I like work; it fascinates me. I can sit and look at it for hours."</p> 
//         </motion.div>
//       </section>

//       <section className="features">
//         <h2>What You Can Do</h2>   
//         <div className="feature-cards">
//           <motion.div
//             className="card"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 200 }}
//           >
//             <h3><IoCreate />Create Tasks</h3>
//             <p>Add tasks quickly and stay organized throughout the day.</p>
//           </motion.div>
//           <motion.div
//             className="card"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 200 }}
//           >
//             <h3>⏰ Set Deadlines</h3>
//             <p>Never miss a task with timely reminders and alerts.</p>
//           </motion.div>
//           <motion.div
//             className="card"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 200 }}   
//           >
//             <h3>📈 Track Progress</h3>
//             <p>See what’s done and what’s pending with visual cues.</p>   
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;    

import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCreate, IoCheckmarkDoneCircleOutline, IoTimerOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, duration: 1.5 }}
        >
          <h1>Stay Organized, Stay Ahead</h1>
          <p>Boost your productivity with smart task tracking and deadline reminders.</p>
          <div className="hero-buttons">
            <Link to="/developer"><button className="hero-btn">🚀 Get Started</button></Link>
            <Link to="#features"><button className="hero-btn secondary">Learn More</button></Link>
          </div>
        </motion.div>

        <motion.img
          src="/multitasking.png"
          alt="Multitasking Illustration"
          className="hero-illustration"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, duration: 1.5, delay: 0.2 }}
        />
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>What You Can Do</h2>
        <div className="feature-cards">
          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <IoCreate className="card-icon"/>
            <h3>Create Tasks</h3>
            <p>Add tasks quickly and stay organized throughout the day.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <IoTimerOutline className="card-icon"/>
            <h3>Set Deadlines</h3>
            <p>Never miss a task with timely reminders and alerts.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <IoCheckmarkDoneCircleOutline className="card-icon"/>
            <h3>Track Progress</h3>
            <p>See what’s done and what’s pending with visual cues.</p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="stat">
          <h3>1,200+</h3>
          <p>Tasks Completed</p>
        </div>
        <div className="stat">
          <h3>150+</h3>
          <p>Developers Onboard</p>
        </div>
        <div className="stat">
          <h3>75+</h3>
          <p>Projects Tracked</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 TaskManager. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

