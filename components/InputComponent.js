import React from 'react';

const InputComponent = ({
  label, // Label untuk input
  type = "text", // Jenis input (default: text)
  name, // Nama input
  value, // Nilai input
  onChange, // Fungsi untuk menangani perubahan nilai
  placeholder = "", // Placeholder untuk input
  required = false, // Apakah input wajib diisi (default: false)
  readOnly = false, // Apakah input hanya bisa dibaca (default: false)
  maxLength, // Panjang maksimal input
  className = "form-control bg-white", // Class tambahan untuk input
  rowClassName = "col-md-3", // Class untuk row (default: col-md-3)
  hidden = false, // Apakah div dan input disembunyikan (default: false)
  id, // ID untuk input
}) => {
  return (
    <div className={`${rowClassName} ${hidden ? 'd-none' : ''}`}>
      <div className="mb-3">
        {label && (
          <label className="form-label">
            {label} {required && <code>*</code>}
          </label>
        )}
        <input
          autoComplete="off"
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          maxLength={maxLength}
          hidden={hidden}
          id={id}
        />
      </div>
    </div>
  );
};

export default InputComponent;