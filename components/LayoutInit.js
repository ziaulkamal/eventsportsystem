import React, { useEffect } from 'react';

const LayoutInit = () => {
    useEffect(() => {
        // Fungsi untuk inisialisasi layout
        const initializeLayout = () => {
            if (sessionStorage.getItem("defaultAttribute")) {
                const attributes = document.documentElement.attributes;
                const currentAttributes = {};

                // Ambil semua atribut dari elemen root (html)
                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i];
                    if (attr.nodeName && attr.nodeName !== "undefined") {
                        currentAttributes[attr.nodeName] = attr.nodeValue;
                    }
                }

                // Bandingkan dengan sessionStorage
                if (JSON.stringify(currentAttributes) !== sessionStorage.getItem("defaultAttribute")) {
                    sessionStorage.clear();
                    window.location.reload();
                } else {
                    const layoutAttributes = {
                        "data-layout": sessionStorage.getItem("data-layout"),
                        "data-sidebar-size": sessionStorage.getItem("data-sidebar-size"),
                        "data-bs-theme": sessionStorage.getItem("data-bs-theme"),
                        "data-layout-width": sessionStorage.getItem("data-layout-width"),
                        "data-sidebar": sessionStorage.getItem("data-sidebar"),
                        "data-sidebar-image": sessionStorage.getItem("data-sidebar-image"),
                        "data-layout-direction": sessionStorage.getItem("data-layout-direction"),
                        "data-layout-position": sessionStorage.getItem("data-layout-position"),
                        "data-layout-style": sessionStorage.getItem("data-layout-style"),
                        "data-topbar": sessionStorage.getItem("data-topbar"),
                        "data-preloader": sessionStorage.getItem("data-preloader"),
                    };

                    // Set atribut ke elemen root (html)
                    for (const key in layoutAttributes) {
                        if (layoutAttributes[key]) {
                            document.documentElement.setAttribute(key, layoutAttributes[key]);
                        }
                    }
                }
            }
        };

        // Panggil fungsi inisialisasi
        initializeLayout();
    }, []); // Jalankan hanya sekali setelah komponen di-mount

    return null; // Komponen ini tidak merender apa pun
};

export default LayoutInit;