import { Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography, Card, Spin, Divider, Image, Space, Button } from "antd";
import { Link } from "react-router";
import { Avatar } from "../../components/avatar";
import { normalizePhotoUrl } from "../../utils/normalizePhotoUrl";
import { useAlbumPhotos } from "../../hooks/useAlbumPhotos";

const { Title } = Typography;

export const AlbumShow = () => {
  const { result: record, query } = useShow();
  const { isLoading } = query;

  // Lấy user của album
  const {
    result: user,
    query: { isLoading: userIsLoading },
  } = useOne({
    resource: "users",
    id: record?.userId,
    queryOptions: {
      enabled: !!record,
    },
  });

  const {
    items: displayedPhotos,
    loadMore,
    hasMore,
    isLoading: photosLoading,
    isFetchingNextPage,
  } = useAlbumPhotos(record?.id);

  return (
    <Show isLoading={isLoading} headerButtons={() => null}>
      <Card>
        {/* User Info */}
        <Card
          style={{ boxShadow: "none", border: "none" }}
          styles={{ body: { padding: 0 } }}
        >
          {userIsLoading ? (
            <Spin />
          ) : (
            <Card.Meta
              avatar={<Avatar name={user?.name || ""} size={32} />}
              title={<Link to={`/users/${user?.id}`}>{user?.name}</Link>}
              description={<a href={`mailto:${user?.email}`}>{user?.email}</a>}
            />
          )}
        </Card>

        <Divider />

        {/* Album Title */}
        <Title level={4} style={{ marginBottom: "0.5em" }}>
          {record?.title}
        </Title>

        {/* Photos Grid */}
        <Image.PreviewGroup>
          <Space wrap size={16}>
            {displayedPhotos.map((item: any) => (
              <Card
                key={item.id}
                hoverable
                style={{ width: 200, boxShadow: "none", border: "none" }}
                styles={{ body: { padding: 0 } }}
                cover={
                  <Image
                    src={normalizePhotoUrl(item.thumbnailUrl)}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    preview={{
                      src: normalizePhotoUrl(item.url),
                    }}
                  />
                }
              />
            ))}
          </Space>
        </Image.PreviewGroup>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button
              type="primary"
              onClick={() => loadMore()}
              loading={isFetchingNextPage}
            >
              See more photos
            </Button>
          </div>
        )}
      </Card>
    </Show>
  );
};
