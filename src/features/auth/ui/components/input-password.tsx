import { EyeClosedIcon, EyeIcon, LockKeyholeIcon } from "lucide-react";

import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = React.ComponentProps<typeof InputGroupInput>;

export const InputPassword = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputGroup>
      <InputGroupInput type={showPassword ? "text" : "password"} {...props} />
      <InputGroupAddon>
        <LockKeyholeIcon />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={togglePassword} size="icon-xs">
          {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
