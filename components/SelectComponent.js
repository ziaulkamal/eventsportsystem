import React from 'react';
import Select from 'react-select';

const SelectComponent = ({
  label, // Label untuk select
  name, // Nama select
  options, // Daftar opsi (format: { value, label })
  value, // Nilai yang dipilih
  onChange, // Fungsi untuk menangani perubahan nilai
  readOnly,
  placeholder = "Pilih", // Placeholder untuk select
  required = false, // Apakah select wajib diisi (default: false)
  isSearchable = true, // Apakah select dapat dicari (default: true)
  className = "form-select", // Class tambahan untuk select
  rowClassName = "col-md-3", // Class untuk row (default: col-md-3)
  hidden = false, // Apakah div dan select disembunyikan (default: false)
  id, // ID untuk select
  classNamePrefix = "custom-select", // Prefix untuk class styling custom
}) => {
  // Custom styles untuk react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? '#ffffff' : provided.backgroundColor, // Background putih ketika disabled
      color: state.isDisabled ? '#000000' : provided.color, // Tulisan hitam ketika disabled
      opacity: state.isDisabled ? 1 : provided.opacity, // Pastikan opacity tidak berubah
      cursor: state.isDisabled ? 'not-allowed' : provided.cursor, // Ubah cursor ketika disabled
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#000000' : provided.color, // Tulisan hitam ketika disabled
    }),
  };

  return (
    <div className={`${rowClassName} ${hidden ? 'd-none' : ''}`}>
      <div className="mb-3">
        {label && (
          <label className="form-label">
            {label} {required && <code>*</code>}
          </label>
        )}
        <Select
          name={name}
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isSearchable={isSearchable}
          className={className}
          classNamePrefix={classNamePrefix}
          id={id}
          isDisabled={readOnly}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default SelectComponent;