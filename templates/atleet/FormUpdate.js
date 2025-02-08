import DatePickerComponent from "@/components/DatePickerComponent";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import { findPersonByNIK, fetchPeopleByNIK, fetchPeopleByAttributes, storePerson, getPerson, updatePerson, getPeople } from "@/utils/api/person";
import { getAthletePeople, storeAthlete, updateAthlete } from '@/utils/api/athlete'; // Import fungsi untuk menyimpan atlet
import { getProvinces, getRegencies, getDistricts, getVillages, getKontingen } from "@/utils/api/kemendagri";
import { useState, useEffect, useRef  } from "react";
import { parse, format } from "date-fns";
import Swal from 'sweetalert2';
import { validateAthlete } from '@/utils/ValidateAthlete'; // Import fungsi validasi
import { validatePerson } from "@/utils/ValidatePerson"; // Import fungsi validasi
import { v4 as uuidv4 } from 'uuid';
import { getSport } from "@/utils/api/sport";
import UploadFileComponent from "@/components/UploadFileComponent";
import { validateDocument, validateDocumentUpdate } from "@/utils/ValidateDocument";
import { getDocument, getDocuments, patchDocument, storeDocument, updateDocument } from "@/utils/api/document";
import Preloader from "@/components/Preloader";
import LoadingComponent from "@/components/LoadingComponent";
// import { parseDate } from "react-datepicker/dist/date_utils";


