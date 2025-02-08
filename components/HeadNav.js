import Link from "next/link"
import { useRouter } from "next/router"

export default function HeadNav() {
    const router = useRouter();
    const handleLogoutButton = async () => {
        router.push("/logout")
    }
    return(
        
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                
                        <div className="navbar-brand-box horizontal-logo">
                            <Link href="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-sm.png`} alt="" height={22} />
                                </span>
                                <span className="logo-lg">
                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-dark.png`} alt="" height={22} />
                                </span>
                            </Link>
                            <Link href="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-sm.png`} alt="" height={22} />
                                </span>
                                <span className="logo-lg">
                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-light.png`} alt="" height={22} />
                                </span>
                            </Link>
                        </div>
                        <button type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
                            id="topnav-hamburger-icon">
                            <span className="hamburger-icon">
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>

                    </div>
                    <div className="d-flex align-items-center">

                        <div className="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button"
                                className="btn btn-icon btn-topbar btn-ghost-light rounded-circle user-name-text mode-layout"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ti ti-sun align-middle fs-3xl" />
                            </button>
                            <div className="dropdown-menu p-2 dropdown-menu-end" id="light-dark-mode">
                                <a href="#!" className="dropdown-item" data-mode="light">
                                    <i className="bi bi-sun align-middle me-2" /> Default (light mode)
                                </a>
                                <a href="#!" className="dropdown-item" data-mode="dark">
                                    <i className="bi bi-moon align-middle me-2" /> Dark
                                </a>
                                <a href="#!" className="dropdown-item" data-mode="auto">
                                    <i className="bi bi-moon-stars align-middle me-2" /> Auto (system
                                    default)
                                </a>
                            </div>
                        </div>
                        <div className="dropdown ms-sm-3 topbar-head-dropdown dropdown-hover-end header-item topbar-user">
                            <button type="button" className="btn shadow-none btn-icon" id="page-header-user-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img className="rounded-circle header-profile-user" src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/default-bg/male.png`}
                                        alt="Header Avatar" />
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <h6 className="dropdown-header">Welcome Alexandra!</h6>
                                <a className="dropdown-item fs-sm" href="#">
                                    <i className="bi bi-person-circle text-muted align-middle me-1" />
                                    <span className="align-middle">Profile</span>
                                </a>
                                <button className="dropdown-item fs-sm" onClick={handleLogoutButton} >
                                    <i className="bi bi-box-arrow-right text-muted align-middle me-1" />
                                    <span className="align-middle" data-key="t-logout">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}