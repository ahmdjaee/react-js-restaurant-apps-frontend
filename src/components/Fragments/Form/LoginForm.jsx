import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography,
} from "@material-tailwind/react";

function LoginForm(onLogin = () => { }, onSubmit) {
    return (
        <Card color="transparent" className="m-auto" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Welcome back.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Password
                    </Typography>
                    <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Checkbox
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth onClick={onLogin}>
                    Login
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account?{" "}
                    <a href="/register" className="font-medium text-gray-900">
                        Register
                    </a>
                </Typography>
            </form>
        </Card>
    )
}

export default LoginForm