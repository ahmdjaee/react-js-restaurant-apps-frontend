import { Option, Skeleton } from "@mui/joy";
import PropTypes from "prop-types";

const OptionWithState = ({ 
  loading, 
  error = false, 
  data, 
  errorLabel = "Something went wrong", 
  renderOption, 
}) => {
  if (loading) {
    return <Skeleton variant="text" sx={{ width: "100%", px: 2 }}/>;
  }

  if (error) {
    return <Option value="">{errorLabel}</Option>;
  }

  return (
    <>
      {data?.map((item) =>
        renderOption ? renderOption(item) : (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        )
      )}
    </>
  );
};

OptionWithState.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  loadingLabel: PropTypes.string,
  errorLabel: PropTypes.string,
  renderOption: PropTypes.func,
};


export default OptionWithState;


