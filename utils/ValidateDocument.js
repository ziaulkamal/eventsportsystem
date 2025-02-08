// utils/ValidateDocument.js
const validateDocument = (values) => {
  const errors = {};

  // Validasi imageProfile (opsional)
  if (values.imageProfile && !values.imageProfile.type.startsWith('image/')) {
    errors.imageProfile = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
  }

  // Validasi familyProfile (opsional)
  if (values.familyProfile && !values.familyProfile.type.startsWith('image/')) {
    errors.familyProfile = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
  }

  // Validasi ktpPhoto (opsional)
  if (values.ktpPhoto && !values.ktpPhoto.type.startsWith('image/')) {
    errors.ktpPhoto = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
  }

  // Validasi selfiePhoto (opsional)
  if (values.selfiePhoto && !values.selfiePhoto.type.startsWith('image/')) {
    errors.selfiePhoto = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
  }

  return errors;
};

// utils/ValidateDocument.js

const validateDocumentUpdate = (values, existingValues) => {
  const errors = {};

  // Validasi imageProfile (hanya jika ada perubahan)
  if (values.imageProfile && values.imageProfile !== existingValues.imageProfile) {
    if (!values.imageProfile.type.startsWith('image/')) {
      errors.imageProfile = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
    }
  }

  // Validasi familyProfile (hanya jika ada perubahan)
  if (values.familyProfile && values.familyProfile !== existingValues.familyProfile) {
    if (!values.familyProfile.type.startsWith('image/')) {
      errors.familyProfile = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
    }
  }

  // Validasi ktpPhoto (hanya jika ada perubahan)
  if (values.ktpPhoto && values.ktpPhoto !== existingValues.ktpPhoto) {
    if (!values.ktpPhoto.type.startsWith('image/')) {
      errors.ktpPhoto = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
    }
  }

  // Validasi selfiePhoto (hanya jika ada perubahan)
  if (values.selfiePhoto && values.selfiePhoto !== existingValues.selfiePhoto) {
    if (!values.selfiePhoto.type.startsWith('image/')) {
      errors.selfiePhoto = 'File harus berupa gambar (JPEG, PNG, JPG, GIF).';
    }
  }

  return errors;
};

export {validateDocument, validateDocumentUpdate};