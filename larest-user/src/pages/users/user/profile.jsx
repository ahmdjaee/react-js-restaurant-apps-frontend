import React from 'react'
import { useStateContext } from '../../../context/ContextProvider'
import { Button, FormControl, FormLabel, Input } from '@mui/joy'

function Profile() {
    const { user } = useStateContext()
    return (
        <div class="flex flex-col items-center" >
            <div class="w-full px-6 pb-8 py-4 sm:max-w-xl sm:rounded-lg">
                <h2 class="pl-6 text-2xl font-bold sm:text-xl">Your Profile</h2>

                <div class="grid max-w-2xl mx-auto mt-8">
                    <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                        <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                            src={user?.photo}
                            alt="Bordered avatar" />

                        <div class="flex flex-col space-y-5 sm:ml-8">
                            <button type="button"
                                class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Change picture
                            </button>
                            <button type="button"
                                class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Delete picture
                            </button>
                        </div>
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

                        <div class="mb-2 sm:mb-6">
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type='password' placeholder="password" />
                            </FormControl>
                        </div>

                        <div class="flex justify-end">
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