import Link from "next/link"

export default function TopNav() {
    return(
        
        <div className="navbar-brand-box">
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
                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-sm.png`} alt="" height={22} />
                    </span>
                </Link>
                <button type="button" className="btn btn-sm p-0 fs-3xl header-item float-end btn-vertical-sm-hover shadow-none"
                    id="vertical-hover">
                    <i className="ri-record-circle-line" />
                </button>
            </div>
    )
}