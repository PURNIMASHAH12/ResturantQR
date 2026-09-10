import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../styles/DashboardNavbar.css";

import NavbarHelp from "./NavbarHelp";
import {
    adminLinks,
    superAdminLinks,
    websiteLinks,
} from "./NavbarLinks";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showHelp, setShowHelp] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = user?.role;

    const isAdmin = role === "admin";
    const isWaiter = role === "waiter";
    const isSuperAdmin = role === "superadmin";

    const path = location.pathname;

    const isAdminDashboard = path.startsWith("/admin");
    const isWaiterDashboard = path.startsWith("/waiter");
    const isSuperAdminDashboard = path.startsWith("/superadmin");

    const isDashboard =
        isAdminDashboard ||
        isWaiterDashboard ||
        isSuperAdminDashboard;

    const isCustomerInfo = path === "/customer-info";

    const isActive = (route) =>
        path === route ? "active" : "";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const goHome = () => {
        if (isAdminDashboard && isAdmin) navigate("/admin");
        else if (isWaiterDashboard && isWaiter) navigate("/waiter");
        else if (isSuperAdminDashboard && isSuperAdmin) navigate("/superadmin");
        else navigate("/");
    };

    const renderLinks = (links) =>
        links.map(([label, route]) => (
            <button
                key={route}
                className={isActive(route)}
                onClick={() => navigate(route)}
            >
                {label}
            </button>
        ));

    return (
        <nav className="dashboard-navbar">

            {/* LOGO */}
            <div className="dashboard-logo" onClick={goHome}>
                <div>
                    <strong>RestaurantQR</strong>

                    <small>
                        {isAdminDashboard && isAdmin
                            ? "Admin Panel"
                            : isWaiterDashboard && isWaiter
                            ? "Waiter Panel"
                            : isSuperAdminDashboard && isSuperAdmin
                            ? "Super Admin"
                            : "Digital Menu"}
                    </small>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="dashboard-nav-links">

                {/* ADMIN */}
                {isAdminDashboard &&
                    isAdmin &&
                    renderLinks(adminLinks)}

                {/* WAITER */}
                {isWaiterDashboard && isWaiter && (
                    <button
                        className={isActive("/waiter")}
                        onClick={() => navigate("/waiter")}
                    >
                        Orders
                    </button>
                )}

                {/* SUPER ADMIN */}
                {isSuperAdminDashboard &&
                    isSuperAdmin &&
                    renderLinks(superAdminLinks)}

                {/* WEBSITE */}
                {!isDashboard && (
                    <>
                        {renderLinks(websiteLinks)}

                        {isCustomerInfo ? (
                            <button
                                className={showHelp ? "active" : ""}
                                onClick={() => setShowHelp(!showHelp)}
                            >
                                Help
                            </button>
                        ) : (
                            <>
                                <button
                                    className={isActive("/menu")}
                                    onClick={() => navigate("/menu")}
                                >
                                    Menu
                                </button>

                                <button
                                    className={isActive("/cart")}
                                    onClick={() => navigate("/cart")}
                                >
                                    Cart
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* WEBSITE BUTTON */}
                {isDashboard && (
                    <button
                        className="website-btn"
                        onClick={() => navigate("/")}
                    >
                        Website
                    </button>
                )}

                {/* LOGIN / LOGOUT */}
                <button onClick={user ? logout : () => navigate("/login")}>
                    {user ? "Logout" : "Login"}
                </button>
            </div>

            {/* HELP POPUP */}
            {isCustomerInfo && showHelp && (
                <NavbarHelp
                    onClose={() => setShowHelp(false)}
                />
            )}
        </nav>
    );
}

export default Navbar;

