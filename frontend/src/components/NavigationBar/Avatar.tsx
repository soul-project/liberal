import { Box } from "@mantine/core";
import { Image } from "@mantine/core";

export default function Avatar({ size, name }: Props) {
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
        src={`https://avatars.dicebear.com/api/identicon/${name}.svg`}
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
