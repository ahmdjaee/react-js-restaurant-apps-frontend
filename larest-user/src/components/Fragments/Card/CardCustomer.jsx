function CardCustomer() {
    return (
        <div className="bg-white h-64 w-88 rounded-tr-2xl rounded-bl-2xl rounded-br-4xl rounded-tl-4xl text-center mt-24 cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
            <div className="relative -top-10 flex flex-col items-center justify-center px-5">
                <img className="rounded-full w-16 h-16 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                <p className="my-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusantium Lorem ipsum dolor sit amet.</p>
                <h1 className="font-semibold text-xl ">Rosaline Doe</h1>
            </div>
        </div>
    )
}

export default CardCustomer