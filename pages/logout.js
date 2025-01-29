import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@/utils/api/auth';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout(); // Memanggil fungsi logout yang akan menghapus token dan data user
        router.push('/login'); // Setelah logout, arahkan ke halaman login
      } catch (error) {
        console.error('Logout failed:', error.message);
        router.push('/login'); // Jika ada error, tetap arahkan ke halaman login
      }
    };

    handleLogout(); // Jalankan logout saat komponen ini dipasang
  }, [router]);

  return (
    <div className="logout-page">
      <p>Logging you out...</p>
    </div>
  );
};

export default Logout;
