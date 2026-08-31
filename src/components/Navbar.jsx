import { useEffect, useState } from "react";
import {
    Languages,
    Menu,
    Moon,
    Search,
    Sparkles,
    Sun,
    X,
} from "lucide-react";

import MusicPlayer from "./MusicPlayer";

const ids = [
    "home",
    "events",
    "documents",
    "gallery",
    "contact",
];

export default function Navbar({
    t,
    lang = "vi",
    setLang,
    dark,
    setDark,
    music,
    setMusic,
    fireworks,
    setFireworks,
}) {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] =
        useState(false);
    const [query, setQuery] = useState("");
    const [scrolled, setScrolled] =
        useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 18);
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    const text = {
        vi: {
            nav: "Điều hướng chính",
            brand: "Quốc Khánh Việt Nam",

            search: "Tìm kiếm",
            searchLabel:
                "Tìm kiếm nội dung",
            searchPlaceholder: "Tìm...",

            fireworks:
                "Bật / tắt pháo hoa",

            theme: "Đổi giao diện",

            menuOpen: "Mở menu",
            menuClose: "Đóng menu",

            language:
                "Chuyển ngôn ngữ",
        },

        en: {
            nav: "Main Navigation",
            brand: "Vietnam National Day",

            search: "Search",
            searchLabel:
                "Search content",
            searchPlaceholder: "Search...",

            fireworks:
                "Toggle fireworks",

            theme: "Toggle theme",

            menuOpen: "Open menu",
            menuClose: "Close menu",

            language:
                "Change language",
        },
    };

    const ui =
        text[lang] || text.vi;

    const handleNavClick = () => {
        setOpen(false);
        setSearchOpen(false);
    };

    const handleBrandClick = () => {
        setOpen(false);
        setSearchOpen(false);
    };

    const handleLanguageChange = () => {
        setLang(
            lang === "vi"
                ? "en"
                : "vi"
        );

        setOpen(false);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <header
            className={`site-nav ${
                scrolled
                    ? "site-nav--scrolled"
                    : ""
            }`}
        >
            <nav
                className="container max-w-content"
                aria-label={ui.nav}
            >
                {/* =========================
                    BRAND
                ========================== */}
                <a
                    href="#home"
                    className="brand"
                    aria-label={ui.brand}
                    onClick={
                        handleBrandClick
                    }
                >
                    <span className="brand-mark">
                        ★
                    </span>

                    <span>
                        🇻🇳{" "}
                        {lang === "vi"
                            ? "Quốc Khánh Việt Nam"
                            : "Vietnam National Day"}
                    </span>
                </a>

                {/* =========================
                    NAV LINKS
                ========================== */}
                <div
                    className={`nav-links ${
                        open
                            ? "nav-links--open"
                            : ""
                    }`}
                >
                    {Array.isArray(t?.nav) &&
                        t.nav
                            .slice(0, 5)
                            .map(
                                (
                                    item,
                                    index
                                ) => (
                                    <a
                                        key={`${item}-${index}`}
                                        href={`#${ids[index]}`}
                                        onClick={
                                            handleNavClick
                                        }
                                    >
                                        {
                                            item
                                        }
                                    </a>
                                )
                            )}
                </div>

                {/* =========================
                    ACTIONS
                ========================== */}
                <div
                    className="nav-actions"
                    aria-label={ui.nav}
                >
                    {/* SEARCH */}
                    <form
                        className={`site-search ${
                            searchOpen
                                ? "site-search--open"
                                : ""
                        }`}
                        role="search"
                        onSubmit={
                            handleSearchSubmit
                        }
                    >
                        <label
                            className="sr-only"
                            htmlFor="site-search"
                        >
                            {
                                ui.searchLabel
                            }
                        </label>

                        <input
                            id="site-search"
                            type="search"
                            value={query}
                            onChange={(event) =>
                                setQuery(
                                    event.target
                                        .value
                                )
                            }
                            placeholder={
                                ui.searchPlaceholder
                            }
                            autoComplete="off"
                        />

                        {query.length > 0 && (
                            <span
                                aria-hidden="true"
                            >
                                {
                                    query.length
                                }
                            </span>
                        )}
                    </form>

                    <button
                        type="button"
                        className="icon-btn d-none d-md-inline-flex"
                        aria-label={
                            ui.search
                        }
                        aria-expanded={
                            searchOpen
                        }
                        onClick={() =>
                            setSearchOpen(
                                (prev) =>
                                    !prev
                            )
                        }
                    >
                        <Search size={18} />
                    </button>

                    {/* =========================
                        MUSIC
                    ========================== */}
                    <MusicPlayer
                        music={music}
                        setMusic={setMusic}
                        lang={lang}
                    />

                    {/* =========================
                        FIREWORKS
                    ========================== */}
                    <button
                        type="button"
                        className={`icon-btn ${
                            fireworks
                                ? "icon-btn--active"
                                : ""
                        }`}
                        aria-label={
                            ui.fireworks
                        }
                        aria-pressed={
                            fireworks
                        }
                        onClick={() =>
                            setFireworks(
                                (prev) =>
                                    !prev
                            )
                        }
                    >
                        <Sparkles size={18} />
                    </button>

                    {/* =========================
                        THEME
                    ========================== */}
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label={ui.theme}
                        aria-pressed={dark}
                        onClick={() =>
                            setDark(
                                (prev) =>
                                    !prev
                            )
                        }
                    >
                        {dark ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    {/* =========================
                        LANGUAGE
                    ========================== */}
                    <button
                        type="button"
                        className="lang-btn"
                        aria-label={
                            ui.language
                        }
                        onClick={
                            handleLanguageChange
                        }
                    >
                        <Languages size={16} />

                        <span>
                            {lang.toUpperCase()}
                        </span>
                    </button>

                    {/* =========================
                        MOBILE MENU
                    ========================== */}
                    <button
                        type="button"
                        className="icon-btn nav-toggle"
                        aria-label={
                            open
                                ? ui.menuClose
                                : ui.menuOpen
                        }
                        aria-expanded={open}
                        onClick={() =>
                            setOpen(
                                (prev) =>
                                    !prev
                            )
                        }
                    >
                        {open ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}