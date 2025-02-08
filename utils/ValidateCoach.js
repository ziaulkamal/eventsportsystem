export const validateCoach = (values) => {
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

  // Validasi regionalRepresentative (wajib, harus string)
  if (!values.regionalRepresentative) {
    errors.regionalRepresentative = 'Kontingen wajib diisi.';
  }

  return errors;
};