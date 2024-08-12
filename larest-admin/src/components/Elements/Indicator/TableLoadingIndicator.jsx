import { CircularProgress } from '@mui/joy'
import React from 'react'

function TableLoadingIndicator({loading}) {
  return (
    <>
      {loading && (
        <div
          className="absolute top-0 left-0 w-full  h-full flex items-start justify-center bg-white bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <div className="max-h-[30rem] h-full w-full flex items-center justify-center">
            <CircularProgress />
          </div>
        </div>
      )}
    </>
  )
}

export default TableLoadingIndicator