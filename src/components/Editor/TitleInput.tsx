import { Input } from "@mantine/core";
import { BaseSyntheticEvent, RefObject, forwardRef } from "react";

const TitleInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value }, ref) => {
    return (
      <Input
        placeholder="Title..."
        variant="filled"
        size="lg"
        sx={() => ({ width: "100%", marginBottom: "10px" })}
        value={value}
        onChange={(evt: BaseSyntheticEvent) => onChange(evt.target.value)}
        ref={ref}
      />
    );
  }
);

type Props = {
  onChange: (value: string) => void;
  value: string;
  ref: RefObject<HTMLInputElement>;
};

TitleInput.displayName = "TitleInput";

export default TitleInput;
