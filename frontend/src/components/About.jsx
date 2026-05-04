import React from "react";
import { Link } from "react-router-dom";
import "./Styles/About.css";

import aboutHero from "../assets/about-hero.png";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";

const About = () => {
  return (
    <div className="about">

      {/* TOP BAR */}
      <div className="about-topbar">
        <div className="logo">
          <span>Task</span>Manager
        </div>

        <Link to="/" className="back-home">
          ← Home
        </Link>
      </div>

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">
          <h1>
            Smart Work <br />
            Better Teams <br />
            <span>TaskManager</span>
          </h1>

          <p>
            Organize tasks, track progress and manage your team
            with a simple and powerful system.
          </p>

          <div className="hero-btns">
            <Link to="/admin/login" className="btn-main">
              Get Started
            </Link>

            <Link to="/" className="btn-light">
              Explore
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img src={aboutHero} alt="" />
        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-box">
          <div className="icon">🚀</div>
          <h3>Fast Workflow</h3>
          <p>Manage tasks quickly and efficiently</p>
        </div>

        <div className="feature-box">
          <div className="icon">📊</div>
          <h3>Track Progress</h3>
          <p>Monitor team performance easily</p>
        </div>

        <div className="feature-box">
          <div className="icon">⚡</div>
          <h3>Boost Productivity</h3>
          <p>Deliver work faster with clarity</p>
        </div>

      </section>

      {/* TEAM */}
      <section className="team">

        <h2>Our Team</h2>

        <div className="team-grid">

          <div className="team-card">
            <img src={team1} />
            <h3>Rahul</h3>
            <p>Frontend Dev</p>
          </div>

          <div className="team-card">
            <img src={team2} />
            <h3>priya</h3>
            <p>UI/UX Designer</p>
          </div>

          <div className="team-card">
            <img src={team3} />
            <h3>pawan</h3>
            <p>Backend Developer</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Now 🚀</h2>
        <p>Join thousands of teams using TaskManager</p>

        <Link to="/admin/login" className="cta-btn">
          Get Started
        </Link>
      </section>

    </div>
  );
};

export default About;