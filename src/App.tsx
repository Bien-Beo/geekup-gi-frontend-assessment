import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayout,
  ThemedSider,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import "./styles/index.css";
import { appTheme } from "./config/theme";
import { Space, Typography, ConfigProvider } from "antd";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes, Link } from "react-router";
import { Header } from "./components/header";
import { appResources } from "./config/resources.tsx";
import { AlbumList, AlbumShow } from "./pages/albums";
import { UserList, UserShow } from "./pages/users";

const API_URL = import.meta.env.VITE_API_URL;

const CustomTitle = () => (
  <Space align="center">
    <Link to="/">
      <img
        width="100"
        src="https://geekup.vn/Icons/geekup-logo-general.svg"
        alt="GEEK Up - PF GI"
      />
    </Link>
  </Space>
);

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <BrowserRouter>
        <RefineKbarProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(API_URL)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              resources={appResources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayout
                      Title={() => <CustomTitle />}
                      Header={() => <Header sticky />}
                      Sider={(props) => <ThemedSider {...props} fixed />}
                    >
                      <Outlet />
                    </ThemedLayout>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="albums" />}
                  />
                  <Route path="/albums">
                    <Route index element={<AlbumList />} />
                    <Route path=":id" element={<AlbumShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<UserShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </RefineKbarProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
