import DatePickerComponent from "@/components/DatePickerComponent";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import { findPersonByNIK, fetchPeopleByNIK, fetchPeopleByAttributes, storePerson } from "@/utils/api/person";
import { storeAthlete } from '@/utils/api/athlete'; // Import fungsi untuk menyimpan atlet
import { getProvinces, getRegencies, getDistricts, getVillages, getKontingen } from "@/utils/api/kemendagri";
import { useState, useEffect, useRef  } from "react";
import { parse, format } from "date-fns";
import Swal from 'sweetalert2';
import { validateAthlete } from '@/utils/ValidateAthlete'; // Import fungsi validasi
import { validatePerson } from "@/utils/ValidatePerson"; // Import fungsi validasi
import { v4 as uuidv4 } from 'uuid';
import { getSport } from "@/utils/api/sport";
import UploadFileComponent from "@/components/UploadFileComponent";
import { validateDocument } from "@/utils/ValidateDocument";
import { storeDocument, updateDocument } from "@/utils/api/document";
import { storeCoach } from "@/utils/api/coach";
import { validateCoach } from "@/utils/ValidateCoach";


const FormUmumInsert = ({ useForm, setActiveTab, setPeopleId, setDocumentId }) => {
    const [ktp, setKTP] = useState("");
    const [placeholderName, setPlaceholderName] = useState("");
    const [gender, setGender] = useState(null);
    const [namePerson, setNamePerson] = useState("");
    const typingTimeoutRef = useRef(null); // Menggunakan useRef untuk menyimpan timeout
    const [idK, setIdk] = useState("");
    const [birthdate, setBirthdate] = useState(null);
    const [addressData, setAddressData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedReligion, setSelectedReligion] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedRegency, setSelectedRegency] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [buttonText, setButtonText] = useState("Validasi");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [personName, setPersonName] = useState("");

    useEffect(() => {
        resetAllForms()
    }, []);
    
    const resetAllForms = () => {
        setIdk("");
        setSelectedProvince(null);
        setSelectedRegency(null);
        setSelectedDistrict(null);
        setSelectedVillage(null);
        setGender(null);
        setPlaceholderName("");
        setNamePerson("");
        setSelectedReligion(null);
        setBirthdate(null);
    }

    const handleSubmit = async () => {
        // Jika sedang dalam proses pengiriman, hentikan
        if (isSubmitting) return;
        // console.log(format(birthdate, 'yyyy-MM-dd'));
        // return;
        // Siapkan data yang akan divalidasi dan dikirim
        const formData = {
            fullName: namePerson,
            age: calculateAge(birthdate), // Hitung usia dari birthdate
            birthdate: format(birthdate, 'yyyy-MM-dd'), // Format tanggal lahir
            identityNumber: ktp,
            familyIdentityNumber: document.getElementById('familyCardNumber').value,
            gender: gender?.value,
            streetAddress: document.getElementById('streetAddress').value,
            religion: selectedReligion?.value,
            provinceId: selectedProvince?.value,
            regencieId: selectedRegency?.value,
            districtId: selectedDistrict?.value,
            villageId: selectedVillage?.value,
            phoneNumber: document.getElementById('phoneNumber').value,
            email: "", // Opsional, bisa ditambahkan jika ada
            documentId: uuidv4(),
            userId: "", // Opsional, bisa ditambahkan jika ada
        };

        // Validasi data
        const errors = validatePerson(formData);

        // Jika ada error, tampilkan pesan error
        if (Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                html: `Periksa kembali field input : <br />${Object.values(errors)
                .map((message, index) => `${index + 1}. ${message}`) // Tambahkan nomor urut
                .join('<br />')}`, // Tampilkan semua pesan error
            });
            return; // Hentikan proses jika ada error
        }

        // Jika validasi berhasil, kirim data ke API
        try {
            const response = await storePerson(formData);
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Data berhasil disimpan!',
            });
            setActiveTab('coach-form-tab');
            setIsSubmitting(true);
            setButtonText("Lanjut");
            setPeopleId(response.id)
            setDocumentId(response.documentId)
        } catch (error) {
            // throw error;
            if (error.response && error.response.data && error.response.data.error_code === 'IDENTITY_NUMBER_TAKEN') {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.response.data.message, // Tampilkan pesan error dari Laravel
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Terjadi kesalahan saat menyimpan data.',
                });
            }
        }
    };

    const handleResetForm = () => {
        Swal.fire({
            title: 'Sukses Reset Form',
            text: 'Formulir telah direset, silahkan isi kembali !',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        resetAllForms();
    }
    // Ambil data provinsi saat komponen pertama kali dimuat
    useEffect(() => {
        const fetchProvinces = async () => {
        try {
            const response = await getProvinces();
            if (response && typeof response === "object") {
            const provinceOptions = Object.keys(response).map((key) => ({
                value: response[key],
                label: key,
            }));
            setProvinces(provinceOptions);
            } else {
            console.error("Data provinsi tidak sesuai format");
            }
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
        };

        fetchProvinces();
    }, []);

    // Ambil data kabupaten setelah provinsi dipilih
    useEffect(() => {
        if (selectedProvince) {
            const fetchRegencies = async () => {
                try {
                const response = await getRegencies(selectedProvince.value);
                if (response && typeof response === "object") {
                    const regencyOptions = Object.entries(response).map(([key, value]) => ({
                        value: value,
                        label: key,
                    }));
                    setRegencies(regencyOptions);
                    // Cari kabupaten berdasarkan ID setelah data kabupaten diambil
                    const regency = regencyOptions.find(reg => reg.value === Number(addressData.city));
                    if (regency && (!selectedRegency || selectedRegency.value !== regency.value)) {
                        setSelectedRegency(regency);
                    }
                } else {
                    console.error("Data kabupaten tidak sesuai format");
                }
                } catch (error) {
                    return;
                }
            };

            fetchRegencies();
        } else {
            setRegencies([]);
            setSelectedRegency(null);
        }
    }, [selectedProvince, addressData]);

    // Ambil data kecamatan setelah kabupaten dipilih
    useEffect(() => {
    if (selectedRegency) {
        const fetchDistricts = async () => {
            try {
            const response = await getDistricts(selectedRegency.value);
            if (response && typeof response === "object") {
                const districtOptions = Object.entries(response).map(([key, value]) => ({
                    value: value,
                    label: key,
                }));
                setDistricts(districtOptions);
                // Cari kecamatan berdasarkan ID setelah data kecamatan diambil
                const district = districtOptions.find(dist => dist.value === Number(addressData.district));
                if (district && (!selectedDistrict || selectedDistrict.value !== district.value)) {
                    setSelectedDistrict(district);
                }
            } else {
                console.error("Data kecamatan tidak sesuai format");
            }
            } catch (error) {
                return;
            }
        };

        fetchDistricts();
        } else {
            setDistricts([]);
            setSelectedDistrict(null);
        }
    }, [selectedRegency, addressData]);

    // Ambil data desa setelah kecamatan dipilih
    useEffect(() => {
        if (selectedDistrict) {
        const fetchVillages = async () => {
            try {
            const response = await getVillages(selectedDistrict.value);
            if (response && typeof response === "object") {
                const villageOptions = Object.entries(response).map(([key, value]) => ({
                    value: value,
                    label: key,
                }));
                setVillages(villageOptions);
                // Cari desa berdasarkan ID setelah data desa diambil
                const village = villageOptions.find(vill => vill.value === Number(addressData.village));
                if (village && (!selectedVillage || selectedVillage.value !== village.value)) {
                    setSelectedVillage(village);
                }
            } else {
                console.error("Data desa tidak sesuai format");
            }
            } catch (error) {
                 return;
            }
        };

        fetchVillages();
        } else {
        setVillages([]);
        setSelectedVillage(null);
        }
    }, [selectedDistrict, addressData]);

  // Handler untuk perubahan provinsi
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedRegency(null); // Reset pilihan kabupaten
    setSelectedDistrict(null); // Reset pilihan kecamatan
    setSelectedVillage(null); // Reset pilihan desa
  };

  // Handler untuk perubahan kabupaten
  const handleRegencyChange = (selectedOption) => {
    setSelectedRegency(selectedOption);
    setSelectedDistrict(null); // Reset kecamatan saat kabupaten berubah
    setSelectedVillage(null); // Reset desa saat kabupaten berubah
  };

  // Handler untuk perubahan kecamatan
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedVillage(null); // Reset desa saat kecamatan berubah
  };

  // Handler untuk perubahan desa
  const handleVillageChange = (selectedOption) => {
    setSelectedVillage(selectedOption);
  };

    const handleDateChange = (date) => {
        setBirthdate(date);
    };

    const genderFromKtp = (ktp) => {
        const day = parseInt(ktp.substring(6, 8), 10);
        return day > 40 ? "female" : "male";
    };

    const birthdateFromKtp = (ktp) => {
        if (ktp.length !== 16) return null;
        const yearBirthDate = parseInt(ktp.substring(10, 12), 10);
        const thisYear = parseInt(new Date().getFullYear().toString().slice(-2));
        const pushAddYear = yearBirthDate >= thisYear ? 1900 : 2000;
        const year = yearBirthDate + pushAddYear;
        const month = parseInt(ktp.substring(8, 10), 10) - 1;
        let day = parseInt(ktp.substring(6, 8), 10);
        if (day > 40) day -= 40;
        try {
            return new Date(year, month, day);
        } catch {
            return null;
        }
    };

    const genderOptions = [
        { value: 'male', label: 'Laki-Laki' },
        { value: 'female', label: 'Perempuan' },
    ];

    const religionOptions = [
        { value: 1, label: 'Islam' },
        { value: 2, label: 'Kristen Katolik' },
        { value: 3, label: 'Kristen Protestan' },
        { value: 4, label: 'Hindu' },
        { value: 5, label: 'Buddha' },
        { value: 6, label: 'Konghucu' },
    ];

    const handleReligionChange = (selectedOption) => {
        setSelectedReligion(selectedOption);
    };

    const handleNameChange = async (e) => {
        const value = e.target.value;
        setNamePerson(value);

        // Bersihkan timeout sebelumnya jika ada
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set timeout baru
        typingTimeoutRef.current = setTimeout(() => {
        // Jalankan fungsi ketika tidak ada typing selama 2 detik
            if (value && idK && gender && birthdate) {
                attributePrefer(value, birthdate, gender.value, idK);
            }
        }, 1000);
    };

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption);
        if (namePerson && idK && gender && birthdate) {
            attributePrefer(namePerson, birthdate, gender.value, idK);
        }
    };
    useEffect(() => {
        if (addressData && provinces.length > 0) {
            const province = provinces.find(prov => prov.value === Number(addressData.province));
            if (province && (!selectedProvince || selectedProvince.value !== province.value)) {
                setSelectedProvince(province);
            }
        } else {
            resetAllForms();
        }
    }, [addressData, provinces]);

    // Fungsi untuk mengambil data alamat berdasarkan atribut
    const attributePrefer = async (fullName, birthDate, gender, idK) => {
        const formattedBirthDate = format(new Date(birthDate), 'yyyy-MM-dd');
        try {
            const attributes = {
                name: fullName,
                birthdate: formattedBirthDate,
                gender: gender,
                personIdentity: idK,
            };
            const data = await fetchPeopleByAttributes(attributes);
            setAddressData(data);
        } catch (error) {
            setSelectedProvince(null);
            setSelectedRegency(null);
            setSelectedDistrict(null);
            setSelectedVillage(null);
        }
    };

    const handleKTPChange = async (e) => {
        const value = e.target.value;
        setKTP(value);

        if (value.length === 16) {
            try {
                const result = await findPersonByNIK(value);
                if (result.code === 200) {
                    Swal.fire({
                        title: 'Data Baru',
                        text: 'NIK ini belum terdaftar. Anda dapat menambahkan data baru.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    const fetchData = await fetchPeopleByNIK(value);
                    if (fetchData.code === 200) {
                        setIdk(fetchData.data.id);
                        setPlaceholderName(fetchData.data.name);
                        const detectedGender = genderFromKtp(value);
                        setBirthdate(birthdateFromKtp(value));
                        setGender(
                            detectedGender === "male"
                                ? { value: "male", label: "Laki-Laki" }
                                : { value: "female", label: "Perempuan" }
                        );
                        setError(null);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Data Tidak Valid',
                            text: 'Format NIK Tidak Dikenal.',
                        });
                        setError("Data tidak ditemukan.");
                    }
                } else if (result.code === 201) {
                    Swal.fire({
                        title: 'Data Sudah Ada',
                        text: 'NIK ini sudah terdaftar.',
                        icon: 'info',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Terjadi Kesalahan',
                        text: 'Terjadi kesalahan saat memeriksa data.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    setError("NIK tidak valid.");
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Tidak dapat terhubung ke server',
                });
                setError("Terjadi kesalahan saat memproses NIK.");
            }
        } else {
            resetAllForms();
            setError(null);
        }
    };
    
    const calculateAge = (birthdate) => {
        if (!birthdate) return 0;
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        if (!isBirthdayPassed) age--;
        return age;
    };

    return (
        <div className="mb-4">
            <div>
                <h5 className="mb-1">Data Umum</h5>
                <p className="text-muted">Yang memiliki symbol <code>*</code> Wajib diisi.</p>
            </div>
            <div className="row">
                <InputComponent
                    id="identityNumber"
                    label="Nomor Induk Kependudukan"
                    type="number"
                    name="identityNumber"
                    value={ktp}
                    onChange={handleKTPChange}
                    required
                    readOnly={isSubmitting}
                />
                <InputComponent
                    label="IDK"
                    type="text"
                    name="idK"
                    value={idK}
                    onChange={() => {}}
                    hidden
                />
                <InputComponent
                    id="namePerson"
                    label="Nama Lengkap"
                    type="text"
                    name="fullName"
                    onChange={handleNameChange}
                    value={namePerson}
                    placeholder={placeholderName}
                    required
                    readOnly={isSubmitting}
                />
                <SelectComponent
                    label="Jenis Kelamin"
                    name="gender"
                    placeholder="Pilih"
                    options={genderOptions}
                    value={gender}
                    onChange={handleGenderChange}
                    className
                    classNamePrefix
                    isSearchable
                    required
                    readOnly={isSubmitting}
                />
                <DatePickerComponent
                    label="Tanggal Lahir"
                    selected={birthdate}
                    name="birthdate"
                    onChange={handleDateChange}
                    placeholderText="Pilih tanggal lahir"
                    required
                    readOnly={isSubmitting}
                />
                <InputComponent
                    id="familyCardNumber"
                    label="Nomor Kartu Keluarga"
                    type="number"
                    name="familyCardNumber"
                    readOnly={isSubmitting}
                />
                <InputComponent
                    id="phoneNumber"
                    label="Nomor Telepon"
                    type="number"
                    name="phoneNumber"
                    required
                    readOnly={isSubmitting}
                />
                <SelectComponent
                    label="Agama"
                    name="religion"
                    placeholder="Pilih"
                    options={religionOptions}
                    value={selectedReligion}
                    onChange={handleReligionChange}
                    className
                    classNamePrefix
                    isSearchable
                    readOnly={isSubmitting}
                    required
                />
                <InputComponent
                    id="streetAddress"
                    label="Alamat Jalan"
                    type="text"
                    name="streetAddress"
                    required
                    readOnly={isSubmitting}
                />
                <SelectComponent
                    label="Provinsi"
                    name="provinceId"
                    placeholder="Pilih"
                    options={provinces}
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    className
                    classNamePrefix
                    isSearchable
                    readOnly={isSubmitting}
                    required
                />
                <SelectComponent
                    label="Kabupaten / Kota"
                    name="regencieId"
                    placeholder="Pilih"
                    options={regencies}
                    value={selectedRegency}
                    onChange={handleRegencyChange}
                    className
                    classNamePrefix
                    isSearchable
                    required
                    readOnly={isSubmitting}
                    isDisabled={!selectedProvince}
                />
                <SelectComponent
                    label="Kecamatan"
                    name="districtId"
                    placeholder="Pilih"
                    options={districts}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className
                    classNamePrefix
                    isSearchable
                    required
                    readOnly={isSubmitting}
                    isDisabled={!selectedRegency}
                />
                <SelectComponent
                    label="Desa"
                    name="villageId"
                    placeholder="Pilih"
                    options={villages}
                    value={selectedVillage}
                    onChange={handleVillageChange}
                    className
                    classNamePrefix
                    isSearchable
                    required
                    readOnly={isSubmitting}
                    isDisabled={!selectedDistrict}
                />
            </div>
            <div className="d-flex align-items-start gap-3 mt-4">
                <button 
                    type="button" 
                    onClick={handleResetForm} 
                    className="btn btn-danger btn-label" 
                    disabled={isSubmitting}>
                    <i className="ri-refresh-line label-icon align-middle fs-lg me-2" />
                    Reset
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    disabled={isSubmitting} // Nonaktifkan tombol saat proses pengiriman
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-lg ms-2" />
                    {buttonText} {/* Tampilkan teks tombol berdasarkan state */}
                </button>
            </div>
        </div>
    );
};

