import Loader from "./Loader";

function TableLoadingIndicator({ loading }) {
  return (
    <>
      {loading && (
        <div
          className="absolute top-0 left-0 w-full  h-full flex items-start justify-center bg-white bg-opacity-55"
          style={{ zIndex: 10 }}
        >
          <div className="max-h-[30rem] h-full w-full flex items-center justify-center">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
}

export default TableLoadingIndicator;
