import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithPopup = ({ src, alt, width = 100, height = 100 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Fungsi untuk mengecek ukuran layar
    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Ukuran mobile dianggap <= 768px
    };

    // Efek untuk mengecek ukuran layar saat komponen dimount dan saat resize
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Gambar di tabel */}
            <div style={{ width: `${width}px`, height: `${height}px`, borderRadius: '10%', overflow: 'hidden', cursor: 'pointer' }}>
                <Image
                    className="d-flex justify-content-center align-items-center"
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    onClick={handleImageClick}
                    onError={(e) => {
                        e.target.src = '/images/users/avatar-1.jpg'; // Gambar default jika gagal dimuat
                    }}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Modal untuk gambar yang diperbesar */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            position: 'relative',
                            maxWidth: isMobile ? '95%' : '90%', // Lebih besar di mobile
                            maxHeight: isMobile ? '95%' : '90%',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik gambar
                    >
                        {/* Tombol close (X) */}
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                zIndex: 1001,
                            }}
                        >
                            &times;
                        </button>

                        {/* Gambar yang diperbesar */}
                        <Image
                            src={src}
                            alt={alt}
                            width={isMobile ? window.innerWidth * 0.9 : 800} // Responsif di mobile
                            height={isMobile ? window.innerHeight * 0.9 : 600}
                            style={{ 
                                objectFit: 'contain',
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageWithPopup;