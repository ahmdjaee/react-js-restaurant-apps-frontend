

const useBooking = () => {
    const { user } = useStateContext()

    if (user) {
        return (
            <>
                {reservation
                    ? <BookingDetail reservation={reservation} loading={loading} onCancel={() => setShowModal(false)} />
                    : <BookingForm onCancel={() => setShowModal(false)} success={() => setShowModal(false)} />
                }
            </>
        )
    } else {
        return <CardUserNotLogin onClose={() => setShowModal(false)} />
    }
}