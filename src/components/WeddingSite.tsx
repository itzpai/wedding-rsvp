"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";

const fieldClass =
  "w-full border border-white/50 bg-white/10 px-4 py-3 text-base text-white outline-none focus-visible:ring-2 focus-visible:ring-[#f0d9a7]";

export default function WeddingSite() {
  const reduceMotion = useReducedMotion();
  const intro = useRef<HTMLDivElement>(null);
  const flap = useRef<HTMLDivElement>(null);
  const letter = useRef<HTMLDivElement>(null);
  const modalOverlay = useRef<HTMLDivElement>(null);
  const modalPanel = useRef<HTMLElement>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modal || reduceMotion) return;
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        modalOverlay.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.22, ease: "power1.out" },
      )
      .fromTo(
        modalPanel.current,
        { autoAlpha: 0, y: 28, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: "back.out(1.5)" },
        "-=0.08",
      );
    return () => {
      timeline.kill();
    };
  }, [modal, reduceMotion]);

  function openInvitation() {
    if (introOpen || !intro.current) return;
    if (reduceMotion) {
      setIntroOpen(true);
      return;
    }
    gsap
      .timeline({ onComplete: () => setIntroOpen(true) })
      .call(() =>
        intro.current
          ?.querySelector(".envelope-button")
          ?.classList.add("is-opening"),
      )
      .to(".envelope-seal", {
        scale: 0.5,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power1.in",
      })
      .to(flap.current, {
        rotateX: -180,
        z: -2,
        duration: 0.62,
        ease: "power2.inOut",
      })
      .to(
        letter.current,
        { y: -190, z: 34, rotateX: 5, duration: 1, ease: "power3.out" },
        "-=0.34",
      )
      .to(
        intro.current,
        { autoAlpha: 0, duration: 0.65, ease: "power1.inOut" },
        "+=0.45",
      );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const element = event.currentTarget;
    const response = await fetch("/api/rsvps", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(element))),
    });
    setLoading(false);
    if (response.ok) {
      setMessage("Thank you — your RSVP has been received.");
      element.reset();
    } else setMessage("We couldn’t save your response. Please try again.");
  }

  return (
    <>
      {!introOpen && (
        <div
          ref={intro}
          className="invitation-intro"
          role="dialog"
          aria-label="Wedding invitation"
        >
          <p className="invitation-kicker">Together Wedding</p>
          <p className="invitation-names">
            Pyae <em>&amp;</em> Mon
          </p>
          <p className="invitation-date">November 07, 2026 · Yangon</p>
          <button
            className="envelope-button"
            onClick={openInvitation}
            aria-label="Open wedding invitation"
          >
            <span className="envelope-particle particle-one" aria-hidden="true">
              ✦
            </span>
            <span className="envelope-particle particle-two" aria-hidden="true">
              ✧
            </span>
            <span
              className="envelope-particle particle-three"
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className="envelope-particle particle-four"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="envelope-letter" ref={letter}>
              You’re invited
              <br />
              <strong>Pyae &amp; Mon</strong>
              <br />
              November 07, 2026
            </span>
            <span className="envelope-back" />
            <span className="envelope-front" />
            <span className="envelope-flap" ref={flap} />
            <span className="envelope-seal">P&nbsp;·&nbsp;M</span>
          </button>
          <button className="invitation-open" onClick={openInvitation}>
            Open invitation <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
      <a
        className="fixed left-3 top-3 z-50 -translate-y-[180%] bg-ink px-4 py-3 text-white focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <main
        id="main"
        className="mx-auto max-w-[1040px] overflow-hidden bg-paper"
      >
        <motion.section
          id="home"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto my-5 grid w-[calc(100%-32px)] grid-cols-1 items-center gap-6 overflow-hidden bg-paper p-6 sm:grid-cols-2 sm:gap-[clamp(20px,5vw,58px)] sm:p-[clamp(26px,5vw,56px)]"
        >
          <motion.img
            className="pointer-events-none absolute -left-2 top-[12%] z-10 w-[clamp(42px,7vw,76px)] -rotate-12 opacity-75 mix-blend-multiply sm:left-[3%]"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 34, -22, 18, 0],
                    y: [0, -28, 20, 38, 0],
                    rotate: [-12, -4, -18, -7, -12],
                  }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            src="/assets/6278037053748483020-removebg-preview.png"
            alt=""
            aria-hidden="true"
          />
          <motion.img
            className="pointer-events-none absolute bottom-[7%] right-[3%] z-10 w-[clamp(56px,9vw,104px)] rotate-6 opacity-75 mix-blend-multiply"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -28, 24, -12, 0],
                    y: [0, 22, -32, -16, 0],
                    rotate: [6, 14, 0, 10, 6],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -4,
            }}
            src="/assets/6278037053748483027-removebg-preview.png"
            alt=""
            aria-hidden="true"
          />
          <motion.img
            className="pointer-events-none absolute right-[8%] top-[8%] z-10 hidden w-14 rotate-12 opacity-65 mix-blend-multiply sm:block"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -20, 28, 12, 0],
                    y: [0, 34, 8, -26, 0],
                    rotate: [12, 4, 18, 8, 12],
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -8,
            }}
            src="/assets/6278037053748483020-removebg-preview.png"
            alt=""
            aria-hidden="true"
          />
          <motion.img
            className="pointer-events-none absolute bottom-[10%] left-[2%] z-10 w-[clamp(50px,8vw,92px)] -rotate-6 opacity-75 mix-blend-multiply sm:left-[8%]"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 26, -18, -30, 0],
                    y: [0, -20, -34, 14, 0],
                    rotate: [-6, 2, -14, -2, -6],
                  }
            }
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -12,
            }}
            src="/assets/6278037053748483092-removebg-preview.png"
            alt=""
            aria-hidden="true"
          />
          <div className="relative w-full overflow-hidden">
            <img
              className="h-[clamp(210px,68vw,380px)] w-full object-cover object-[center_40%] sm:h-[380px]"
              src="/assets/6278037053748483009.jpg"
              alt="Pyae and Mon celebrating together"
            />
          </div>
          <div className="flex min-w-0 flex-col items-center text-center">
            <h1 className="my-3 w-full whitespace-nowrap font-typewriter text-[clamp(32px,5.2vw,68px)] font-bold leading-tight tracking-wide">
              Pyae <em>&amp;</em> Mon
            </h1>
            <p className="mb-7 max-w-[400px] font-serif text-sm leading-relaxed text-[#5c554b] sm:text-base">
              Celebrate our union with us on November 07, 2026, at Sky Star
              Hotel, Yangon.
            </p>
            <button
              className="rsvp-shake min-h-12 min-w-[130px] bg-ink px-5 text-[10px] uppercase tracking-[.11em] text-paper transition hover:-translate-y-0.5 hover:bg-[#454237]"
              onClick={() => setModal(true)}
            >
              RSVP
            </button>
          </div>
        </motion.section>

        <motion.section
          id="our-story"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-paper px-6 py-10 sm:px-[clamp(24px,7vw,82px)] sm:py-[clamp(38px,5vw,60px)]"
        >
          <div className="mx-auto grid max-w-[880px] items-center gap-5 sm:grid-cols-2 sm:gap-[6%]">
            <div>
              <h2 className="font-typewriter text-[clamp(28px,3vw,36px)] font-bold leading-tight lowercase">
                the biggest party
                <br />
                of our lives
              </h2>
              <p className="mt-5 max-w-[440px] font-serif text-sm leading-relaxed sm:text-[15px]">
                From a chance encounter to a journey filled with unforgettable
                memories, every step has brought us closer to this moment. We
                are so excited to celebrate our special day with the people who
                mean the world to us. Get ready for a wonderful celebration as
                we begin our forever together.
              </p>
            </div>
            <div className="relative isolate min-h-[270px] w-full max-w-[420px] justify-self-center bg-[linear-gradient(135deg,#e8ddcb_0_12%,transparent_12%_85%,#d7e1dd_85%)] before:absolute before:inset-[12%_-4%_0_14%] before:-z-10 before:rotate-3 before:bg-[repeating-linear-gradient(135deg,#c9d6d3_0_7px,#e7e5d9_7px_14px)] sm:min-h-[310px] sm:justify-self-end">
              <img
                className="absolute right-0 top-[2%] z-[1] h-[62%] w-[64%] rotate-[5deg] bg-[#fdfbf6] object-cover p-[6px] pb-4 shadow-lg"
                src="/assets/6278037053748483010.jpg"
                alt="Pyae and Mon sharing a joyful moment on a pink backdrop"
              />
              <img
                className="absolute bottom-[1%] left-[4%] z-[2] h-[54%] w-[62%] -rotate-4 bg-[#fdfbf6] object-cover p-[6px] pb-4 shadow-lg"
                src="/assets/6278037053748483011.jpg"
                alt="Pyae and Mon in traditional wedding attire"
              />
              <img
                className="absolute left-[30%] top-1/4 z-[3] w-10 rotate-[-12deg] mix-blend-multiply sm:w-[58px]"
                src="/assets/6278037053748483020-removebg-preview.png"
                alt=""
              />
              <img
                className="absolute bottom-0 right-0 z-[4] w-[22%] -rotate-6 mix-blend-multiply"
                src="/assets/6278037053748483027-removebg-preview.png"
                alt=""
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          id="the-day"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-paper px-5 py-10 sm:px-[clamp(22px,6vw,70px)] sm:py-[clamp(36px,4.5vw,54px)]"
        >
          <h2 className="font-typewriter text-center text-3xl font-bold lowercase sm:text-4xl">
            about the reception
          </h2>
          <div className="mx-auto mt-6 grid max-w-[880px] grid-cols-1 items-start gap-4 sm:grid-cols-3 sm:gap-3">
            {[
              [
                "6278037053748483021-removebg-preview.png",
                "venue",
                "Sky Star Hotel, No.(51), East Horse Race Road, Tamwe, Yangon — a cozy indoor venue ready for a wonderful celebration.",
              ],
              [
                "6278037053748483022-removebg-preview.png",
                "attire",
                "Smart casual — polished but comfy. Dress nicely and comfortably to enjoy the celebration to the fullest.",
              ],
              [
                "6278037053748483023-removebg-preview.png",
                "kids",
                "Yes, your little ones are welcome! The venue is family-friendly.",
              ],
            ].map(([image, title, copy]) => (
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay:
                    title === "venue" ? 0 : title === "attire" ? 0.12 : 0.24,
                }}
                className="grid grid-cols-[72px_1fr] items-center gap-x-3 text-left sm:block sm:px-2 sm:py-4 sm:text-center"
                key={title}
              >
                <img
                  className="row-span-2 mx-auto h-16 w-[72px] object-contain sm:mb-2 sm:h-[clamp(56px,9vw,92px)] sm:w-full"
                  src={`/assets/${image}`}
                  alt=""
                />
                <h3 className="mb-1 font-typewriter text-lg font-bold sm:mb-2 sm:text-[22px]">
                  {title}
                </h3>
                <p className="m-0 text-xs leading-relaxed sm:mx-auto sm:max-w-[230px] sm:text-sm">
                  {copy}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="border-t-[18px] border-[#e9e4d6] bg-paper px-6 pt-12 text-center"
        >
          <p className="mb-2 text-[10px] font-bold tracking-[.12em]">
            NOVEMBER 07, 2026 · SKY STAR HOTEL
          </p>
          <h2 className="mb-7 font-typewriter text-3xl font-bold lowercase sm:text-[38px]">
            program of events
          </h2>
          <div className="relative isolate mx-auto min-h-[250px] w-full max-w-[620px] bg-[linear-gradient(90deg,#e5dfcf,#f9f6ed_14%_86%,#e5dfcf)] px-[6%] py-6 sm:px-[14%]">
            <img
              className="absolute left-[1%] top-1/4 w-[18%] z-20 max-w-[100px] mix-blend-multiply"
              src="/assets/6278037053748483090-removebg-preview.png"
              alt=""
            />
            <div className="relative z-0 mx-auto max-w-[520px] bg-[#eee8d8] bg-[linear-gradient(#f6f2e74d,#f6f2e74d),url('/assets/6278037053748483024.jpg')] bg-cover bg-[center_72%] p-3 text-left shadow-md">
              {[
                ["9:00 AM", "Arrival & Welcome Drinks"],
                ["9:30 AM", "Wedding Ceremony"],
                ["10:00 AM", "Refreshments & Photos"],
                ["11:00 AM", "Closing & Farewell"],
              ].map(([time, event]) => (
                <p
                  className="grid grid-cols-[76px_1fr] gap-3 border-b border-ink/10 bg-[#f7f4eb6b] px-2 py-3 font-serif text-xs sm:grid-cols-[110px_1fr] sm:gap-4 sm:text-sm"
                  key={time}
                >
                  <time className="font-typewriter font-bold">{time}</time>
                  <span>{event}</span>
                </p>
              ))}
            </div>
            <img
              className="absolute right-[2%] top-[12%] z-20 w-10 mix-blend-multiply sm:w-[52px]"
              src="/assets/6278037053748483020-removebg-preview.png"
              alt=""
            />
            <img
              className="absolute bottom-[8%] right-0 z-20 w-[18%] max-w-[112px] rotate-6 mix-blend-multiply"
              src="/assets/6278037053748483091-removebg-preview.png"
              alt=""
            />
          </div>
          <img
            className="relative z-20 mt-5 h-[clamp(44px,7vw,72px)] w-full object-cover"
            src="/assets/6278037053748483026-removebg-preview.png"
            alt=""
          />
        </motion.section>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden bg-paper px-6 pt-2 pb-10 text-center sm:px-[clamp(24px,8vw,88px)]"
        >
          {/* <img
            className="mb-5 h-[clamp(44px,7vw,72px)] w-full object-cover"
            src="/assets/6278037053748483029-removebg-preview.png"
            alt=""
          /> */}
          <h2 className="my-8 font-typewriter text-3xl font-bold lowercase sm:text-[38px]">
            gift registry
          </h2>
          <p className="font-typewriter text-sm font-bold">
            Your presence is truly the best gift we could ask for.
          </p>
          <div className="mx-auto mt-6 grid max-w-[620px] grid-cols-1 justify-items-center gap-5 text-center sm:grid-cols-[160px_1fr] sm:items-center sm:justify-items-center sm:gap-6 sm:text-center">
            <img
              className="h-40 w-40 bg-white p-2 object-contain shadow sm:h-40 sm:w-40"
              src="/assets/6278037053748483008.jpg"
              alt="Gift registry QR code"
            />
            <p className="m-0 font-serif text-sm leading-relaxed">
              Your love and support mean everything to us. Should you wish to
              give a gift, a monetary contribution would be greatly appreciated
              as we start our new life together.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative isolate min-h-[250px] overflow-hidden bg-paper px-6 py-10 font-serif sm:min-h-[350px] sm:px-[clamp(24px,8vw,88px)] sm:py-10"
        >
          <h2 className="relative z-10 font-typewriter text-xl font-bold sm:text-[27px]">
            for related questions or
            <br />
            concerns, please contact:
          </h2>
          <div className="relative z-10 mt-6 grid max-w-[500px] grid-cols-2 gap-5 font-bold">
            {[
              ["Pyae", "09977144823", "pyaehein150896@gmail.com"],
              ["Mon", "09446433577", "ayechanmon.ac21@gmail.com"],
            ].map(([name, phone, email]) => (
              <div key={name}>
                <p className="mb-2 font-typewriter text-lg">{name}</p>
                <span className="block text-xs">Phone</span>
                <a
                  className="mb-3 block text-xs underline underline-offset-4"
                  href={`tel:${phone}`}
                >
                  {phone}
                </a>
                <span className="block text-xs">Email</span>
                <a
                  className="block break-all text-xs underline underline-offset-4"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            ))}
          </div>
          <img
            className="pointer-events-none absolute bottom-10 right-0 -z-0 w-[28%] mix-blend-multiply sm:w-[min(34%,230px)]"
            src="/assets/6278037053748483025-removebg-preview.png"
            alt=""
          />
        </motion.section>
      </main>

      {modal && (
        <div
          ref={modalOverlay}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#211e19a8] p-[18px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal(false);
          }}
        >
          <section
            ref={modalPanel}
            className="relative max-h-[90dvh] w-full max-w-[520px] overflow-y-auto bg-olive px-[clamp(22px,6vw,52px)] py-9 text-[#f6f1e7] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
          >
            <button
              className="absolute right-3 top-2 h-11 w-11 text-3xl text-white focus-visible:outline-2 focus-visible:outline-[#f0d9a7]"
              aria-label="Close RSVP form"
              onClick={() => setModal(false)}
            >
              ×
            </button>
            <p className="text-[10px] uppercase tracking-[.19em]">
              P &amp; M · RSVP
            </p>
            <h2 id="rsvp-title" className="mt-4 text-4xl sm:text-5xl">
              Will you join us?
            </h2>
            <form
              className="mx-auto mt-6 w-full max-w-[520px]"
              onSubmit={submit}
            >
              <label
                className="mb-2 block text-xs tracking-wide"
                htmlFor="guest-name"
              >
                Your full name:
              </label>
              <input
                className={`${fieldClass} mb-5`}
                id="guest-name"
                name="fullName"
                autoComplete="name"
                required
                maxLength={120}
              />
              <fieldset className="mb-5 min-w-0 border-0 p-0">
                <legend className="mb-2 text-xs tracking-wide">
                  Will you be attending our wedding?:
                </legend>
                {[
                  ["Joyfully accepts", "Joyfully accepts"],
                  ["Regretfully declines", "Regretfully declines"],
                ].map(([label, value], i) => (
                  <label
                    className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"
                    key={value}
                  >
                    <input
                      className="h-[18px] w-[18px] accent-[#f2e8d7] focus-visible:outline-2 focus-visible:outline-[#f0d9a7]"
                      type="radio"
                      name="attendance"
                      value={value}
                      required={i === 0}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
              <label
                className="mb-2 block text-xs tracking-wide"
                htmlFor="guest-count"
              >
                How many guests including you will attend?:
              </label>
              <input
                className={`${fieldClass} mb-5`}
                id="guest-count"
                name="guestCount"
                type="number"
                min="1"
                max="20"
                defaultValue="1"
                required
              />
              <button
                className="mt-2 min-h-12 w-full bg-paper px-5 text-xs uppercase tracking-widest text-ink hover:bg-white disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send RSVP"} <span>↗</span>
              </button>
              <p
                className="mt-4 text-center text-[10px] leading-relaxed"
                aria-live="polite"
              >
                {message || "November 7, 2026 · Sky Star Hotel, Yangon"}
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
