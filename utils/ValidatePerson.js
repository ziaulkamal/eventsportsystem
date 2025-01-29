export const validatePerson = (values) => {
  const errors = {};

  // Validasi fullName (wajib, harus string, maksimal 255 karakter)
  if (!values.fullName) {
    errors.fullName = 'Nama lengkap wajib diisi.';
  } else if (typeof values.fullName !== 'string') {
    errors.fullName = 'Nama lengkap harus berupa teks.';
  } else if (values.fullName.length > 255) {
    errors.fullName = 'Nama lengkap tidak boleh lebih dari 255 karakter.';
  }
  // Validasi birthdate (wajib, harus tanggal yang valid)
  if (!values.birthdate) {
    errors.birthdate = 'Tanggal lahir wajib diisi.';
  } else if (isNaN(Date.parse(values.birthdate))) {
    errors.birthdate = 'Tanggal lahir harus berupa tanggal yang valid.';
  }
  // Validasi age (wajib, harus angka positif)
  if (!values.age) {
    errors.age = 'Tanggal lahir wajib di isi';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Usia harus berupa angka positif.';
  }



  // Validasi identityNumber (wajib, harus angka, 16 karakter)
  if (!values.identityNumber) {
    errors.identityNumber = 'Nomor KTP wajib diisi.';
  } else if (!/^\d+$/.test(values.identityNumber)) {
    errors.identityNumber = 'Nomor KTP harus berupa angka.';
  } else if (values.identityNumber.length !== 16) {
    errors.identityNumber = 'Nomor KTP harus 16 karakter.';
  }

  // Validasi familyIdentityNumber (opsional, harus angka, 16 karakter)
  if (values.familyIdentityNumber) {
    if (!/^\d+$/.test(values.familyIdentityNumber)) {
      errors.familyIdentityNumber = 'Nomor KK harus berupa angka.';
    } else if (values.familyIdentityNumber.length !== 16) {
      errors.familyIdentityNumber = 'Nomor KK harus 16 karakter.';
    }
  }

  // Validasi gender (wajib, harus 'male' atau 'female')
  if (!values.gender) {
    errors.gender = 'Jenis kelamin wajib diisi.';
  } else if (!['male', 'female'].includes(values.gender)) {
    errors.gender = 'Jenis kelamin harus "male" atau "female".';
  }

  // Validasi streetAddress (wajib, harus string)
  if (!values.streetAddress) {
    errors.streetAddress = 'Alamat jalan wajib diisi.';
  } else if (typeof values.streetAddress !== 'string') {
    errors.streetAddress = 'Alamat jalan harus berupa teks.';
  }

  // Validasi religion (wajib, harus angka positif)
  if (!values.religion) {
    errors.religion = 'Agama wajib diisi.';
  } else if (isNaN(values.religion) || values.religion <= 0) {
    errors.religion = 'Agama harus berupa angka positif.';
  }

  // Validasi provinceId (wajib, harus angka positif)
  if (!values.provinceId) {
    errors.provinceId = 'Provinsi wajib diisi.';
  } else if (isNaN(values.provinceId) || values.provinceId <= 0) {
    errors.provinceId = 'Provinsi harus berupa angka positif.';
  }

  // Validasi regencieId (wajib, harus angka positif)
  if (!values.regencieId) {
    errors.regencieId = 'Kabupaten/Kota wajib diisi.';
  } else if (isNaN(values.regencieId) || values.regencieId <= 0) {
    errors.regencieId = 'Kabupaten/Kota harus berupa angka positif.';
  }

  // Validasi districtId (wajib, harus angka positif)
  if (!values.districtId) {
    errors.districtId = 'Kecamatan wajib diisi.';
  } else if (isNaN(values.districtId) || values.districtId <= 0) {
    errors.districtId = 'Kecamatan harus berupa angka positif.';
  }

  // Validasi villageId (wajib, harus angka positif)
  if (!values.villageId) {
    errors.villageId = 'Desa/Kelurahan wajib diisi.';
  } else if (isNaN(values.villageId) || values.villageId <= 0) {
    errors.villageId = 'Desa/Kelurahan harus berupa angka positif.';
  }

  // Validasi phoneNumber (wajib, harus angka, 11-13 karakter)
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Nomor telepon wajib diisi.';
  } else if (!/^\d+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Nomor telepon harus berupa angka.';
  } else if (values.phoneNumber.length < 11 || values.phoneNumber.length > 13) {
    errors.phoneNumber = 'Nomor telepon harus antara 11 hingga 13 karakter.';
  }

  // Validasi email (opsional, harus email yang valid)
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email harus berupa alamat email yang valid.';
  }

  // Validasi documentId (wajib, harus UUID)
  if (!values.documentId) {
    errors.documentId = 'Document ID wajib diisi.';
  } else if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(values.documentId)) {
    errors.documentId = 'Document ID harus berupa UUID yang valid.';
  }

  // Validasi userId (opsional, harus UUID)
  if (values.userId && !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(values.userId)) {
    errors.userId = 'User ID harus berupa UUID yang valid.';
  }

  return errors;
};