const { default: SideNav } = require("./SideNav")
const { default: TopNav } = require("./TopNav")

const AppMenuNav = () => {
    return(
        <div className="app-menu navbar-menu">
            <TopNav />
            <SideNav />
            <div className="sidebar-background" />
        </div>
    )
}

export default AppMenuNav;