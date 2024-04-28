  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      color: '#333',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      color: state.isSelected ? '#fff' : '#333',
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f4f4f4' : '#fff',
      padding: '12px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#e0e0e0',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#777',
    }),
  };