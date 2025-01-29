import AdminLayout from "@/components/AdminLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Title from "@/components/Title";
import { FormAtleet, FormDokumen, FormUmum } from "@/templates/atleet/FormInsert";
import TableAtleet from "@/templates/atleet/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AtleetPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('general-form-tab');
    const [peopleId, setPeopleId] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [renderTable, setRenderTable] = useState(true); // State untuk mengontrol render ulang tabel
    const dataPage = {
        title: 'Daftar Atleet',
        subtitle: 'Atleet',
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const toggleFormAndTable = () => {
        setShowForm(!showForm); // Toggle antara form dan tabel
        if (!showForm) {
            // Jika kembali ke tabel, setel renderTable ke true untuk memastikan tabel dirender ulang
            setRenderTable(true);
        }
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
                                                    {showForm ? "Kembali ke Tabel Atleet" : "Tambah Atleet"}
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
                        {!showForm && (
                            <TableAtleet key={showForm ? "form" : "table"} /> 
                        )}
                        {showForm && (
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
                                        <FormUmum setActiveTab={setActiveTab} setPeopleId={setPeopleId} setDocumentId={setDocumentId} />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'atleet-form-tab' ? 'show active' : ''}`} id="atleet-form" role="tabpanel" aria-labelledby="atleet-form-tab">
                                        <FormAtleet setActiveTab={setActiveTab} peopleId={peopleId} />
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'document-form-tab' ? 'show active' : ''}`} id="document-form" role="tabpanel" aria-labelledby="document-form-tab">
                                        <FormDokumen setActiveTab={setActiveTab} documentId={documentId} />
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