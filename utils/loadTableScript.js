export const loadTableScripts = async () => {
    if (typeof window === 'undefined') {
        return; // Pastikan hanya dijalankan di sisi klien
    }

    // Fungsi untuk memuat script secara dinamis
    const loadScript = (src, integrity, crossorigin) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            if (integrity) script.integrity = integrity;
            if (crossorigin) script.crossOrigin = crossorigin;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    try {
        // Muat jQuery
        await loadScript(
            'https://code.jquery.com/jquery-3.6.0.min.js',
            'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
            'anonymous'
        );

        // Muat DataTables dan plugin terkait
        await loadScript('https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js');
        await loadScript('https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js');
        await loadScript('https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js');
        await loadScript('https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js');
        await loadScript('https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js');
        await loadScript('https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js');

        console.log('Semua script DataTables berhasil dimuat.');
    } catch (error) {
        console.error('Gagal memuat script:', error);
    }
};