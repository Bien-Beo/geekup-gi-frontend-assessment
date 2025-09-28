import { useList, type BaseKey } from "@refinedev/core";
import { useMemo, useState } from "react";

type AlbumPhoto = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const PAGE_SIZE = 20;

export const useAlbumPhotos = (albumId?: BaseKey) => {
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);

  const { result, query } = useList<AlbumPhoto>({
    resource: "photos",
    filters: [
      {
        field: "albumId",
        operator: "eq",
        value: albumId,
      },
    ],
    pagination: {
      pageSize: 5000,
    },
    queryOptions: {
      enabled: !!albumId,
      staleTime: 1000 * 60,
    },
  });

  const allItems = (result?.data as AlbumPhoto[] | undefined) ?? [];

  const items = useMemo(
    () => allItems.slice(0, displayedCount),
    [allItems, displayedCount]
  );

  const hasMore = items.length < allItems.length;

  const loadMore = () => {
    if (hasMore) {
      setDisplayedCount((c) => c + PAGE_SIZE);
    }
  };

  return {
    items,
    loadMore,
    hasMore,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetching,
  };
};