const FormUmumUpdate = ({ setActiveTab, peopleId, setAtleetRefetchKey  }) => {
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
    const [buttonText, setButtonText] = useState("Perbaharui");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [personName, setPersonName] = useState("");
    const [familyCardNumber, setFamilyCardNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState("");
    const [idDocument, setIdDocument] = useState("");
    const [loadStateData, setLoadStateData] = useState(true);
    const [loadingInput, setLoadingInput] = useState(true);
    const [isModal, setIsModal] = useState(false);

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

    const handleLoadDataById = (data, idKs) => {
        const parsedDates = parse(data.birthdate, "dd-MM-yyyy", new Date());
        setBirthdate(parsedDates);
        setKTP(data.identityNumber)
        setPersonName(data.fullName)
        setGender(
            data.gender === "male"
                ? { value: "male", label: "Laki-Laki" }
                : { value: "female", label: "Perempuan" }
        );
        // setBirthdate(format(parsedDate, "dd-MM-yyyy"));
        setFamilyCardNumber(data.familyCardNumber);
        const parseReligion = religionOptions.find(option => option.value === data.religion);
        handleReligionChange(parseReligion);
        setPhoneNumber(data.phoneNumber)
        setStreetAddress(data.streetAddress);
        handleProvinceChange(data.provinceId);
        setSelectedRegency(data.regencieId);
        setSelectedDistrict(data.districtId);
        setSelectedVillage(data.villageId);
        attributePrefer(data.fullName, format(parsedDates, "yyyy-MM-dd"), data.gender, idKs);
        setTimeout(async () => {
            setLoadingInput(false)
        }, 6000);
        
    }

    const handleFamilyIdentityChange = (e) => {
        setFamilyCardNumber(e.target.value);
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value); // Update state when input changes
    };

    const handleStreetAddressChange = (e) => {
        setStreetAddress(e.target.value)
    }
    useEffect(() => {
        if (!peopleId) {
            console.log("peopleId masih null, tidak fetch data");
            return;
        }

        const fetchPerson = async () => {
            try {
                setLoading(true);
                setIdk("");
                setIsSubmitting(false);
                const data = await getPerson(peopleId);
                console.log(data);
                
                if (data) {
                    const getIdk = await fetchPeopleByNIK(data.identityNumber);
                    if (getIdk.code === 500) {
                        console.log('Tidak terhubung ke server kemenkes');
                        
                    }
                    if (getIdk) {
                        // console.log(getIdk);
                        const idKsetup = getIdk.data.id ?? 0;
                        setIdDocument(data.documentId);
                        setIdk(idKsetup);
                        handleLoadDataById(data, idKsetup);
                        setLoading(false);
                    }else {
                        setIdDocument(data.documentId);
                        // setIdk(idKsetup)
                        handleLoadDataById(data, 0);
                        setLoading(false);
                    }
                } else {
                    console.warn("Data Orang gagal dimuat atau kosong");
                }
            } catch (err) {
                console.error("Gagal memuat data:", err);
            } 
        };

        fetchPerson();
    }, [peopleId]); // Trigger hanya saat peopleId berubah
    useEffect(() => {
        Swal.fire({
            icon: 'info',
            title: 'Pembatasan Form Update',
            text: 'Anda hanya dibenarkan melakukan update untuk Nomor KK, Nomor HP, Agama, dan juga alamat jalan',
        });
    }, [peopleId]);
    const handleSubmit = async () => {
        // Jika sedang dalam proses pengiriman, hentikan
        if (isSubmitting) return;
        
        // Siapkan data yang akan divalidasi dan dikirim
        const formData = {
            fullName: document.getElementById('namePerson').value,
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
            documentId: idDocument,
            userId: "", // Opsional, bisa ditambahkan jika ada
        };
        // console.log(formData);
        
        // return;
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
            const response = await updatePerson(peopleId, formData);
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Data berhasil diperbaharui   !',
            });
            setActiveTab('atleet-form-tab');
            setIsSubmitting(true);
            setButtonText("Telah Terupdate");
            setAtleetRefetchKey(prevKey => prevKey + 1);
            // Tambahkan console.log untuk debugging


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
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Tidak dapat terhubung ke server',
                    });
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
                Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Tidak dapat terhubung ke server',
                });
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
                 Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Tidak dapat terhubung ke server',
                });
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
        // const formattedBirthDate = format(new Date(birthDate), 'yyyy-MM-dd');
        try {
            const attributes = {
                name: fullName,
                birthdate: birthDate,
                gender: gender,
                personIdentity: idK,
            };
            const data = await fetchPeopleByAttributes(attributes);
            setAddressData(data);
            setLoadStateData(false);
        } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Tidak dapat terhubung ke server',
                });
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

    return (<>
    {!loading && (
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
                    readOnly={true}
                />
                <InputComponent
                    label="IDK"
                    type="text"
                    name="idK"
                    value={idK}
                    onChange={() => {}}
                    hidden
                    readOnly={true}
                />
                <InputComponent
                    id="namePerson"
                    label="Nama Lengkap"
                    type="text"
                    name="fullName"
                    onChange={handleNameChange}
                    value={personName}
                    placeholder={placeholderName}
                    required
                    readOnly={true}
                />
                <SelectComponent
                    label="Jenis Kelamin"
                    name="gender"
                    id="gender"
                    placeholder="Pilih"
                    options={genderOptions}
                    value={gender}
                    onChange={handleGenderChange}
                    className
                    classNamePrefix
                    isSearchable
                    required
                    readOnly={true}
                />
                <DatePickerComponent
                    label="Tanggal Lahir"
                    selected={birthdate}
                    name="birthdate"
                    onChange={handleDateChange}
                    value={birthdate}
                    placeholderText="Pilih tanggal lahir"
                    required
                    readOnly={true}
                />
                <InputComponent
                    id="familyCardNumber"
                    label="Nomor Kartu Keluarga"
                    type="number"
                    name="familyCardNumber"
                    onChange={handleFamilyIdentityChange}
                    value={familyCardNumber}
                    readOnly={isSubmitting}
                />
                <InputComponent
                    id="phoneNumber"
                    label="Nomor Telepon"
                    type="number"
                    name="phoneNumber"
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
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
                    // defaultValue={streetAddress}
                    value={streetAddress}
                    onChange={handleStreetAddressChange}
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                    isDisabled={!selectedDistrict}
                />
            </div>
            <div className="d-flex align-items-start gap-3 mt-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    disabled={isSubmitting || loadingInput} // Nonaktifkan tombol saat proses pengiriman
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-lg ms-2" />
                    {buttonText} {/* Tampilkan teks tombol berdasarkan state */}
                </button>
            </div>
        </div>
    )}
    {loading && (
        <div className="container">LOADING . . . . . . . .
            </div>
    )}

   </> );
};

