import React, { useEffect, useState } from 'react';
import DataTableComponent from "@/components/DataTableComponent";
import { deletePerson, getAthletes } from '@/utils/api/person'; // Import fungsi getAthletes
import Preloader from '@/components/Preloader';
import ActionButtons from '@/components/ActionButtons';
import Swal from 'sweetalert2';

const TableAtleet = ({ onEditClick, refresh }) => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true); // Tambahkan state untuk loading
    // Fungsi untuk mengubah format tanggal ke Indonesia
    const formatTanggalLahir = (dateString) => {
        if (!dateString) return 'Tidak ada data'; // Handle jika dateString tidak ada
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const fetchData = async () => {
        
        try {
            const athletes = await getAthletes(); // Ambil data dari API

            // Transformasikan data sesuai dengan kolom manual dan tambahkan nomor urut

            const formattedData = athletes.map((item) => ({
                id: item.id, // Simpan ID atlet
                rowData: [
                    item.fullName || 'Tidak ada data',
                    item.imageProfile !== null ? `${process.env.DOMAIN_RETRIVE_DATA}/${item.imageProfile}`
                    : item.gender === 'female' ? `/images/default-bg/female.png` 
                    : `/images/default-bg/male.png`,
                    item.identityNumber || 'Tidak ada data',
                    item.age || 'Tidak ada data',
                    item.gender === 'female' ? 'Perempuan' : 'Laki-laki',
                    item.regional_representative || 'Tidak ada data',
                    item.sport || 'Tidak ada data',
                    null, // Placeholder untuk tombol aksi
                    item.height || 'Tidak ada data',
                    item.weight || 'Tidak ada data',
                    item.province || 'Tidak ada data',
                    item.regencie || 'Tidak ada data',
                    item.district || 'Tidak ada data',
                    item.village || 'Tidak ada data',
                    item.address || 'Tidak ada data',
                    item.phoneNumber || 'Tidak ada data',
                    item.religion || 'Tidak ada data',
                    formatTanggalLahir(item.birthdate),
                    // item.birthdate ? new Date(item.birthdate).toLocaleDateString('id-ID') : 'Tidak ada data',
                ],
            }));
            setData(formattedData);
            setColumns(manualColumns);
            setLoading(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Tidak dapat terhubung ke server',
            });
        } finally {
            setLoading(false); // Set loading ke false setelah data selesai dimuat atau error
        }
    };

    const manualColumns = [
        // 'No', 
        'Nama Lengkap',
        'Foto Atleet',
        'NIK',
        'Usia',
        'Jenis Kelamin',
        'Kontingen', // Kolom baru untuk regional_representative
        'Cabang Olahraga',
        'Opsi',
        'Tinggi Badan',
        'Berat Badan',
        'Provinsi',
        'Kabupaten / Kota',
        'Kecamatan',
        'Desa',
        'Alamat',
        'No. Telepon',
        'Agama', // Kolom baru untuk usia
        'Tanggal Lahir',
        // 'Opsi',
    ];

    useEffect(() => {
        // Tentukan nama kolom secara manual
        fetchData(); // Panggil fungsi fetchData
    }, []);

    const handleEditClick = (id) => {
        // console.log("Mengedit atlet dengan ID:", id);
        onEditClick(id); // Panggil fungsi callback dari parent component
    };

    const handleDeleteClick = (id) => {
        console.log("Menghapus atlet dengan ID:", id);
        Swal.fire({
            title: "Hapus Data",
            text: `Apakah Anda yakin ingin menghapus atlet dengan ID: ${id}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                setColumns([]);
                setData([]);
                deletePerson(id)
                refresh();
                fetchData();
                setLoading(true);
                Swal.fire("Dihapus!", `Atlet dengan ID ${id} telah dihapus.`, "success");
            }
        });
    };
    // Tampilkan loading indicator jika data masih dimuat
    if (loading) {
        return <Preloader />; // Ganti dengan spinner atau komponen loading lainnya
    }

    return (
        <> 
        {!loading && (
            <DataTableComponent 
                columns={columns} 
                data={data} 
                onEditClick={handleEditClick} 
                onDeleteClick={handleDeleteClick} 
            />
        )}
        </>
    );
};

export default TableAtleet;