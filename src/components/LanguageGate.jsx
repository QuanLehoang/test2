import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/language-gate.css";

const tracks = [
    "Music1.mp3",
    "Music2.mp3",
    "Music3.mp3",
    "Music4.mp3",
    "Music5.mp3",
    "Music6.mp3",
];

function getMusicPath(file) {
    return `${import.meta.env.BASE_URL}Music/${file}`;
}

export default function LanguageGate({ onSelect }) {
    const containerRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("vi");

    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");

    const text1 = "CHÀO MỪNG ĐẾN VỚI";
    const text2 = "QUỐC KHÁNH VIỆT NAM";

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        gsap.fromTo(
            container,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            }
        );

        let timer;

        function typeText(text, setter, callback) {
            let index = 0;

            function type() {
                setter(text.slice(0, index));
                index++;

                if (index <= text.length) {
                    timer = setTimeout(type, 45);
                } else if (callback) {
                    callback();
                }
            }

            type();
        }

        typeText(text1, setLine1, () => {
            typeText(text2, setLine2);
        });

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleSelect = (lang) => {
        if (loading) return;

        setSelected(lang);
        setLoading(true);

        /*
         * Tạo đúng 1 audio dùng chung.
         */
        let audio = window.__nationalDayAudio;

        if (!audio) {
            audio = new Audio();
            audio.preload = "auto";
            audio.volume = 0.75;

            window.__nationalDayAudio = audio;
            window.__nationalDayTrackIndex = 0;

            audio.addEventListener("ended", () => {
                const current =
                    Number(
                        window.__nationalDayTrackIndex
                    ) || 0;

                const next =
                    (current + 1) % tracks.length;

                window.__nationalDayTrackIndex = next;

                audio.src = getMusicPath(
                    tracks[next]
                );

                audio.currentTime = 0;

                audio.play().catch((error) => {
                    console.error(
                        "Không thể chuyển bài:",
                        error
                    );
                });
            });
        }

        /*
         * Luôn bắt đầu Music1 khi chọn ngôn ngữ.
         */
        window.__nationalDayTrackIndex = 0;

        audio.src = getMusicPath(
            tracks[0]
        );

        audio.currentTime = 0;
        audio.volume = 0.75;

        /*
         * CỰC KỲ QUAN TRỌNG:
         * play() nằm trực tiếp trong click.
         */
        const playPromise = audio.play();

        if (playPromise) {
            playPromise
                .then(() => {
                    window.__nationalDayMusicPlaying =
                        true;
                })
                .catch((error) => {
                    console.error(
                        "Không thể phát Music1.mp3:",
                        error
                    );

                    window.__nationalDayMusicPlaying =
                        false;
                });
        }

        localStorage.setItem("lang", lang);
        localStorage.setItem("entered", "true");

        gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.6,
            ease: "power2.inOut",

            onComplete: () => {
                onSelect(lang);
            },
        });
    };

    return (
        <section
            className="language-gate"
            ref={containerRef}
        >
            <div className="language-overlay"></div>

            <div className="language-content">
                <div className="language-logo">
                    ★
                </div>

                <h1 className="typing-title">
                    <div className="typing-line">
                        {line1}

                        {line1.length <
                            text1.length && (
                            <span className="cursor">
                                |
                            </span>
                        )}
                    </div>

                    <div className="typing-line">
                        {line2}

                        {line1.length ===
                            text1.length &&
                            line2.length <
                                text2.length && (
                                <span className="cursor">
                                    |
                                </span>
                            )}
                    </div>
                </h1>

                <p className="language-description">
                    Kỷ niệm ngày Quốc khánh nước
                    Cộng hòa xã hội chủ nghĩa Việt
                    Nam
                </p>

                <div className="language-buttons">
                    <button
                        className={`language-card ${
                            selected === "vi"
                                ? "active"
                                : ""
                        }`}
                        disabled={loading}
                        onClick={() =>
                            handleSelect("vi")
                        }
                    >
                        <div className="language-left">
                            <span className="language-flag">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                                    alt="Vietnam Flag"
                                />
                            </span>

                            <div className="language-info">
                                <h3>
                                    Tiếng Việt
                                </h3>

                                <p>
                                    Xin chào! Mình
                                    nói tiếng Việt
                                </p>
                            </div>
                        </div>

                        {selected === "vi" && (
                            <div className="language-check">
                                ✓
                            </div>
                        )}
                    </button>

                    <button
                        className={`language-card ${
                            selected === "en"
                                ? "active"
                                : ""
                        }`}
                        disabled={loading}
                        onClick={() =>
                            handleSelect("en")
                        }
                    >
                        <div className="language-left">
                            <span className="language-flag">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                                    alt="UK Flag"
                                />
                            </span>

                            <div className="language-info">
                                <h3>
                                    English
                                </h3>

                                <p>
                                    Hello! I speak
                                    English
                                </p>
                            </div>
                        </div>

                        {selected === "en" && (
                            <div className="language-check">
                                ✓
                            </div>
                        )}
                    </button>
                </div>

                <div className="language-footer">
                    © Lược sử và Source code. All rights reserved.
                </div>
            </div>
        </section>
    );
}