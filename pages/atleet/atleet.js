import AdminLayout from "@/components/AdminLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Title from "@/components/Title";
import { FormAtleetInsert, FormDokumenInsert, FormUmumInsert } from "@/templates/atleet/FormInsert";
import { FormAtleetUpdate, FormDokumenUpdate, FormUmumUpdate } from "@/templates/atleet/FormUpdate";
import TableAtleet from "@/templates/atleet/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AtleetPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('general-form-tab');
    const [peopleId, setPeopleId] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [atleetId, setAtleetId] = useState(null);
    const [renderTable, setRenderTable] = useState(true); // State untuk mengontrol render ulang tabel
    const [editForm, setEditForm] = useState(false);
    const [editId, setEditId] = useState(null); // State untuk menyimpan ID atlet yang akan diedit
    const [atleetRefetchKey, setAtleetRefetchKey] = useState(0);
    const dataPage = {
        title: 'Daftar Atleet',
        subtitle: 'Atleet',
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const toggleFormAndTable = () => {
        setEditId(null); // Reset ID edit
 
        setEditForm(false); // Pastikan form edit tidak ditampilkan // Pastikan form insert tidak ditampilkan
        if (!editForm) {
            setShowForm(!showForm);
        }
        setRenderTable(true); // Pastikan tabel dirender ulang

    };

    const handleRefreshTable = () => {
        setRenderTable(true);
    }



    const handleEditClick = (id) => {
        setEditId(id);  // Simpan ID atlet yang akan diedit
        setEditForm(true);  // Tampilkan form edit
        setShowForm(false);  // Sembunyikan form tambah
    };

    return (
        <AdminLayout>
            <Title title={`${dataPage.title} - ${dataPage.subtitle}`} />
            <Breadcrumb pageName={dataPage.title} pageNameFeature={dataPage.subtitle} />
            <div className="row">
                <div className="col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="col-sm-6 mb-3 text-center text-sm-start">
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <div className="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Menu Utama
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <li>
                                                <Link className="dropdown-item" href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Mencegah reload halaman
                                                        toggleFormAndTable(); // Toggle antara form dan tabel
                                                    }} >
                                                    {showForm ? "Kembali ke Tabel Atleet" : editForm ? "Kembali ke Tabel Atleet" : "Tambah Atleet"}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" href="#">
                                                    Petunjuk Pengunaan
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {(!showForm && !editForm) && (
                            <TableAtleet key={showForm ? "form" : "table"}  onEditClick={handleEditClick} refresh={handleRefreshTable} /> 
                        )}
                        {(showForm && !editForm) && (
                            <div className="card-body">
                                <div id="custom-progress-bar" className="progress-nav mb-4">
                                    <div className="progress" style={{ height: 1 }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <ul className="nav nav-pills progress-bar-tab custom-nav" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'general-form-tab' ? 'active' : ''}`}
                                                id="general-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#general-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="general-form"
                                                aria-selected={activeTab === 'general-form-tab'}
                                                onClick={() => handleTabChange('general-form-tab')}
                                            >
                                                1
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'atleet-form-tab' ? 'active' : ''}`}
                                                id="atleet-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#atleet-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="atleet-form"
                                                aria-selected={activeTab === 'atleet-form-tab'}
                                                onClick={() => handleTabChange('atleet-form-tab')}
                                            >
                                                2
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'document-form-tab' ? 'active' : ''}`}
                                                id="document-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#document-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="document-form"
                                                aria-selected={activeTab === 'document-form-tab'}
                                                onClick={() => handleTabChange('document-form-tab')}
                                            >
                                                3
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className={`tab-pane fade ${activeTab === 'general-form-tab' ? 'show active' : ''}`} id="general-form" role="tabpanel" aria-labelledby="general-form-tab">
                                        <FormUmumInsert useForm={showForm} setActiveTab={setActiveTab} setPeopleId={setPeopleId} setDocumentId={setDocumentId} />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'atleet-form-tab' ? 'show active' : ''}`} id="atleet-form" role="tabpanel" aria-labelledby="atleet-form-tab">
                                        <FormAtleetInsert useForm={showForm} setActiveTab={setActiveTab} peopleId={peopleId} />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'document-form-tab' ? 'show active' : ''}`} id="document-form" role="tabpanel" aria-labelledby="document-form-tab">
                                        <FormDokumenInsert useForm={showForm} setActiveTab={setActiveTab} documentId={documentId} backTable={toggleFormAndTable} setForm={setShowForm} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {editForm && (
                            <div className="card-body">
                                <div id="custom-progress-bar" className="progress-nav mb-4">
                                    <div className="progress" style={{ height: 1 }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <ul className="nav nav-pills progress-bar-tab custom-nav" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'general-form-tab' ? 'active' : ''}`}
                                                id="general-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#general-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="general-form"
                                                aria-selected={activeTab === 'general-form-tab'}
                                                onClick={() => handleTabChange('general-form-tab')}
                                            >
                                                1
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'atleet-form-tab' ? 'active' : ''}`}
                                                id="atleet-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#atleet-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="atleet-form"
                                                aria-selected={activeTab === 'atleet-form-tab'}
                                                onClick={() => handleTabChange('atleet-form-tab')}
                                            >
                                                2
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link rounded-pill ${activeTab === 'document-form-tab' ? 'active' : ''}`}
                                                id="document-form-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#document-form"
                                                type="button"
                                                role="tab"
                                                aria-controls="document-form"
                                                aria-selected={activeTab === 'document-form-tab'}
                                                onClick={() => handleTabChange('document-form-tab')}
                                            >
                                                3
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className={`tab-pane fade ${activeTab === 'general-form-tab' ? 'show active' : ''}`} id="general-form" role="tabpanel" aria-labelledby="general-form-tab">
                                        <FormUmumUpdate 
                                            key={editId}
                                            setActiveTab={setActiveTab} 
                                            peopleId={editId} 
                                            setDocumentId={setDocumentId} 
                                            setAtleetId={setAtleetId}
                                            setAtleetRefetchKey={setAtleetRefetchKey}
                                        />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'atleet-form-tab' ? 'show active' : ''}`} id="atleet-form" role="tabpanel" aria-labelledby="atleet-form-tab">
                                        <FormAtleetUpdate 
                                            setActiveTab={setActiveTab} 
                                            peopleId={editId} 
                                            atleetRefetchKey={atleetRefetchKey}
                                        />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'document-form-tab' ? 'show active' : ''}`} id="document-form" role="tabpanel" aria-labelledby="document-form-tab">
                                        <FormDokumenUpdate setActiveTab={setActiveTab} peopleId={editId} backTable={toggleFormAndTable} setForm={setShowForm} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AtleetPage;