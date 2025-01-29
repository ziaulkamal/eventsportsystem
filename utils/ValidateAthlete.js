export const validateAthlete = (values) => {
  const errors = {};

  // Validasi peopleId (wajib, harus UUID)
  if (!values.peopleId) {
    errors.peopleId = 'ID orang wajib diisi.';
  } else if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(values.peopleId)) {
    errors.peopleId = 'ID orang harus berupa UUID yang valid.';
  }

  // Validasi sportId (wajib, harus UUID)
  if (!values.sportId) {
    errors.sportId = 'Cabang Olahraga wajib dipilih.';
  } else if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(values.sportId)) {
    errors.sportId = 'ID olahraga harus berupa UUID yang valid.';
  }

  // Validasi sportClassId (opsional, harus UUID)
  if (values.sportClassId && !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(values.sportClassId)) {
    errors.sportClassId = 'ID kelas olahraga harus berupa UUID yang valid.';
  }

  // Validasi height (wajib, harus angka dengan maksimal 2 digit desimal)
  if (!values.height) {
    errors.height = 'Tinggi badan wajib diisi.';
  } else if (isNaN(values.height) || values.height <= 0) {
    errors.height = 'Tinggi badan harus berupa angka positif.';
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.height)) {
    errors.height = 'Tinggi badan maksimal 2 digit desimal.';
  }

  // Validasi weight (wajib, harus angka dengan maksimal 2 digit desimal)
  if (!values.weight) {
    errors.weight = 'Berat badan wajib diisi.';
  } else if (isNaN(values.weight) || values.weight <= 0) {
    errors.weight = 'Berat badan harus berupa angka positif.';
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.weight)) {
    errors.weight = 'Berat badan maksimal 2 digit desimal.';
  }

  // Validasi achievements (opsional, harus string)
  if (values.achievements && typeof values.achievements !== 'string') {
    errors.achievements = 'Prestasi harus berupa teks.';
  }

  // Validasi regionalRepresentative (wajib, harus string)
  if (!values.regionalRepresentative) {
    errors.regionalRepresentative = 'Kontingen wajib diisi.';
  }

  return errors;
};