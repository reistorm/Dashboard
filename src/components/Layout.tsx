import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            {/*Боковое меню */}
            <aside className="sidebar">
                <div className="logo">
                    <h2>EdTech Admin</h2>
                </div>
                <nav className="nav-menu">
                    <Link to="/dashboard" className="nav-link">Обзор</Link>
                    <Link to="/students" className="nav-link">Студенты</Link>
                    <Link to="/settings" className="nav-link">Настройки</Link>
                </nav>
            </aside>
            {/* Основная часть с шапкой и контентом */}
            <main className="main-content">
                <header className="header">
                    <div className="header-title">Панель управления</div>
                    <div className="user-profile">
                        <span>Администратор</span>
                        <div className="avatar">A</div>
                    </div>
                </header>
                {/* Обертка для динамического контента страниц */}
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout;