import { Button, Input, Typography } from "@material-tailwind/react"
import Spacer from "../../Elements/Spacer/Spacer"

function RegisterForm({ onSubmit = () => { } }) {
    return (
        <div className="flex shadow-lg px-5 py-10 m-auto w-1/3 flex-col gap-3">
            <h1 className="text-2xl font-semibold">Register</h1>
            <div>
                <label htmlFor="name" clas>Name</label>
                <Spacer modifier="mt-2" />
                <Input type="text" label="Name" id="name" />
            </div>
            <div>
                <label htmlFor="email" clas>Email</label>
                <Spacer modifier="mt-2" />
                <Input type="email" label="example@mail.com" id="email" />
            </div>
            <div>
                <label htmlFor="email" >Password</label>
                <Spacer modifier="mt-2" />
                <Input type="password" label="Password" />
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal text-xs"
                >
                    &#x26A0; Use at least 8 characters, one uppercase, one lowercase and one number.
                </Typography>
            </div>
            <div>
                <label htmlFor="email" >Confirm Password</label>
                <Spacer modifier="mt-2" />
                <Input type="password" label="Confirm your password" />
            </div>
            <Button
                color="text-primary"
                className="bg-primary"
                onClick={onSubmit}
            >Submit
            </Button>
        </div>
    )
}

export default RegisterForm