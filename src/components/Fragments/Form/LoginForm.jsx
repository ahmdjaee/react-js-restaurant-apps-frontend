import { Button, Input } from "@material-tailwind/react"

function LoginForm(onCancel = () => { }, onSave) {
    return (
        <div className="flex flex-col gap-5">
            <Input type="email" label="Email" />
            <Input type="password" label="Password" className="flex-grow-1" />

            <div className="flex justify-end gap-5 item-center">
                <Button
                    variant="outlined"
                    color="red"
                    onClick={onCancel}
                >Cancel</Button>
                <Button
                    color="text-primary"
                    className="bg-primary"
                    onClick={onSave}
                >Save Changes</Button>
            </div>
        </div>
    )
}

export default LoginForm