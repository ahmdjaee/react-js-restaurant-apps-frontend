import React from 'react'

function Badge({ text, color }) {

  return (
    <span className={`inline-block bg-gradient-to-r ${color} rounded-full px-3 py-1 text-sm font-semibold text-white`}>
      {text}
    </span>
  )
}


export default Badge