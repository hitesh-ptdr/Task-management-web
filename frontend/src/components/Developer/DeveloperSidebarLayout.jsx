import React from "react";
import { Outlet } from "react-router-dom";
import DeveloperSidebar from "./DeveloperSidebar";

const DeveloperSidebarLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <DeveloperSidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "25px",
          paddingTop: "100px",
        }}
        className="main-content"
      >
        <Outlet />
      </main>

      <style>{`
        @media(max-width:768px){
          .main-content{
            margin-left:0 !important;
            width:100%;
            padding:15px !important;
            padding-top:95px !important;
          }
        }
      `}</style>

    </div>
  );
};

export default DeveloperSidebarLayout;