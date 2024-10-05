import React, { useState } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const { Handle } = Slider;

const PercentageTooltip = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
    //   overlay={`${value}%`}
      visible={dragging}
    //   placement="top"
      key={index}
    >
      {/* <div {...restProps} /> */}
    </Tooltip>
  );
};

const OneSidedRangeBar = ({value=0, setValue}) => {
//   const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    // setRange(newValue)
    setValue(newValue);
  };

  const formatPercentage = (val) => `${val}%`;

  return (
    <div style={{ margin: '20px' }}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        // handle={PercentageTooltip}
        // marks={{ 0: formatPercentage(0), 100: formatPercentage(100) }}
        // step={1}
        railStyle={{ backgroundColor: '#d3d3d3', height: 4 }}
        trackStyle={{ backgroundColor: '#ffd900', height: 6 }}
        handleStyle={{ borderColor: '#ffd900', hover:'none' }}
      />
      <p>Selected Value: {value}%</p>
    </div>
  );
};

export default OneSidedRangeBar;
