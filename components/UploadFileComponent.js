import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const UploadFileComponent = ({
  label = "Upload Gambar",
  name = "file",
  required = false,
  accept = "image/*",
  onChange,
  previewClassName = "mt-2",
  reset = false,
  error,
  defaultPreview = null, // Menambahkan properti defaultPreview untuk menerima gambar awal
}) => {
  const [preview, setPreview] = useState(null);

  // Reset preview jika properti reset diubah
  useEffect(() => {
    if (reset) {
      setPreview(null);
    }
  }, [reset]);

  // Memuat gambar defaultPreview jika ada
  useEffect(() => {
    if (defaultPreview) {
      setPreview(defaultPreview); // Tampilkan gambar default jika ada
    }
  }, [defaultPreview]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    // Cek jika ada file yang ditolak karena ukuran atau tipe
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === 'file-too-large') {
        Swal.fire({
          icon: 'error',
          title: 'Ukuran File Melebihi Batas',
          text: `File ${rejection.file.name} melebihi ukuran maksimum 5MB.`,
        });
        return;
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        Swal.fire({
          icon: 'error',
          title: 'Tipe File Tidak Valid',
          text: `File ${rejection.file.name} harus berupa gambar (JPEG, PNG, JPG).`,
        });
        return;
      }
    }

    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${error ? '#dc3545' : '#007bff'}`,
          borderRadius: '10px',
          padding: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#f9f9f9',
          transition: 'background-color 0.3s ease',
          maxWidth: '350px'
        }}
      >
        <input {...getInputProps()} name={name} required={required} />
        {preview ? (
          <div
            style={{
              width: '260px', // Set ukuran preview tetap
              height: '320px', // Set ukuran preview tetap
              overflow: 'hidden', // Pastikan gambar yang terlalu besar tidak keluar
              borderRadius: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%', // Atur agar gambar menyesuaikan lebar container
                height: '100%', // Atur agar gambar menyesuaikan tinggi container
                objectFit: 'cover', // Gambar di-crop jika proporsi tidak sesuai
              }}
            />
          </div>
        ) : (
          <p style={{ margin: 0, color: error ? '#dc3545' : '#007bff' }}>
            {isDragActive
              ? 'Lepaskan file di sini...'
              : 'Seret dan lepas file di sini, atau klik untuk memilih file'}
          </p>
        )}
      </div>
      {error && (
        <div className="text-danger mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadFileComponent;
