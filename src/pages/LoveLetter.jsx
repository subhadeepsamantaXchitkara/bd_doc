import React, { useEffect, useRef, useState } from 'react'

const LoveLetter = () => {
    const lettersData = [
        {
            id: 1,
            name: "Your Bor",
            msg: "And finally, today is all about you Happy Birthday 🩵🫂 to the girl who entered my life with just an \"Oi...\" and somehow became one of the most beautiful reasons behind my happiness. Thank you for being a part of my life, for choosing us and for making this journey so special. I don't know what tomorrow holds, but I know one thing — I want countless more birthdays with you, countless more memories and an endless journey together. Keep smiling, keep shining and keep being my favourite person. Happy Birthday, My Mystery Girl, My Favourite Person, My Love! ❤️🫂I love you more than words could ever explain. ❤️",
        },
        {
            id: 2,
            name: "Your Bor",
            msg: "I want to keep choosing you, through every smile, every argument, every difficult day and every beautiful moment. I want us to grow together, stay close and create countless unforgettable memories.",
        },
        {
            id: 3,
            name: "Your Bor",
            msg: "I don't wish for a relationship without disagreements. I just wish that we always understand each other a little better, forgive a little faster and love each other a little deeper.",
        },
        {
            id: 4,
            name: "Your Bor",
            msg: "And you know what? The sweetest part is that we never gave up on each other. No matter how difficult things became, we always found our way back. And somehow, after every fight, we became even closer. ❤️",
        },
        {
            id: 5,
            name: "Your Bor",
            msg: "Of course, misunderstandings came along. Sometimes we fought, sometimes we questioned whether we were perfect for each other. But perhaps that's what makes our story real.",
         },
        {
            id: 6,
            name: "Your Bor",
            msg: "Slowly, we became comfortable with each other. No hesitation, no unnecessary thoughts, just two hearts sharing everything without wondering whether it was right or wrong.",
        },
        {
            id: 7,
            name: "Your Bor",
            msg: "That day, we were both nervous, confused and probably struggling to express what we truly felt. But somehow, we both understood one thing — we loved each other.",
        },
        {
            id: 8,
            name: "Your Bor",
            msg: "And then, after almost two years of that rejection, the most unexpected thing happened. You finally accepted me. The girl I once thought I could never have was suddenly becoming mine.",
        },
        {
            id: 9,
            name: "Your Bor",
            msg: "And so, I kept waiting. Waiting for just one message from your side. Those little notifications might have meant nothing to you, but they could make my entire day. ❤️",
        },
        {
            id: 10,
            name: "Your Bor",
            msg: "But strangely, even after that rejection, something inside me felt that you had feelings too. Maybe you were stuck somewhere, unable to express them. Yet I never had enough courage to ask.",
        },
        {
            id: 11,
            name: "Your Bor",
            msg: "Still, one day I gathered all my courage and finally proposed to you. And, as expected, you rejected me. Maybe our paths were different, or perhaps the timing wasn't right.",
        },
        {
            id: 12,
            name: "Your Bor",
            msg: "But I always convinced myself that it was just daydreaming. Something beautiful that could never become reality. After all, I had almost 0% hope that you would ever accept me.",
        },
        {
            id: 13,
            name: "Your Bor",
            msg: "Day by day, without even realising it, you started making a permanent place in my heart. You became the person I wanted to think about all day.",
        },
        {
            id: 14,
            name: "Your Bor",
            msg: "Days passed, conversations grew, and slowly you became the mystery girl I couldn't stop thinking about. Someone I never expected to become so special.",
        },
        {
            id: 15,
            name: "Your Bor",
            msg: "Everything was shattered with an \"Oi...\" and one chemistry question. Little did I know that day would become the beginning of the most beautiful chapter of my life.",
        },

    ];
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const lettersContainerRef = useRef(null);
    useEffect(() => {
        setLetters(lettersData);
    }, []);
    // Drag logic
    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;

        const rect = letterEl.getBoundingClientRect();

        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;

        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;
        letterEl.style.zIndex = zIndexCounter;

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };


    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };


    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden'>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>Envelope Of Love</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>Dear Mam Mam</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className="munna letters" ref={lettersContainerRef}>
                    {letters.map((letter) => (
                        <blockquote
                            key={letter.id}
                            className="munna letter center -translate-x-1/2 -translate-y-1/2"
                            id={letter.id}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: window.innerWidth < 768 ? '53%' : '50%',
                                left: window.innerWidth < 768 ? '50%' : '50%',
                                transform: 'none',
                            }}

                            onMouseDown={(e) => handleMouseDown(e, letter.id)}
                            onTouchStart={handleMouseDown}
                        >
                            <button
                                className="munna closeLetter"
                                title={`Close ${letter.name}'s letter`}
                                onClick={() => handleCloseLetter(letter.id)}
                            >
                                Close {letter.name}'s letter
                            </button>
                            <p>{letter.msg}</p>
                            <cite>{letter.name}</cite>
                        </blockquote>
                    ))}
                </div>
            </section>


            {/* ------------------ Heart Beating  */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            {/* ------------------ Heart Falling  */}
            <div className="munna snowflakes z-0">
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />  </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
            </div>
        </main>
    )
}

export default LoveLetter