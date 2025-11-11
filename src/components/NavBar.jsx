import "../components/NavBar.css";
export default function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-logo">MyApp</div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
}