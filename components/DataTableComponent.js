import React, { useEffect } from 'react';
import { loadTableScripts } from '@/utils/loadTableScript';
import ImageWithPopup from '@/components/ImageWithPopup'; // Import komponen ImageWithPopup

const DataTableComponent = ({ columns, data, onEditClick, onDeleteClick, tableId = 'alternative-pagination', className = 'table nowrap dt-responsive align-middle table-hover table-bordered', style = { width: '100%' }, pagingType = 'full_numbers', renderTable = false }) => {
    const initializeDataTable = async () => {
        // Muat script DataTables
        await loadTableScripts();

        // Pastikan jQuery dan DataTables telah dimuat sebelum menginisialisasi
        if (typeof window !== 'undefined' && window.$) {
            const tableElement = $(`#${tableId}`);
            if (tableElement.length > 0) { // Pastikan tabel ada
                if (!$.fn.dataTable.isDataTable(tableElement)) { // Cek apakah tabel sudah diinisialisasi
                    tableElement.DataTable({
                        pagingType: pagingType,
                        initComplete: function () {
                            // Tambahkan class pada input dalam filter
                            const filterInput = $(`#${tableId}_filter input`);
                            filterInput.attr('class', 'form-control search');

                            // Tambahkan class pada select dalam length
                            const lengthSelect = $(`select[name="${tableId}_length"]`);
                            lengthSelect.attr('class', 'form-select');
                        },
                    });
                }
            }
        }
    };
    
    useEffect(() => {

        initializeDataTable();

        // Cleanup DataTable saat komponen di-unmount
        return () => {
            if (typeof window !== 'undefined' && window.$) {
                const tableElement = $(`#${tableId}`);
                if (tableElement.length > 0 && $.fn.dataTable.isDataTable(tableElement)) { // Cek apakah tabel sudah diinisialisasi
                    tableElement.DataTable().destroy(); // Hancurkan instance DataTables
                }
            }
        };
    }, [tableId, pagingType]);

    const handleButtonClick = (event, id, action) => {
        event.stopPropagation();
        if (action === 'edit' && onEditClick) {
            onEditClick(id);
        } else if (action === 'delete' && onDeleteClick) {
            onDeleteClick(id);
        }
    };

    return (
        <div className="card-body" id="table">
            <table id={tableId} className={className} style={style}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ id, rowData }, rowIndex) => (
                        <tr key={rowIndex}>
                            {rowData.map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                    {cellIndex === 1 ? (
                                        <ImageWithPopup src={cell} alt="Foto" width={150} height={150} />
                                    ) : cellIndex === 7 ? (
                                        <div className="hstack gap-2">
                                            <button 
                                                type="button" 
                                                onClick={(e) => handleButtonClick(e, id, 'edit')} 
                                                className="btn btn-warning btn-icon"
                                            >
                                                <i className="ri-edit-line"></i>
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={(e) => handleButtonClick(e, id, 'delete')} 
                                                className="btn btn-danger btn-icon"
                                            >
                                                <i className="ri-delete-bin-5-line"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        cell
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTableComponent;