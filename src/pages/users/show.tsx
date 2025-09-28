import { Show, ShowButton, useTable } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Table, Space, Spin, Divider, Card, Typography } from "antd";
import { Avatar } from "../../components/avatar";

const { Title } = Typography;

export const UserShow = () => {
  const { result: user, query } = useShow();
  const { isLoading } = query;

  const { tableProps } = useTable({
    resource: "albums",
    filters: {
      permanent: [
        {
          field: "userId",
          operator: "eq",
          value: user?.id,
        },
      ],
    },
    queryOptions: {
      enabled: !!user,
    },
  });

  return (
    <Show isLoading={isLoading} headerButtons={() => null}>
      <Card>
        {/* User Info */}
        <Card
          style={{ boxShadow: "none", border: "none" }}
          styles={{ body: { padding: 0 } }}
        >
          {isLoading ? (
            <Spin />
          ) : (
            <Card.Meta
              avatar={<Avatar name={user?.name || ""} size={32} />}
              title={user?.name}
              description={<a href={`mailto:${user?.email}`}>{user?.email}</a>}
            />
          )}
        </Card>

        <Divider />

        <Title level={4}>Albums</Title>

        {/* List Albums */}
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            hideOnSinglePage: true,
          }}
          rowKey="id"
        >
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column
            title="Actions"
            render={(_, record) => (
              <Space>
                <ShowButton
                  size="small"
                  recordItemId={record.id}
                  resource="albums"
                />
              </Space>
            )}
          />
        </Table>
      </Card>
    </Show>
  );
};
