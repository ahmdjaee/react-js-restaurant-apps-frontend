import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Stack } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import axiosClient from '../../../services/axios'
import { useUserContext } from '../../../context/admin/UserContext'
import { formatDate } from '../../../utils/helper'
import DeleteDialogModal from '../../../components/Fragments/Modal/DeleteDialogModal'
import Pagination from '../../../components/Fragments/Pagination/Pagination'

function AdminUsers() {
    const [dialog, setDialog] = useState(false)
    const [modal, setModal] = useState(false)
    const { state, dispatch } = useUserContext();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axiosClient.get('/admin/users')
                response && dispatch({ type: "SET_USER", payload: response.data })
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: error })
            }
        }

        fetchUser()
        return () => dispatch({ type: "RESET" })
    }, [])

    return (
        <>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6  mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            {/* <!-- card header --> */}
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-semibold text-dark">Users</span>
                                    <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All list of users</span>
                                </h3>
                                <div className="relative flex flex-wrap items-center my-2">
                                    <a className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"> See other projects </a>
                                </div>
                            </div>
                            {/* <!-- end card header --> */}
                            {/* <!-- card body  --> */}
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 min-w-24 text-start">NAME</th>
                                                <th className="pb-3 min-w-24 px-3 text-start">EMAIL</th>
                                                <th className="pb-3 min-w-24 px-3 text-start max-w-[20px]">ROLE</th>
                                                <th className="pb-3 min-w-24 px-3 text-end ">CREATED AT</th>
                                                <th className="pb-3 min-w-24 px-3 text-end ">UPDATED AT</th>
                                                <th className="pb-3 min-w-24 px-3 text-end ">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.loading
                                                ? <tr>
                                                    <td className='text-xl text-center' colSpan={6}  >
                                                        <CircularProgress />
                                                    </td>
                                                </tr>
                                                : state.users.map((user, index) => (
                                                    <tr key={index} className="border-b border-dashed last:border-b-0">
                                                        <td className="p-3 pl-0">
                                                            <div className="flex flex-col justify-start">
                                                                <span className="font-semibold text-light-inverse text-md/normal">{user.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-3  text-start">
                                                            <span className="font-medium text-light-inverse text-md/normal">{user.email}</span>
                                                        </td>
                                                        <td className="p-3 text-start">
                                                            <span className="text-center text-blue-600 align-baseline inline-flex py-1 mr-auto items-center font-medium text-base/none text-success bg-success-light rounded-lg">
                                                                <i className='fa-solid fa-user mr-3' />
                                                                Admin
                                                            </span>
                                                        </td>
                                                        <td className="p-3 text-end">
                                                            <span className="font-medium text-light-inverse text-md/normal">{formatDate(user.created_at)}</span>
                                                        </td>
                                                        <td className="p-3 text-end">
                                                            <span className="font-medium text-light-inverse text-md/normal">{formatDate(user.updated_at)}</span>
                                                        </td>
                                                        <td className="p-3 pr-0 flex items-center justify-end">
                                                            <IconButton onClick={() => setModal(true)}>
                                                                <i className='fa-solid fa-pencil text-zinc-500' />
                                                            </IconButton>
                                                            <IconButton onClick={() => setDialog(true)}>
                                                                <BsFillTrash3Fill className='text-red-600' />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    {/* <!-- ANCHOR card footer --> */}
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteDialogModal
                dialog={dialog}
                onCancel={() => setDialog(false)}
                onDelete={() => setDialog(false)}
                props={{
                    title: 'Delete User',
                    content: 'Are you sure you want to delete this user?',
                    delete: 'Delete',
                    cancel: 'Cancel',
                    icon: <i className="fa-solid fa-warning" />
                }} />

            <FormModalDialog
                open={modal}
                setOpen={setModal}
                props={{
                    title: 'Create User',
                    content: 'Fill in the information of the user.',
                    submit: 'Submit',
                    cancel: 'Cancel',
                }}
            />
        </>
    )
}

function FormModalDialog({ open, setOpen, onCancel, onSubmit, props }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>{props.content}</DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setOpen(false);
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="John Doe" autoFocus required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder='example@gmail.com' required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input required type="password" placeholder='********' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder="Select role">
                                <Option value="admin">Admin</Option>
                                <Option value="user">User</Option>
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button variant="solid" color="primary" onClick={onCancel}>
                                {props.submit}
                            </Button>
                            <Button variant="plain" color="neutral" onClick={onSubmit}>
                                {props.cancel}
                            </Button>
                        </DialogActions>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default AdminUsers