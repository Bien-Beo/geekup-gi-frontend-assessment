import { ProfileOutlined, IdcardOutlined } from "@ant-design/icons";

export const appResources = [
  {
    name: "albums",
    list: "/albums",
    show: "albums/:id",
    meta: {
      icon: <ProfileOutlined />,
      canDelete: true,
    },
  },
  {
    name: "users",
    list: "/users",
    show: "users/:id",
    meta: {
      icon: <IdcardOutlined />,
      canDelete: true,
    },
  },
];
