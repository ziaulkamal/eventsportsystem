// utils/ValidateDocument.js
export const validateDocument = (values) => {
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