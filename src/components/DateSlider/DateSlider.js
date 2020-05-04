import React from "react";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";

const ValueLabelComponent = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={moment(value).format("DD/MM/YYYY")}
    >
      {children}
    </Tooltip>
  );
};

const DateSlider = ({ value, max, min, onChange }) => {
  const valuetext = (value) => {
    return `${moment(value).format("DD/MM/YYYY")}`;
  };

  const handleChange = (e, values) => {
    onChange[0](values[0]);
    onChange[1](values[1]);
  };

  return (
    <Slider
      orientation="vertical"
      value={value}
      max={max}
      min={min}
      step={86400000}
      onChange={handleChange}
      aria-labelledby="range-slider"
      valueLabelDisplay="on"
      ValueLabelComponent={ValueLabelComponent}
      getAriaValueText={valuetext}
    />
  );
};

export default DateSlider;
