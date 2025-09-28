export const normalizePhotoUrl = (url?: string) => {
    if (!url) return url;
    return url.replace("via.placeholder.com", "placehold.co");
  };
  