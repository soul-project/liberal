import { Input } from "@mantine/core";
import { BaseSyntheticEvent } from "react";

export default function TitleInput({ onChange, value }: Props) {
  return (
    <Input
      placeholder="Title..."
      size="lg"
      sx={() => ({ width: "100%", marginBottom: "10px" })}
      value={value}
      onChange={(evt: BaseSyntheticEvent) => onChange(evt.target.value)}
    />
  );
}

type Props = {
  onChange: (value: string) => void;
  value: string;
};
