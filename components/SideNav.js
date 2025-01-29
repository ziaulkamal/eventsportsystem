import { useState } from 'react'; // Import useState
import Link from 'next/link';
import { menuItems } from '../utils/RegisterMenu';

export default function SideNav() {
  const [activeMenu, setActiveMenu] = useState(null); // State untuk menyimpan ID menu yang aktif

  const handleMenuClick = (id) => {
    // Jika menu yang diklik sudah aktif, tutup menu tersebut
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      // Jika menu yang diklik berbeda, buka menu baru dan tutup menu sebelumnya
      setActiveMenu(id);
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.type === "singleNav") {
        return (
          <li className="nav-item" key={index}>
            <Link href={item.href} className="nav-link menu-link">
              <i className={item.icon} />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      } else if (item.type === "collapseNav") {
        const isActive = activeMenu === item.id; // Cek apakah menu ini sedang aktif
        return (
          <li className="nav-item" key={index}>
            <Link
              href={`#${item.id}`}
              className={`nav-link menu-link ${isActive ? '' : 'collapsed'}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={isActive} // Atur aria-expanded berdasarkan apakah menu aktif
              aria-controls={item.id}
              onClick={() => handleMenuClick(item.id)} // Tambahkan onClick untuk mengontrol state
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </Link>
            <div
              className={`collapse menu-dropdown ${isActive ? 'show' : ''}`}
              id={item.id}
            >
              <ul className="nav nav-sm flex-column">
                {item.subItems.map((subItem, subIndex) => (
                  <li className="nav-item" key={subIndex}>
                    <Link href={subItem.href} prefetch={false} className="nav-link">
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div id="scrollbar">
      <div className="container-fluid">
        <div id="two-column-menu"></div>
        <ul className="navbar-nav" id="navbar-nav">
          <li className="menu-title">
            <span data-key="t-menu">Menu</span>
          </li>
          {renderMenuItems(menuItems)}
        </ul>
      </div>
    </div>
  );
}