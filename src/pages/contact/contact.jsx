import { Button, FormControl, FormLabel, Input, Textarea, Typography } from '@mui/joy'
import WhatsAppButton from '../../assets/ChatOnWhatsAppButton/WhatsAppButtonGreenLarge.svg'
import ContactBg from '/assets/images/contact-bg.jpg'
import Text from '../../components/Elements/Text/Text'
function Contact() {
    return (
        <div className="container flex-grow grid grid-cols-2 pt-5 pb-10 shadow-lg">
            <div className="flex flex-col bg-center bg-cover bg-no-repeat text-white p-5" style={{ backgroundImage: `url(${ContactBg})` }}>
                <h1 className="text-5xl font-semibold">Contact Us</h1>
                <p className="text-base mt-10 flex-grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a className='w-fit mx-auto' aria-label="Chat on WhatsApp" target='_blank' href="https://wa.me/+62895331621985?text=Hello, I'm interested and want to ask about the products you sell."><img alt="Chat on WhatsApp" src={WhatsAppButton} /></a>
            </div>
            <form className="flex flex-col gap-4 justify-center p-8">
                
                <Typography level='title-lg' sx={{mb: 2}} >By pressing the send button, your feedback or message will be automatically sent to our email.</Typography>
                <FormControl>
                    <FormLabel>Input your name</FormLabel>
                    <Input type='text' placeholder='Name'></Input>
                </FormControl>
                <FormControl>
                    <FormLabel>Input your email</FormLabel>
                    <Input type='email' placeholder='Email'></Input>
                </FormControl>
                <FormControl>
                    <FormLabel>Feed back or message</FormLabel>
                    <Textarea minRows={5} placeholder='Message'></Textarea>
                </FormControl>
                <Button color='dark'>Send</Button>
            </form>
        </div>
    )
}

export default Contact