const FormCoachInsert = ({ useForm, setActiveTab, peopleId }) => {
    const [kontingen, setKontingen] = useState(null);
    const [kontingenOption, setKontingenOption] = useState([]);
    const [cabor, setCabor] = useState(null);
    const [caborOption, setCaborOption] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk menangani proses submit
    
    const resetForm = () => {
        setKontingen(null);
        setCabor(null);
        document.getElementById('height').value = "";
        document.getElementById('weight').value = "";
        Swal.fire({
            title: 'Sukses Reset Form',
            text: 'Formulir telah direset, silahkan isi kembali !',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const result = await getSport(); // Ambil data dari API
                if (result && Array.isArray(result)) { // Pastikan result adalah array
                    const formattedOptions = result.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setCaborOption(formattedOptions); // Set opsi cabang olahraga
                } else {
                    console.error('Data tidak valid:', result);
                }
            } catch (err) {
                console.error('Terjadi kesalahan:', err); // Tangani error yang tidak terduga
            }
        };

        const fetchKontingen = async () => {
            try {
                const result = await getKontingen(); // Ambil data dari API

                if (result && Array.isArray(result)) { // Pastikan result adalah array
                    const formattedOptions = result.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setKontingenOption(formattedOptions); // Set opsi cabang olahraga
                }
            } catch (err) {
                console.error('Terjadi kesalahan:', err); // Tangani error yang tidak terduga
            }
        }

        fetchKontingen();
        fetchSports(); // Panggil fungsi untuk mengambil data
    }, []); // Gunakan dependency array kosong agar useEffect hanya dijalankan sekali

    const handleSportChange = (selectedOption) => {
        setCabor(selectedOption); // Set nilai yang dipilih
    };

    const handleKontingenChange = (selectedOption) => {
        setKontingen(selectedOption)
        console.log(kontingen);
        
    };

    const handleSubmit = async () => {
        if (!peopleId) {
            Swal.fire({
                icon: 'error',
                title: 'Form Umum Belum Selesai',
                text: 'Silakan selesaikan Form Umum terlebih dahulu.',
            });
            return;
        }
        // Siapkan data yang akan dikirim
        const formData = {
            peopleId: peopleId, // ID orang dari FormUmum
            sportId: cabor?.value, // ID cabang olahraga yang dipilih
            role: 'coach',
            regionalRepresentative: kontingen?.value.toString(), // ID kontingen yang dipilih
        };

        // Validasi data
        const errors = validateCoach(formData);

        // Jika ada error, tampilkan pesan error
        if (Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                html: `Periksa kembali field input : <br />${Object.values(errors)
                    .map((message, index) => `${index + 1}. ${message}`)
                    .join('<br />')}`,
            });
            return; // Hentikan proses jika ada error
        }

        // Jika validasi berhasil, kirim data ke API
        try {
            setIsSubmitting(true); // Mulai proses submit
            const response = await storeCoach(formData); // Kirim data ke API
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Data coach berhasil disimpan!',
            });
            setActiveTab('document-form-tab'); // Pindah ke tab berikutnya
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data coach.',
            });
        } 
    };

    return (
        <div>
            <div className="mb-4">
                <div>
                    <h5 className="mb-1">Data Coach</h5>
                    <p className="text-muted">Yang memiliki symbol <code>*</code> Wajib diisi.</p>
                </div>
            </div>
            <div className="row">
                <SelectComponent
                    label="Cabang Olahraga"
                    name="sportId"
                    placeholder="Pilih"
                    options={caborOption}
                    value={cabor}
                    onChange={handleSportChange}
                    className
                    classNamePrefix="your-prefix"
                    rowClassName="col-md-6"
                    isSearchable
                    readOnly={isSubmitting}
                    required
                />
                <SelectComponent
                    label="Kontingen"
                    name="regionalRepresentative"
                    placeholder="Pilih"
                    options={kontingenOption}
                    value={kontingen}
                    onChange={handleKontingenChange}
                    className
                    classNamePrefix
                    rowClassName="col-md-6"
                    isSearchable
                    readOnly={isSubmitting}
                    required
                />
            </div>
            <div className="d-flex align-items-start gap-3 mt-4">
                <button 
                    type="button" 
                    onClick={resetForm} 
                    className="btn btn-danger btn-label" 
                    disabled={isSubmitting || !peopleId}
                >
                    <i className="ri-refresh-line label-icon align-middle fs-lg me-2" />
                    Reset
                </button>
                
                {peopleId && (
                    <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    disabled={isSubmitting} // Nonaktifkan tombol saat proses submit
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-lg ms-2" />
                    {isSubmitting ? 'Lanjut' : 'Validasi'}
                </button>
                )}
                
            </div>
        </div>
    );
}

