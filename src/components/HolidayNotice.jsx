import { useEffect, useRef, useState } from "react";

export default function NationalDayNotice({ lang = "vi" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    const isEnglish = lang === "en";

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className={`
                relative
                px-4
                py-10
                overflow-hidden

                transition-all
                duration-1000
                ease-out

                ${
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                }
            `}
        >
            <div
                className="
                    group
                    relative
                    max-w-6xl
                    mx-auto

                    overflow-hidden
                    rounded-lg

                    border
                    border-yellow-500/30

                    bg-white/[0.04]

                    shadow-[0_20px_60px_rgba(0,0,0,0.25)]

                    backdrop-blur-md

                    px-7
                    py-8
                    md:px-10
                    md:py-10

                    transition-all
                    duration-500

                    hover:-translate-y-1
                    hover:border-yellow-400/50
                    hover:shadow-[0_25px_70px_rgba(255,205,0,0.10)]
                "
            >
                {/* BACKGROUND GLOW */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -top-24
                        left-1/2
                        h-48
                        w-48
                        -translate-x-1/2
                        rounded-full
                        bg-yellow-400/10
                        blur-3xl
                        transition-all
                        duration-700
                        group-hover:scale-150
                        group-hover:bg-yellow-400/15
                    "
                />

                {/* LIGHT SWEEP */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        top-0
                        left-[-120%]
                        h-full
                        w-[60%]
                        skew-x-[-20deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        transition-all
                        duration-[1200ms]
                        group-hover:left-[140%]
                    "
                />

                {/* CONTENT */}

                <div className="relative z-10">

                    {/* LABEL */}

                    <div
                        className="
                            mb-3
                            text-xs
                            md:text-sm
                            font-bold
                            tracking-[0.16em]
                            text-white/65
                            uppercase
                        "
                    >
                        {isEnglish ? "NOTICE" : "THÔNG BÁO"}
                    </div>

                    {/* TITLE */}

                    <h2
                        className="
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl
                            font-black
                            leading-tight
                            text-white
                            transition-all
                            duration-500
                            group-hover:text-yellow-300
                        "
                    >
                        {isEnglish
                            ? "National Day Holiday 2026"
                            : "Lịch nghỉ Quốc khánh 2026"}
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-2
                            max-w-5xl
                            text-sm
                            sm:text-base
                            md:text-lg
                            leading-relaxed
                            text-white/65
                        "
                    >
                        {isEnglish
                            ? "For public employees and civil servants, the 2026 National Day holiday lasts 5 consecutive days, from Saturday, August 29 to Wednesday, September 2, 2026."
                            : "Theo phương án nghỉ lễ Quốc khánh năm 2026, cán bộ, công chức, viên chức được nghỉ 5 ngày liên tục từ Thứ Bảy 29/08 đến hết Thứ Tư 02/09/2026."}
                    </p>

                    {/* INFORMATION */}

                    <div className="mt-6 space-y-3">

                        {/* ITEM 1 */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                text-sm
                                md:text-base
                                font-semibold
                                text-white/85
                                transition-all
                                duration-300
                                hover:translate-x-2
                                hover:text-yellow-300
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-yellow-400/10
                                    text-yellow-300
                                "
                            >
                                📅
                            </span>

                            <span>
                                {isEnglish
                                    ? "Holiday: August 29 - September 2, 2026"
                                    : "Nghỉ: 29/08 - 02/09/2026"}
                            </span>
                        </div>

                        {/* ITEM 2 */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                text-sm
                                md:text-base
                                font-semibold
                                text-white/85
                                transition-all
                                duration-300
                                hover:translate-x-2
                                hover:text-yellow-300
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-yellow-400/10
                                    text-yellow-300
                                "
                            >
                                🔄
                            </span>

                            <span>
                                {isEnglish
                                    ? "Make-up working day: Saturday, August 22, 2026"
                                    : "Làm bù: Thứ Bảy 22/08/2026"}
                            </span>
                        </div>

                        {/* ITEM 3 */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                text-sm
                                md:text-base
                                font-semibold
                                text-white/85
                                transition-all
                                duration-300
                                hover:translate-x-2
                                hover:text-yellow-300
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-yellow-400/10
                                    text-yellow-300
                                "
                            >
                                🏢
                            </span>

                            <span>
                                {isEnglish
                                    ? "Businesses: September 2 + September 1 or September 3, according to the employer's announced plan"
                                    : "Doanh nghiệp: Nghỉ 02/09 và thêm 01/09 hoặc 03/09 theo phương án của đơn vị"}
                            </span>
                        </div>

                        {/* NOTE */}

                        <div
                            className="
                                mt-5
                                rounded-lg
                                border
                                border-yellow-500/10
                                bg-yellow-400/[0.04]
                                px-4
                                py-3
                                text-sm
                                leading-relaxed
                                text-white/60
                            "
                        >
                            {isEnglish
                                ? "Note: Schools, businesses and organizations with specific operating schedules may arrange holidays differently according to their applicable regulations and official announcements."
                                : "Lưu ý: Trường học, doanh nghiệp và các đơn vị có lịch làm việc đặc thù có thể bố trí lịch nghỉ khác theo quy định và thông báo chính thức của từng đơn vị."}
                        </div>
                    </div>
                </div>

                {/* BOTTOM DECORATION */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-0
                        bg-gradient-to-r
                        from-red-600
                        via-yellow-400
                        to-red-600
                        transition-all
                        duration-700
                        group-hover:w-full
                    "
                />
            </div>
        </section>
    );
}