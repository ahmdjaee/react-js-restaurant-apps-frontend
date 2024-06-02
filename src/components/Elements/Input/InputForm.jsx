import { Input, Typography } from "@material-tailwind/react";
import propType from "prop-types";
import { useState } from "react";
import TextError from "../Text/TextError";

export default function InputForm({ title, type, placeholder, value, onChange, errorsText, children, onKeyDown, name }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
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
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                icon={type === "password" && <i className="fas fa-eye cursor-pointer" aria-hidden="true" onClick={() => {
                    setShowPassword(!showPassword)
                }}></i>}
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
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


