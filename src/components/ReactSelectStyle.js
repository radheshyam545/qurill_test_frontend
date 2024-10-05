export const customStylesSelect = {
    input: (provided) => ({
      ...provided,
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#000",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      position: 'relative',
      top: '0',
    }),
    control: (provided) => ({
      ...provided,
      boxShadow: 'none',
      backgroundColor: "#fff",
      border: "1px solid #919191",
      borderRadius: '8px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      width: "80%",
      cursor: 'pointer',
      padding: "6px 14px",
      color: "#2E2D46",
      position: 'relative',
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      zIndex: "990",
      fontSize:'15px'

  
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'grey',
      fontSize:'15px'
    }),
  
}