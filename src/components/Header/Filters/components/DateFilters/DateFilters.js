import React, { useEffect, useState } from 'react';
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import { useSelector } from 'react-redux';

const DateFilters = ({
  onDateChangeFn
}) => {
  const { RangePicker } = DatePicker;

  const [dateRange, setDateRange] = useState([]);
  const newsState = useSelector((state) => state.news); 

  //reset data on source tab change
  useEffect(() => {
    setDateRange([])
  }, [newsState?.newsTab])
  

  return (
    <div className='date-range-filter'>
          <RangePicker
          format="YYYY-MM-DD"
          onChange={(date, dateString) => {
            onDateChangeFn(dateString[0], dateString[1]);
            setDateRange(date);
          }}
          value={dateRange}
        />
    </div>
  )
}

export default DateFilters