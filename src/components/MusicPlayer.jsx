import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ListMusic,
    Pause,
    Play,
    RotateCcw,
    Volume2,
    VolumeX,
    X,
} from "lucide-react";

const tracks = [
    {
        id: 1,
        title: {
            vi: "Nhạc nền 1",
            en: "Background Music 1",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music1.mp3",
        cover: "/images/codang1.jpg",
    },
    {
        id: 2,
        title: {
            vi: "Nhạc nền 2",
            en: "Background Music 2",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music2.mp3",
        cover: "/images/codang1.jpg",
    },
    {
        id: 3,
        title: {
            vi: "Nhạc nền 3",
            en: "Background Music 3",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music3.mp3",
        cover: "/images/codang1.jpg",
    },
    {
        id: 4,
        title: {
            vi: "Nhạc nền 4",
            en: "Background Music 4",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music4.mp3",
        cover: "/images/codang1.jpg",
    },
    {
        id: 5,
        title: {
            vi: "Nhạc nền 5",
            en: "Background Music 5",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music5.mp3",
        cover: "/images/codang1.jpg",
    },
    {
        id: 6,
        title: {
            vi: "Nhạc nền 6",
            en: "Background Music 6",
        },
        artist: {
            vi: "Quốc Khánh Việt Nam",
            en: "Vietnam National Day",
        },
        file: "Music6.mp3",
        cover: "/images/codang1.jpg",
    },
];

function getMusicPath(file) {
    return `${import.meta.env.BASE_URL}Music/${file}`;
}

function formatTime(seconds) {
    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${String(
        remaining
    ).padStart(2, "0")}`;
}

export default function MusicPlayer({
    music,
    setMusic,
    lang = "vi",
}) {
    const [isOpen, setIsOpen] =
        useState(false);

    const [playlistOpen, setPlaylistOpen] =
        useState(false);

    const [isPlaying, setIsPlaying] =
        useState(false);

    const [currentTrack, setCurrentTrack] =
        useState(
            Number(
                window.__nationalDayTrackIndex
            ) || 0
        );

    const [currentTime, setCurrentTime] =
        useState(0);

    const [duration, setDuration] =
        useState(0);

    const [volume, setVolume] =
        useState(0.75);

    const isEnglish = lang === "en";

    const text = {
        vi: {
            kicker: "MUSIC PLAYER",
            title: "Nhạc nền",
            close: "Đóng",
            previous: "Bài trước",
            next: "Bài tiếp theo",
            replay: "Phát lại",
            play: "Phát nhạc",
            pause: "Tạm dừng",
            playlist: "Danh sách phát",
            openPlaylist:
                "Mở danh sách nhạc",
            closePlaylist:
                "Đóng danh sách nhạc",
            playing: "Đang phát",
            stopped: "Đang dừng",
            volume: "Âm lượng",
        },

        en: {
            kicker: "MUSIC PLAYER",
            title: "Background Music",
            close: "Close",
            previous: "Previous track",
            next: "Next track",
            replay: "Replay",
            play: "Play music",
            pause: "Pause",
            playlist: "Playlist",
            openPlaylist:
                "Open playlist",
            closePlaylist:
                "Close playlist",
            playing: "Playing",
            stopped: "Stopped",
            volume: "Volume",
        },
    };

    const ui =
        text[lang] || text.vi;

    const getAudio = () => {
        return window.__nationalDayAudio || null;
    };

    useEffect(() => {
        const audio = getAudio();

        if (!audio) return;

        const updatePlayState = () => {
            setIsPlaying(!audio.paused);
        };

        const updateTime = () => {
            setCurrentTime(
                audio.currentTime || 0
            );
        };

        const updateDuration = () => {
            setDuration(
                Number.isFinite(
                    audio.duration
                )
                    ? audio.duration
                    : 0
            );
        };

        audio.addEventListener(
            "play",
            updatePlayState
        );

        audio.addEventListener(
            "pause",
            updatePlayState
        );

        audio.addEventListener(
            "timeupdate",
            updateTime
        );

        audio.addEventListener(
            "loadedmetadata",
            updateDuration
        );

        updatePlayState();

        return () => {
            audio.removeEventListener(
                "play",
                updatePlayState
            );

            audio.removeEventListener(
                "pause",
                updatePlayState
            );

            audio.removeEventListener(
                "timeupdate",
                updateTime
            );

            audio.removeEventListener(
                "loadedmetadata",
                updateDuration
            );
        };
    }, []);

    useEffect(() => {
        const audio = getAudio();

        if (!audio) return;

        audio.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (music) {
            setIsPlaying(true);
        }
    }, [music]);

    const togglePlay = () => {
        const audio = getAudio();

        if (!audio) return;

        if (audio.paused) {
            audio.play().catch(() => {});
            setMusic(true);
        } else {
            audio.pause();
            setMusic(false);
        }
    };

    const changeTrack = (index) => {
        const audio = getAudio();

        if (!audio) return;

        window.__nationalDayTrackIndex =
            index;

        audio.src = getMusicPath(
            tracks[index].file
        );

        audio.currentTime = 0;

        audio.play().catch(() => {});

        setCurrentTrack(index);
        setMusic(true);
    };

    const nextTrack = () => {
        const next =
            (currentTrack + 1) %
            tracks.length;

        changeTrack(next);
    };

    const previousTrack = () => {
        const previous =
            (currentTrack -
                1 +
                tracks.length) %
            tracks.length;

        changeTrack(previous);
    };

    const replayTrack = () => {
        const audio = getAudio();

        if (!audio) return;

        audio.currentTime = 0;

        audio.play().catch(() => {});
        setMusic(true);
    };

    const handleSeek = (event) => {
        const audio = getAudio();

        if (!audio) return;

        const value = Number(
            event.target.value
        );

        audio.currentTime = value;
        setCurrentTime(value);
    };

    const handleVolume = (event) => {
        setVolume(
            Number(event.target.value)
        );
    };

    const toggleMute = () => {
        setVolume((prev) =>
            prev > 0 ? 0 : 0.75
        );
    };

    const track = tracks[currentTrack];

    const progress =
        duration > 0
            ? (currentTime / duration) * 100
            : 0;

    return (
        <>
            <button
                type="button"
                className={`music-navbar-button ${
                    music
                        ? "music-navbar-button--active"
                        : ""
                }`}
                aria-label={ui.title}
                aria-expanded={isOpen}
                onClick={() =>
                    setIsOpen(
                        (prev) => !prev
                    )
                }
            >
                {music ? (
                    <Volume2 size={18} />
                ) : (
                    <VolumeX size={18} />
                )}
            </button>

            <div
                className={`music-player-layer ${
                    isOpen
                        ? "music-player-layer--open"
                        : ""
                }`}
            >
                <div className="music-player">
                    <div className="music-player-header">
                        <div>
                            <span className="music-player-kicker">
                                {ui.kicker}
                            </span>

                            <h3>
                                {ui.title}
                            </h3>
                        </div>

                        <div className="music-player-header-actions">
                            <button
                                type="button"
                                className={`music-player-icon-button ${
                                    playlistOpen
                                        ? "music-player-icon-button--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setPlaylistOpen(
                                        (prev) =>
                                            !prev
                                    )
                                }
                            >
                                <ListMusic
                                    size={18}
                                />
                            </button>

                            <button
                                type="button"
                                className="music-player-close"
                                onClick={() =>
                                    setIsOpen(
                                        false
                                    )
                                }
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="music-player-cover-wrap">
                        <div
                            className={`music-player-disc ${
                                isPlaying
                                    ? "music-player-disc--playing"
                                    : ""
                            }`}
                        >
                            <img
                                src={track.cover}
                                alt={
                                    isEnglish
                                        ? "Vietnamese flag"
                                        : "Cờ Việt Nam"
                                }
                            />

                            <div className="music-player-disc-center">
                                <span />
                            </div>
                        </div>

                        <div className="music-player-bars">
                            {Array.from({
                                length: 7,
                            }).map(
                                (_, index) => (
                                    <span
                                        key={
                                            index
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="music-player-info">
                        <h4>
                            {
                                track.title[
                                    isEnglish
                                        ? "en"
                                        : "vi"
                                ]
                            }
                        </h4>

                        <p>
                            {
                                track.artist[
                                    isEnglish
                                        ? "en"
                                        : "vi"
                                ]
                            }
                        </p>
                    </div>

                    <div className="music-player-progress">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={Math.min(
                                currentTime,
                                duration || 0
                            )}
                            onChange={
                                handleSeek
                            }
                            style={{
                                "--progress": `${progress}%`,
                            }}
                        />

                        <div className="music-player-time">
                            <span>
                                {formatTime(
                                    currentTime
                                )}
                            </span>

                            <span>
                                {formatTime(
                                    duration
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="music-player-controls">
                        <button
                            type="button"
                            onClick={
                                previousTrack
                            }
                            aria-label={
                                ui.previous
                            }
                        >
                            <ChevronLeft
                                size={20}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={
                                replayTrack
                            }
                            aria-label={
                                ui.replay
                            }
                        >
                            <RotateCcw
                                size={17}
                            />
                        </button>

                        <button
                            type="button"
                            className="music-player-play"
                            onClick={
                                togglePlay
                            }
                            aria-label={
                                isPlaying
                                    ? ui.pause
                                    : ui.play
                            }
                        >
                            {isPlaying ? (
                                <Pause
                                    size={22}
                                    fill="currentColor"
                                />
                            ) : (
                                <Play
                                    size={22}
                                    fill="currentColor"
                                />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={nextTrack}
                            aria-label={
                                ui.next
                            }
                        >
                            <ChevronRight
                                size={20}
                            />
                        </button>
                    </div>

                    <div className="music-player-volume">
                        <button
                            type="button"
                            className="music-player-volume-button"
                            onClick={
                                toggleMute
                            }
                            aria-label={
                                ui.volume
                            }
                        >
                            {volume > 0 ? (
                                <Volume2
                                    size={18}
                                />
                            ) : (
                                <VolumeX
                                    size={18}
                                />
                            )}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={
                                handleVolume
                            }
                            style={{
                                "--volume": `${volume * 100}%`,
                            }}
                        />
                    </div>

                    <div
                        className={`music-player-playlist ${
                            playlistOpen
                                ? "music-player-playlist--open"
                                : ""
                        }`}
                    >
                        <div className="music-player-list-header">
                            <span>
                                {
                                    ui.playlist
                                }
                            </span>

                            <span>
                                {currentTrack +
                                    1}{" "}
                                /{" "}
                                {
                                    tracks.length
                                }
                            </span>
                        </div>

                        {tracks.map(
                            (item, index) => (
                                <button
                                    key={
                                        item.id
                                    }
                                    type="button"
                                    className={`music-track-item ${
                                        index ===
                                        currentTrack
                                            ? "music-track-item--active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        changeTrack(
                                            index
                                        )
                                    }
                                >
                                    <span className="music-track-number">
                                        {String(
                                            item.id
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <span className="music-track-text">
                                        <strong>
                                            {
                                                item
                                                    .title[
                                                    isEnglish
                                                        ? "en"
                                                        : "vi"
                                                ]
                                            }
                                        </strong>

                                        <small>
                                            {
                                                item
                                                    .artist[
                                                    isEnglish
                                                        ? "en"
                                                        : "vi"
                                                ]
                                            }
                                        </small>
                                    </span>
                                </button>
                            )
                        )}
                    </div>

                    <div className="music-player-footer">
                        <span
                            className={
                                isPlaying
                                    ? "music-status music-status--playing"
                                    : "music-status"
                            }
                        >
                            <i />

                            {isPlaying
                                ? ui.playing
                                : ui.stopped}
                        </span>

                        <span>
                            {isEnglish
                                ? "Vietnam National Day"
                                : "Quốc Khánh Việt Nam"}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}