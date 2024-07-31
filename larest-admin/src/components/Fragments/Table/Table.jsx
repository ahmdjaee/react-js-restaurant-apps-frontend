import React from 'react'
import CustomMainCard from '../Card/CustomMainCard'

function Table({ children, footer, title, description, actions }) {
  return (
    <CustomMainCard header={title} description={description} actions={actions}>
      <table className="w-full my-0 align-middle text-dark border-neutral-200">
        {children}
      </table>
      {footer}
    </CustomMainCard>
  )
}

export default Table

