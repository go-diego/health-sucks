import Link from "next/link";
import "../styles/site.scss";

export default function Nav() {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item">Home</a>
                    </Link>
                    <Link href="/devices">
                        <a className="navbar-item">Devices</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
