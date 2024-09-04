import { FormControl, FormLabel, Input, Typography } from "@mui/joy";
import propType from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextError from "../Text/TextError";

export default function InputForm({
  title,
  type,
  placeholder,
  value,
  onChange,
  errorsText,
  children,
  onKeyDown,
  name,
  defaultValue,
  required = false,
  autoComplete = "off",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Input
        required={required}
        defaultValue={defaultValue}
        name={name}
        size="lg"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
        sx={{ fontSize: "16px" }}
        endDecorator={
          type === "password" ? (
            <EyeIcon onClick={() => setShowPassword(!showPassword)} />
          ) : null
        }
        autoComplete={autoComplete}
      />
      {errorsText &&
        errorsText.map((error, index) => <TextError key={index} text={error} />)}
      {children}
    </FormControl>
  );
}

InputForm.propTypes = {
  title: propType.string,
  type: propType.string,
  placeholder: propType.string,
  value: propType.string,
  onChange: propType.func,
  errorsText: propType.array,
  children: propType.node,
};

function EyeIcon({ onClick }) {
  const [showPassword, setShowPassword] = useState(false);

  if (showPassword === true) {
    return (
      <FaEyeSlash
        onClick={() => {
          setShowPassword(!showPassword);
          onClick();
        }}
      />
    );
  } else {
    return (
      <FaEye
        onClick={() => {
          setShowPassword(!showPassword);
          onClick();
        }}
      />
    );
  }
}
