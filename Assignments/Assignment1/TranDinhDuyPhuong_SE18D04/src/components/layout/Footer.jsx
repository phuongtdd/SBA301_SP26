import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © {currentYear} FU News Management System. All rights reserved.
                </p>
                <p className="footer-version">
                    Version 1.0.0
                </p>
            </div>
        </footer>
    );
};

export default Footer;
