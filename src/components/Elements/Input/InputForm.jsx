import { Input, Typography } from "@material-tailwind/react";
import propType from "prop-types";
import {useState} from "react";
import TextError from "../Text/TextError";

export default function InputForm({ title, type, placeholder, value, onChange, errorsText, children }) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
                {title}
            </Typography>
            <Input
                size="lg"
                type={showPassword ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                icon={type === "password" && <i class="fas fa-eye cursor-pointer" aria-hidden="true" onClick={() => {
                    setShowPassword(!showPassword)
                }}></i>}
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            {errorsText && <TextError text={errorsText} />}
            {children}
        </div>
    )
}

InputForm.propTypes = {
    title: propType.string,
    type: propType.string,
    placeholder: propType.string,
    value: propType.string,
    onChange: propType.func,
    errorsText: propType.string,
    children: propType.node
}


