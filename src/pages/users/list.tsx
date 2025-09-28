import { List, ShowButton, useTable } from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { normalizeUrl } from "../../utils/normalizeUrl";
import { Avatar } from "../../components/avatar";

export const UserList = () => {
  const { tableProps } = useTable({});

  return (
    <List>
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          hideOnSinglePage: true,
        }}
        rowKey="id"
      >
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          title={"Avatar"}
          dataIndex="name"
          render={(name: string) => <Avatar name={name} size={32} />}
        />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          title={"Email"}
          dataIndex="email"
          render={(email: string) => (
            <a href={`mailto:${email}`} className="custom-link">
              {email}
            </a>
          )}
        />
        <Table.Column
          title={"Phone"}
          dataIndex={"phone"}
          render={(phone: string) => (
            <a href={`tel:${phone}`} className="custom-link">
              {phone}
            </a>
          )}
        />
        <Table.Column
          title={"Website"}
          dataIndex={"website"}
          render={(website: string) => {
            const url = normalizeUrl(website);

            return (
              <a
                href={url}
                className="custom-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>
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
