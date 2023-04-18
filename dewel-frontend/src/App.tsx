import React, { useState } from "react";
import { AimOutlined, CarOutlined, FormOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Locations from "./pages/locations/Locations";
import Trips from "./pages/trips/Trips";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  from,
} from "@apollo/client";
import TripRequests from "./pages/trips/TripRequests";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        locations: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache,
});

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Locations", "locations", <AimOutlined />),
  getItem("Trips", "trips", <CarOutlined />),
  getItem("Trip Requests", "trip_requests", <FormOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handlePageChange = (e) => {
    switch (e.key) {
      case "trips":
        navigate("/trips");
        break;
      case "locations":
        navigate("/locations");
        break;
      case "trip_requests":
        navigate("/trip_requests");
        break;
    }
  };
  return (
    <ApolloProvider client={client}>
      <div>
        <Layout style={{ minHeight: "100vh", width: "100%" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                background: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              onSelect={handlePageChange}
            />
          </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: "0 16px" }}>
              <Routes>
                <Route path="/locations" Component={Locations} />
                <Route path="/trips" Component={Trips} />
                <Route path="/trip_requests" Component={TripRequests} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </div>
    </ApolloProvider>
  );
};

export default App;
