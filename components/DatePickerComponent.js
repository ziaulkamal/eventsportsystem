import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
        label, // Label untuk date picker
        selected, // Tanggal yang dipilih
        onChange, // Fungsi untuk menangani perubahan tanggal
        placeholderText = "Pilih tanggal", // Placeholder untuk date picker
        required = false, // Apakah date picker wajib diisi (default: false)
        readOnly = false, // Apakah date picker hanya bisa dibaca (default: false)
        className = "form-control bg-white", // Class tambahan untuk date picker
        rowClassName = "col-md-3", // Class untuk row (default: col-md-3)
        hidden = false, // Apakah div dan date picker disembunyikan (default: false)
        id, // ID untuk date picker
        minDate, // Tanggal minimal yang bisa dipilih
        maxDate, // Tanggal maksimal yang bisa dipilih
    }) => {
    return (
        <div className={`${rowClassName} ${hidden ? 'd-none' : ''}`}>
        <div className="mb-3">
            {label && (
            <label className="form-label">
                {label} {required && <code>*</code>}
            </label>
            )}
            <DatePicker
            selected={selected}
            onChange={onChange}
            placeholderText={placeholderText}
            className={className}
            readOnly={readOnly}
            id={id}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd-MM-yyyy"
            showPopperArrow={false}
            />
        </div>
        </div>
    );
};

export default DatePickerComponent;