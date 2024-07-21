import React from 'react'

function Table({ children, footer, title, description, actions }) {
  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-lg bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-lg border-stone-200 bg-light/30">
            {/* <!-- card header --> */}
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">{title}</span>
                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                  {description}
                </span>
              </h3>
              <div className="relative flex flex-wrap items-center my-2">
                {actions}
              </div>
            </div>
            {/* <!-- end card header --> */}
            {/* <!-- card body  --> */}
            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  {children}
                </table>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table