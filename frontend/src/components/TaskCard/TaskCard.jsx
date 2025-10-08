import React from "react";
import { motion } from "framer-motion";
import "./TaskCard.css";

const TaskCard = ({ title, developer, status }) => {
  return (
    <motion.div
      className={`task-card ${status.toLowerCase()}`}
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h3>{title}</h3>
      <p>👨‍💻 {developer || "N/A"}</p>
      <span className="status">{status}</span>
    </motion.div>
  );
};

export default TaskCard;
