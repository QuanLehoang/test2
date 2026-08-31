export default function Footer({ lang }) {
    const text = {
        vi: {
            brand: "Quốc Khánh Việt Nam",
            creator: "@Lược sử và Source code",
        },

        en: {
            brand: "Vietnam National Day",
            creator: "@Lược sử và Source code",
        },
    };

    const t = text[lang] || text.vi;

    return (
        <footer className="footer">
            <div className="container max-w-content">
                <div className="footer-inner">

                    {/* Bên trái */}
                    <a
                        className="brand"
                        href="#home"
                        aria-label={t.brand}
                    >
                        <span className="brand-mark">
                            ★
                        </span>

                        <span>
                            {t.brand}
                        </span>
                    </a>

                    {/* Bên phải - Nhà sáng tạo */}
                    <div className="footer-links">

                        <span>
                            {t.creator}
                        </span>

                        <a
                            href="https://github.com/quanlehoang/test2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t.source}
                        </a>

                    </div>

                </div>
            </div>
        </footer>
    );
}