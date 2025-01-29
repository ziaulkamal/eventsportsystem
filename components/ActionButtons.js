import React from 'react';

const ActionButtons = ({ option, value }) => {
    // Mapping opsi ke icon dan teks

    const handleClick = (getValue) => {
        console.log(getValue);
        
    }
    const optionMapping = {
        edit: {
            icon: <i className="ri-brush-2-fill" />,
            text: 'Edit',
            className: 'btn-warning',
        },
        delete: {
            icon: <i className="ri-delete-bin-5-line" />,
            text: 'Delete',
            className: 'btn-danger',
        },
    };

    const selectedOption = optionMapping[option] || {};

    return (
        <button
            type="button"
            onClick={handleClick(value)}
            className={`btn btn-sm btn-icon ${selectedOption.className}`}
            title={selectedOption.text}
        >
            {selectedOption.icon}
        </button>
    );
};

export default ActionButtons;