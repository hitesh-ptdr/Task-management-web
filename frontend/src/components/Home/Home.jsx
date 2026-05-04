// Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaCheckCircle,
  FaArrowRight,
  FaTasks,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import "./Home.css";
import mobile1 from "../../assets/mobile1.png";

const Home = () => {
  return (
    <div className="home">

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <p className="tag">SMART WORKSPACE PLATFORM</p>

          <h1>
            Build Better Teams <br />
            Finish Tasks Faster <br />
            <span>Without Stress</span>
          </h1>

          <p className="hero-text">
            Powerful task management platform for Admins and Developers.
            Assign work, track progress, manage deadlines and boost team productivity.
          </p>

          <div className="hero-btns">
            <Link to="/admin/login" className="btn-primary">
              Start Free <FaArrowRight />
            </Link>

            <Link to="/developer/login" className="btn-outline">
              Developer Login
            </Link>
          </div>

          <div className="hero-points">
            <span><FaCheckCircle /> Fast Setup</span>
            <span><FaCheckCircle /> Smart Dashboard</span>
            <span><FaCheckCircle /> Team Friendly</span>
          </div>

          <div className="stats">
            <div>
              <h3>15K+</h3>
              <p>Users</p>
            </div>

            <div>
              <h3>98%</h3>
              <p>Success</p>
            </div>

            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>

        </div>

        <div className="hero-right">

          <div className="phone-box premium-screen">
            <img src={mobile1} alt="dashboard" />
          </div>

          <div className="glass-card card1">28 Tasks Completed</div>
          <div className="glass-card card2">6 Pending Tasks</div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature">
          <FaTasks className="feature-icon" />
          <h3>Task Planning</h3>
          <p>Create smart tasks with deadlines and priorities.</p>
        </div>

        <div className="feature">
          <FaUsers className="feature-icon" />
          <h3>Role Dashboard</h3>
          <p>Separate panels for Admins and Developers.</p>
        </div>

        <div className="feature">
          <FaChartLine className="feature-icon" />
          <h3>Real Analytics</h3>
          <p>Track pending, progress and completed work live.</p>
        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2>Upgrade Your Workflow Today</h2>

        <p>
          Manage projects smarter. Work faster. Grow bigger.
        </p>

        <Link to="/admin/login" className="btn-light">
          Get Started
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-grid">

          <div>
            <h2><span>Task</span>Manager</h2>
            <p>Modern task management platform for fast growing teams.</p>
          </div>

          <div>
            <h4>Product</h4>
            <p>Dashboard</p>
            <p>Analytics</p>
            <p>Tasks</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Support</p>
            <p>Contact</p>
          </div>

          <div className="footer-right">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaFacebookF /></a>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 TaskManager. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
};

export default Home;