const FormDokumenInsert = ({ backTable,
    setForm, 
    useForm, 
    documentId, 
    setDocumentId,
    setActiveTab 
}) => {
    const [docsKtp, setdocsKtp] = useState(null);
    const [docsSelfieKtp, setdocsSelfieKtp] = useState(null);
    const [docsImageProfile, setdocsImageProfile] = useState(null);
    const [errors, setErrors] = useState({});
    const [reset, setReset] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const resetForm = () => {
        setdocsKtp(null);
        setdocsSelfieKtp(null);
        setdocsImageProfile(null);
        setErrors({});
        setReset(true);
        Swal.fire({
            title: 'Form Direset',
            text: 'Semua data form telah direset.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
        setTimeout(() => setReset(false), 0);
    };

    const validateRequiredFields = () => {
        const requiredFields = {
            docsKtp: 'Foto KTP',
            docsSelfieKtp: 'Foto Selfie KTP',
            docsImageProfile: 'Pas Foto',
        };

        const values = {
            docsKtp,
            docsSelfieKtp,
            docsImageProfile
        };

        const newErrors = {};

        for (const field in requiredFields) {
            if (!values[field]) {
                newErrors[field] = `${requiredFields[field]} wajib diupload.`;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (isSubmitting) {
            // window.location.reload();
            setActiveTab('general-form-tab');
            setForm = false;
            backTable();
        }
        if (!validateRequiredFields()) {
            return;
        }

        const values = {
            docsKtp,
            docsSelfieKtp,
            docsImageProfile
        };

        const validationErrors = validateDocument(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            let errorMessage = 'Harap perbaiki kesalahan pada form:\n';
            for (const field in validationErrors) {
                errorMessage += `- ${validationErrors[field]}\n`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                text: errorMessage,
            });
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        const fileErrors = {};

        if (docsKtp && docsKtp.size > maxSize) {
            fileErrors.docsKtp = 'Ukuran file Foto Profil melebihi 5MB.';
        }


        if (docsSelfieKtp && docsSelfieKtp.size > maxSize) {
            fileErrors.docsSelfieKtp = 'Ukuran file Foto Profil melebihi 5MB.';
        }

        if (docsImageProfile && docsImageProfile.size > maxSize) {
            fileErrors.docsImageProfile = 'Ukuran file Foto Profil melebihi 5MB.';
        }


        if (Object.keys(fileErrors).length > 0) {
            let errorMessage = 'Ukuran file melebihi batas maksimum (5MB):\n';
            for (const field in fileErrors) {
                errorMessage += `- ${fileErrors[field]}\n`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Ukuran File Melebihi Batas',
                text: errorMessage,
            });
            return;
        }

        const formData = new FormData();
        if (docsKtp) formData.append('docsKtp', docsKtp);
        if (docsSelfieKtp) formData.append('docsSelfieKtp', docsSelfieKtp);
        if (docsImageProfile) formData.append('docsImageProfile', docsImageProfile);
   


        try {
            let response;
            if (documentId) {
                response = await updateDocument(documentId, formData);
            } else {
                response = await storeDocument(formData);
            }

            if (response) {
                if (!isSubmitting) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses',
                        text: 'Dokumen berhasil disimpan!',
                    });
                    setIsSubmitting(true);
                    setDocumentId = null;
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.message || 'Terjadi kesalahan saat menyimpan dokumen.',
            });
        }
    };

    return (
        <div>
            <div className="mb-4">
                <div>
                    <h5 className="mb-1">Upload Dokumen</h5>
                    <p className="text-muted">
                        Yang memiliki symbol <code>*</code> Wajib diisi.
                    </p>
                </div>
            </div>

            {/* File Utama */}
            <div className="row">
                <div className="col-md-3">
                    <UploadFileComponent
                        label="Foto KTP"
                        name="docsKtp"
                        required
                        onChange={(file) => setdocsKtp(file)}
                        error={errors.docsKtp}
                        reset={reset}
                    />
                </div>
                <div className="col-md-3">
                    <UploadFileComponent
                        label="Foto Selfie + KTP"
                        name="docsSelfieKtp"
                        required
                        onChange={(file) => setdocsSelfieKtp(file)}
                        error={errors.docsSelfieKtp}
                        reset={reset}
                    />
                </div>
                <div className="col-md-3">
                    <UploadFileComponent
                        label="Pas Foto"
                        name="docsImageProfile"
                        required
                        onChange={(file) => setdocsImageProfile(file)}
                        error={errors.docsImageProfile}
                        reset={reset}
                    />
                </div>

            </div>


            {/* Tombol Reset dan Submit */}
            <div className="d-flex align-items-start gap-3 mt-4">
                <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-danger btn-label"
                    disabled={isSubmitting || !documentId}
                >
                    <i className="ri-refresh-line label-icon align-middle fs-lg me-2" />
                    Reset
                </button>
                {documentId && (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    >
                        <i className="ri-arrow-right-line label-icon align-middle fs-lg ms-2" />
                        {!isSubmitting ? 'Validasi' : 'Selesai'}
                    </button>
                )}
            </div>
        </div>
    );
};

export { FormUmumInsert, FormCoachInsert, FormDokumenInsert };