const FormAtleetUpdate = ({ setActiveTab, peopleId, atleetRefetchKey  }) => {
    const [kontingen, setKontingen] = useState(null);
    const [kontingenOption, setKontingenOption] = useState([]);
    const [cabor, setCabor] = useState(null);
    const [caborOption, setCaborOption] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [athleteId, setAthleteId] = useState(null);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    const resetForm = () => {
        setKontingen(null);
        setCabor(null);
        setWeight("");
        setHeight("");
        Swal.fire({
            title: 'Sukses Reset Form',
            text: 'Formulir telah direset, silahkan isi kembali !',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    // Fetch data cabang olahraga dan kontingen
    useEffect(() => {
        const fetchSports = async () => {
            try {
                const result = await getSport();
                if (result && Array.isArray(result)) {
                    const formattedOptions = result.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setCaborOption(formattedOptions);
                } else {
                    console.error('Data tidak valid:', result);
                }
            } catch (err) {
                console.error('Terjadi kesalahan saat mengambil data cabang olahraga:', err);
            }
        };

        const fetchKontingen = async () => {
            try {
                const result = await getKontingen();
                if (result && Array.isArray(result)) {
                    const formattedOptions = result.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    setKontingenOption(formattedOptions);
                } else {
                    console.error('Data tidak valid:', result);
                }
            } catch (err) {
                console.error('Terjadi kesalahan saat mengambil data kontingen:', err);
            }
        };

        const fetchData = async () => {
            await fetchSports();
            await fetchKontingen();
        };

        fetchData();
    }, []);

    // Fetch data atlet berdasarkan peopleId
    useEffect(() => {
        const fetchAthletesId = async () => {
            try {
                const data = await getAthletePeople(peopleId);
                setAthleteId(data.id);
                // Set weight dan height
                setWeight(data.weight ? Math.floor(parseFloat(data.weight)) : "");
                setHeight(data.height ? Math.floor(parseFloat(data.height)) : "");


                // Cari opsi cabang olahraga yang sesuai dengan sportId dari data
                const selectedCabor = caborOption.find(option => option.value === data.sportId);
                if (selectedCabor) {
                    setCabor(selectedCabor);
                } else {
                    console.warn('Cabang olahraga tidak ditemukan:', data.sportId);
                }

                const selectedKontingen = kontingenOption.find(option => option.value === parseInt(data.regionalRepresentative, 10));

                if (selectedKontingen) {
                    setKontingen(selectedKontingen);
                } else {
                    console.warn('Kontingen tidak ditemukan:', data.regionalRepresentative);
                }
            } catch (err) {
                // console.error('Terjadi kesalahan saat mengambil data atlet:', err);
            }
        };

        if (peopleId && caborOption.length > 0 && kontingenOption.length > 0) {
            fetchAthletesId();
        }
    }, [peopleId, atleetRefetchKey, caborOption, kontingenOption]);

    const handleSportChange = (selectedOption) => {
        setCabor(selectedOption);
    };

    const handleKontingenChange = (selectedOption) => {
        setKontingen(selectedOption);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
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
            peopleId: peopleId,
            sportId: cabor?.value,
            regionalRepresentative: kontingen?.value.toString(),
            height: height,
            weight: weight,
        };

        // Validasi data
        const errors = validateAthlete(formData);
        if (Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                html: `Periksa kembali field input : <br />${Object.values(errors)
                    .map((message, index) => `${index + 1}. ${message}`)
                    .join('<br />')}`,
            });
            return;
        }

        // Kirim data ke API
        try {
            setIsSubmitting(true);
            const response = await updateAthlete(athleteId,formData);
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Data atlet berhasil disimpan!',
            });
            setActiveTab('document-form-tab');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data atlet.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <div>
                    <h5 className="mb-1">Data Atleet</h5>
                    <p className="text-muted">Yang memiliki symbol <code>*</code> Wajib diisi.</p>
                </div>
            </div>
            <div className="row">
                <InputComponent
                    id="weight"
                    label="Berat Badan"
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={handleWeightChange}
                    rowClassName="col-md-6"
                    readOnly={isSubmitting}
                    required
                />
                <InputComponent
                    id="height"
                    label="Tinggi Badan"
                    type="number"
                    name="height"
                    value={height}
                    onChange={handleHeightChange}
                    rowClassName="col-md-6"
                    readOnly={isSubmitting}
                    required
                />
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

const FormDokumenUpdate = ({ setForm, backTable, peopleId, setActiveTab, atleetRefetchKey }) => {
    const [docsKtp, setdocsKtp] = useState(null);
    const [docsIjazah, setdocsIjazah] = useState(null);
    const [docsAkte, setdocsAkte] = useState(null);
    const [docsSelfieKtp, setdocsSelfieKtp] = useState(null);
    const [docsImageProfile, setdocsImageProfile] = useState(null);
    const [errors, setErrors] = useState({});
    const [reset, setReset] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [documentIds, setDocumentIds] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            const data = await getPerson(peopleId);
            const dokument = await getDocument(data.documentId);
            setDocumentIds(data.documentId);
            setdocsKtp(`http://localhost:8000/storage/${dokument.docsKtp}`);
            setdocsIjazah(`http://localhost:8000/storage/${dokument.docsIjazah}`);
            setdocsAkte(`http://localhost:8000/storage/${dokument.docsAkte}`);
            setdocsSelfieKtp(`http://localhost:8000/storage/${dokument.docsSelfieKtp}`);
            setdocsImageProfile(`http://localhost:8000/storage/${dokument.docsImageProfile}`);

            setLoading(false);
        };
        fetchDocument();
    }, [atleetRefetchKey]);

    const handleSubmit = async () => {
        if (isSubmitting) {
            setActiveTab('general-form-tab');
            setForm(false);
            backTable();
            return;
        }

        const values = {
            docsKtp,
            docsIjazah,
            docsAkte,
            docsSelfieKtp,
            docsImageProfile
        };

        const formData = new FormData();
        for (const field in values) {
            if (values[field] instanceof File) {
                formData.append(field, values[field]);
            }
        }

        try {
            let response;
            if (documentIds) {
                response = await updateDocument(documentIds, formData);
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
                    setDocumentIds(null);
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
                <h5 className="mb-1">Upload Dokumen</h5>
                <p className="text-muted">
                    Yang memiliki simbol <code>*</code> wajib diisi.
                </p>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <UploadFileComponent
                        label="Foto KTP"
                        name="docsKtp"
                        required
                        onChange={(file) => setdocsKtp(file)}
                        error={errors.docsKtp}
                        reset={reset}
                        defaultPreview={docsKtp} // Pass the image URL here
                    />
                </div>
                <div className="col-md-3">
                    <UploadFileComponent
                        label="Foto Ijazah"
                        name="docsIjazah"
                        required
                        onChange={(file) => setdocsIjazah(file)}
                        error={errors.docsIjazah}
                        reset={reset}
                        defaultPreview={docsIjazah} // Pass the image URL here
                    />
                </div>

                <div className="col-md-3">
                    <UploadFileComponent
                        label="Foto Akte Kelahiran"
                        name="docsAkte"
                        required
                        onChange={(file) => setdocsAkte(file)}
                        error={errors.docsAkte}
                        reset={reset}
                        defaultPreview={docsAkte} // Pass the image URL here
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
                        defaultPreview={docsSelfieKtp} // Pass the image URL here
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
                        defaultPreview={docsImageProfile} // Pass the image URL here
                    />
                </div>
            </div>

            {/* Tombol Reset dan Submit */}
            <div className="d-flex align-items-start gap-3 mt-4">
                {peopleId && (
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


export { FormUmumUpdate, FormAtleetUpdate, FormDokumenUpdate };