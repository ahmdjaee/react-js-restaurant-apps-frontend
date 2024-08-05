import React from 'react'
import { useStateContext } from '../../context/ContextProvider'
import { Avatar, Button, FormControl, FormLabel, Input } from '@mui/joy'

function Profile() {
  const { user } = useStateContext()
  return (
    <div class="flex flex-col items-center" >
      <div class="w-full px-6 pb-8 py-4 sm:max-w-xl sm:rounded-lg">
        <h2 class="pl-6 text-2xl font-bold sm:text-xl">Your Profile</h2>

        <div class="grid max-w-2xl mx-auto mt-8">
          <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <Avatar sx={{ width: 200, height: 200 }} src={user?.image} />
          </div>

          <div class="items-center mt-8 sm:mt-14 text-[#202142]">

            <div class="mb-2 sm:mb-6">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder="Placeholder" value={user?.name} />
              </FormControl>
            </div>

            <div class="mb-2 sm:mb-6">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder="Placeholder" value={user?.email} />
              </FormControl>
            </div>

            <div class="flex justify-end mt-3">
              <Button
              >Save</Button>
            </div>

          </div>
        </div>
      </div>
    </div >

  )
}

export default Profile