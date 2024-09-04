import { Avatar, Button, FormControl, FormLabel, Input } from "@mui/joy";
import { BsPencilFill } from "react-icons/bs";
import {
  actionUpdateProfile,
  useStateContext,
} from "@/context/AuthContextProvider";

function Profile() {
  const { user, dispatch, setUser, state } = useStateContext();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const response = await actionUpdateProfile(`/users/update`, formJson, dispatch);
    if (response) setUser(response.data);
  };
  return (
    <div class="flex flex-col items-center">
      <div class="w-full px-6 pb-8 py-4 sm:max-w-xl sm:rounded-lg">
        <h2 class="pl-6 text-2xl font-bold sm:text-xl">Your Profile</h2>

        <form onSubmit={handleUpdateProfile} class="grid max-w-2xl mx-auto mt-8">
          <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 ">
            <div className="relative">
              <Avatar sx={{ width: 200, height: 200 }} src={user?.image} />
              <BsPencilFill className="absolute text-xl text-dark bottom-0 right-2 cursor-pointer" />
            </div>
          </div>

          <div class="items-center mt-8 sm:mt-14 text-[#202142]">
            <div class="mb-2 sm:mb-6">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  key={user?.name}
                  defaultValue={user?.name}
                />
              </FormControl>
            </div>

            <div class="mb-2 sm:mb-6">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  key={user?.email}
                  defaultValue={user?.email}
                />
              </FormControl>
            </div>

            <div class="flex justify-end mt-3">
              <Button loading={state.loading} type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
