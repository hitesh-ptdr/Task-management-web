// import React from "react";
// import "../Styles/TaskCard.css";

// const TaskCard = ({ task }) => {
//   return (
//     <div className={`task-card ${task.status.toLowerCase().replace("-", "")}`}>
//       <h3>{task.title}</h3>
//       <p>{task.description}</p>
//       <p>
//         <strong>Status:</strong> {task.status}
//       </p>
//       <p>
//         <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default TaskCard;   

import React from "react";
import "../Styles/DeveloperTaskCard.css";

const DeveloperTaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description || "No description"}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
      <p><strong>Status:</strong> {task.status}</p>
    </div>
  );
};

export default DeveloperTaskCard;
    
