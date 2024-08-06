function CartMenuLayout({ category, children }) {
  return (
    <div id={category} className="sm:mt-6 mx-2 sm:mx-0" key={category}>
      <p className="md:text-4xl sm:text-3xl xs:text-2xl text-lg font-semibold">{category}</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 sm:gap-5 mt-3 sm:mt-8">
        {children}
      </div>
    </div>
  )
}

export default CartMenuLayout