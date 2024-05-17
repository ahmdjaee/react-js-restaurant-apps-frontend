import { Button, Input, Typography } from "@material-tailwind/react"
import Spacer from "../../Elements/Spacer/Spacer"

function LoginForm(onCancel = () => { }, onSubmit) {
    return (
        <div className="flex shadow-lg px-5 py-10 m-auto w-1/3 flex-col gap-3">
            <h1 className="text-2xl font-semibold">Login</h1>
            <div>
                <label htmlFor="email" clas>Email</label>
                <Spacer modifier="mt-2" />
                <Input type="email" label="example@mail.com" id="email" />
            </div>
            <div>
                <label htmlFor="email" >Password</label>
                <Spacer modifier="mt-2" />
                <Input type="password" label="password" />
            </div>
            <Button
                color="text-primary"
                className="bg-primary mt-5"
                onClick={onSubmit}
            >Submit
            </Button>
            <Button
                variant="outlined"
                color="orange"
                className=""
            >Register
            </Button>

        </div>
    )
}

export default LoginForm