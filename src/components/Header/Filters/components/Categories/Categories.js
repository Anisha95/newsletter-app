import React, { useEffect, useState } from 'react';
import './Categories.css';
import { Select } from 'antd';

const Categories = ({selectedOption, selectedDateRange, dataList, newsTab, onSelectionFn, resetSelectedOption}) => {
const { Option } = Select;

 //const [selectedOption, setSelectedOption] = useState(null);

 const handleCategoryChange = (option) => {
    onSelectionFn(option);
  };

  
  return (
    <div className='categories-wrapper'>
    <Select
        value={selectedOption}
        onChange={handleCategoryChange}
        className="category-select"
        placeholder={'Select Category'}
    >
      {dataList.map((item) => {
        return(
        <Option value={item?.id}>{item?.title}</Option>
      )})}
    </Select>
    </div>
  )
}

export default Categories