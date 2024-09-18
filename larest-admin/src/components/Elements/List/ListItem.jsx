import { Box, Chip, Option } from "@mui/joy";
import PropTypes from 'prop-types';

function getChipColor(text) {
  switch (text) {
    case "available":
      return "success";
    case "booked":
      return "warning";
    default:
      return "danger";
  }
}

function ListItemTable({ item }) {
  return (
    <Option
      disabled={item.status !== "available"}
      sx={{ fontWeight: "700" }}
      value={item.id}
      key={item.id}
      label={item.no}
    >
      <Box component="span" sx={{ display: "block" }}>
        <p className="font-semibold">{item.no}</p>
      </Box>
      <Chip
        color={getChipColor(item.status)}
        onClick={function () {}}
        variant="outlined"
        sx={{
          ml: "auto",
          fontSize: "12px",
          paddingX: "10px",
        }}
      >
        {item.status}
      </Chip>
    </Option>
  );
}

ListItemTable.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    no: PropTypes.string.isRequired,
  }).isRequired,
};

export { ListItemTable };
