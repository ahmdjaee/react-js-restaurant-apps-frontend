function CustomMainCard({ children, header, description, actions, footer, className }) {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-lg bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border bg-clip-border rounded-lg border-stone-200 bg-light/30">
            {/* <!-- card header --> */}
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <div className="font-semibold text-xl/tight text-dark">{header}</div>
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
              <div className={`overflow-x-auto ${className} min-h-[10rem] relative`}>
                {children}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomMainCard