function Badge({  children, color }) {

  return (
    <span className={`inline-block bg-gradient-to-r ${color} rounded-full px-3 py-1 text-sm font-semibold text-white`}>
      {children}
    </span>
  )
}

export default Badge