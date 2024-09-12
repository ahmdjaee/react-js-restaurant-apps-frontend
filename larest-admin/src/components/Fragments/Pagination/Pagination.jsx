
function Pagination({ response, setUrl }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{response?.meta?.from}</span> to <span className="font-medium">{response?.meta?.to}</span> of <span className="font-medium">{response?.meta?.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            {response?.meta?.links.map((link, index) => (
              <a key={index} onClick={() => {
                if (link.url) {
                  setUrl(link.url)
                }
              }}
                className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium focus:z-20 
                  ${link.active
                    ? "z-10 bg-indigo-50 text-indigo-600"
                    : link.url === null
                      ? "cursor-not-allowed bg-white text-gray-500 hover:bg-gray-50"
                      : "cursor-pointer bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                dangerouslySetInnerHTML={{ __html: link.label }}>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination