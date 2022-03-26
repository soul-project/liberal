import { Box } from "@mantine/core";
import Image from "next/image";

export default function Avatar({ size, name }: Props) {
  const diceBearUrl = `https://avatars.dicebear.com/api/identicon/${name}.svg`;
  return (
    <Box
      sx={() => ({
        borderRadius: "50%",
        border: "1px solid white",
        overflow: "hidden",
        width: `${size}px`,
        height: `${size}px`,
      })}
    >
      <Image
        loader={() => diceBearUrl}
        src={diceBearUrl}
        alt="Profile picture of the author"
        width={size}
        height={size}
      />
    </Box>
  );
}

type Props = {
  size: number;
  name: string;
};
