import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminSidebarLayout = () => {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        html,body,#root{
          width:100%;
          min-height:100%;
        }

        .dash-layout{
          display:flex;
          min-height:100vh;
          background:#f8fafc;
          margin:0;
          padding:0;
        }

        .dash-main{
          margin:0;
          flex:1;
          margin-left:255px;
          width:calc(100% - 255px);
          min-height:100vh;
          padding:12px;
          padding-top:12px;
        }

        @media(max-width:768px){
          .dash-main{
            margin-left:0;
            width:100%;
            padding:72px 10px 10px;
          }
        }
      `}</style>

      <div className="dash-layout">
        <AdminSidebar />
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminSidebarLayout;