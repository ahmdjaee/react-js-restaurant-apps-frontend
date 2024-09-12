import PropTypes from 'prop-types';
import Loader from "./Loader";

export default function FloatProgressIndicator({ loading }) {
  if (!loading) return null;
  return (
    <div className="w-screen h-full z-[99999] fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-15">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex items-center justify-center">
            <Loader size="md" />
        </div>
      </div>
    </div>
  );
}

FloatProgressIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
};
