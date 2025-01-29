import React from 'react';

export default function Breadcrumb({ pageName, pageNameFeature }) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{pageName}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript: void(0);">Pages</a>
                                </li>
                                <li className="breadcrumb-item active">{pageNameFeature}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}