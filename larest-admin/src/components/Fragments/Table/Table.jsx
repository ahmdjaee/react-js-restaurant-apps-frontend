import React from 'react'
import CustomMainCard from '../Card/CustomMainCard'
import TableLoadingIndicator from '@/components/Elements/Indicator/TableLoadingIndicator'

function Table({ children, footer, title, description, actions, loading }) {
  return (
    <CustomMainCard header={title} description={description} actions={actions}>
      <table className="w-full my-0 align-middle text-dark border-neutral-200">
        <TableLoadingIndicator loading={loading} />
        {children}
      </table>
      {footer}
    </CustomMainCard>
  )
}

export default Table

