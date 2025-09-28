import React from "react";

interface AvatarProps {
  name: string;
  size?: number;
  rounded?: boolean;
  background?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 30,
  rounded = true,
  background = "random",
  color,
  className,
  style,
}) => {
  const params = new URLSearchParams({
    name,
    size: size.toString(),
    rounded: rounded.toString(),
    background,
  });

  if (color) {
    params.append("color", color);
  }

  const avatarUrl = `https://ui-avatars.com/api/?${params.toString()}`;

  return (
    <img
      src={avatarUrl}
      alt={name}
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? "50%" : "4px",
        ...style,
      }}
    />
  );
};
