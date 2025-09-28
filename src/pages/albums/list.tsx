import { List, ShowButton, useTable } from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table } from "antd";
import { Link } from "react-router";
import { Avatar } from "../../components/avatar";

export const AlbumList = () => {
  const { result, tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 20,
    },
  });

  const {
    result: { data: users },
    query: { isLoading: userIsLoading },
  } = useMany({
    resource: "users",
    ids: result?.data?.map((album) => album?.userId).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  return (
    <List title={false} wrapperProps={{ className: "pt-0" }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex={"userId"}
          title={"User"}
          render={(value) => {
            if (userIsLoading) {
              return <>Loading...</>;
            }

            const user = users?.find((user) => user.id === value);
            if (!user) return null;

            return (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Link to={`/users/${value}`} className="user-link">
                  <Avatar name={user.name} size={32} />
                  <span className="user-name">{user.name}</span>
                </Link>
              </div>
            );
          }}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
