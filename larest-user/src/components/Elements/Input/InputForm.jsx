// import { Input, Typography } from "@material-tailwind/react";
import propType from "prop-types";
import { useState } from "react";
import TextError from "../Text/TextError";
import { Input, Typography } from "@mui/joy";

export default function InputForm({ title, type, placeholder, value, onChange, errorsText, children, onKeyDown, name }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <Typography level="title-md" sx={{mb: 2}} color="blue-gray">
                {title}
            </Typography>
            <Input
                name={name}
                size="lg"
                type={showPassword ? "text" : type}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                value={value}
                onChange={onChange}
                sx={{fontSize: "16px"}}
                endDecorator={type === "password" && <i className="fas fa-eye cursor-pointer" aria-hidden="true" onClick={() => {
                    setShowPassword(!showPassword)
                }}></i>}
            />
            {errorsText && errorsText.map((error, index) => <TextError key={index} text={error} />)}
            {children}
        </div >
    )
}

InputForm.propTypes = {
    title: propType.string,
    type: propType.string,
    placeholder: propType.string,
    value: propType.string,
    onChange: propType.func,
    errorsText: propType.array,
    children: propType.node
}


