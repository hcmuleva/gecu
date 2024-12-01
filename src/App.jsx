import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";
import { ConfigProvider } from "antd";
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import CustomErrorComponent from "./components/CustomErrorComponent";
import CustomLayout from "./components/CustomLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { authProvider } from "./config/authProvider";
import { axiosInstance } from "./config/axiosInstance";
import { resourcesConfig } from "./config/resources";
import { PageViewProvider } from "./contextprovider/PageProvider";
import Controller from "./pages/Controller";
import LoginPage from "./pages/login/LoginPage";
//import MatchesPage from "./pages/matches";
import ProfileView from "./pages/profileView";
import { RegisterPage } from "./pages/register/register";
import MyProfile from "./pages/myProfile";
import HelpPage from "./help/HelpPage";
import ProfilePage from "./pages/myProfile/HarishCard";
import UserTable from "./pages/HCMTableView";
import Header from "./pages/Header";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;
const basePath = import.meta.env.VITE_BASE_PATH || "/";

export default function App() {
  return (
    <ConfigProvider>
      <BrowserRouter basename="/gecu">
        <Refine
          dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
          authProvider={authProvider}
          routerProvider={{
            routes: {
              login: "/login",
            },
          }}
          resources={resourcesConfig}
        >
          <PageViewProvider>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/help" element={<HelpPage />} /> 
              <Route
                element={
                  <ProtectedRoute>
                    <CustomLayout>
                      <Header/>
                      <Outlet />
                    </CustomLayout>
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Controller />} />
                <Route path="/hcmcard/:id" element={<ProfilePage/>}/>
                <Route path="/myprofile/:id" element={<MyProfile />} />
                {/* <Route path="/matches" element={<MatchesPage />} /> */}
                <Route path="/profile/:id" element={<ProfileView />} />
                <Route path="/hcmcard" element={<ProfilePage/>}/>
                <Route path="/hcmtable" element={<UserTable/>}/>
              </Route>
              <Route path="*" element={<CustomErrorComponent />} />
            </Routes>
          </PageViewProvider>
        </Refine>
      </BrowserRouter>
    </ConfigProvider>
  );
}
