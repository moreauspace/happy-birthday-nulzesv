import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Cake, Gift, Sparkles, Heart, Music, Camera } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "wishes", label: "Wishes" },
  { id: "gallery", label: "Gallery" },
  { id: "memories", label: "Memories" },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BirthdayPage() {
  const [active, setActive] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [wishesRevealed, setWishesRevealed] = useState([
    false,
    false,
    false,
    false,
  ]);
  const controls = useAnimation();
  const refs = useRef({});

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            controls.start("visible");
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.3 }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [controls]);

  const images = new Array(6).fill(0).map((_, i) => `${i + 1}.png`);

  const wishes = [
    {
      icon: Heart,
      title: "Health & Happiness",
      text: "May you be blessed with good health and endless joy throughout the year.",
    },
    {
      icon: Sparkles,
      title: "Dreams Come True",
      text: "May all your dreams and aspirations manifest into beautiful reality.",
    },
    {
      icon: Gift,
      title: "Success & Prosperity",
      text: "May success follow you in every endeavor and prosperity fill your life.",
    },
    {
      icon: Cake,
      title: "Love & Laughter",
      text: "May you be surrounded by love, laughter, and cherished moments always.",
    },
  ];

  const memories = [
    { emoji: "🎂", text: "First time we celebrated together" },
    { emoji: "🎈", text: "First time I said 'Happy Birthday' to you" },
    { emoji: "🎁", text: "This gift that I hope you never forget" },
    { emoji: "🎉", text: "Happines in your birthday moment" },
    { emoji: "🎮", text: "The moment when we met in vrchat" },
    { emoji: "📸", text: "Photos in VRChat we'll treasure forever" },
  ];

  const toggleWish = (index) => {
    const newRevealed = [...wishesRevealed];
    newRevealed[index] = !newRevealed[index];
    setWishesRevealed(newRevealed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-indigo-50 text-gray-800 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: ["#ec4899", "#8b5cf6", "#f472b6", "#fbbf24"] },
            shape: {
              type: ["circle", "triangle", "polygon"],
              polygon: { sides: 5 },
            },
            opacity: {
              value: { min: 0.3, max: 0.7 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            size: {
              value: { min: 2, max: 6 },
              animation: { enable: true, speed: 2, sync: false },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "top",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
            rotate: {
              value: { min: 0, max: 360 },
              direction: "random",
              animation: { enable: true, speed: 5 },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              grab: {
                distance: 140,
                links: { opacity: 0.5, color: "#ec4899" },
              },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 pointer-events-auto"
      />

      <header className="fixed w-full z-40 top-0 left-0 backdrop-blur-md bg-white/30 border-b border-pink-100">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Cake className="text-pink-600" size={28} />
            <div>
              <h1 className="text-lg font-semibold">Birthday Yuki</h1>
              <p className="text-xs -mt-1 text-gray-500">
                Wish you all the best
              </p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {sections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`cursor-pointer capitalize hover:text-pink-600 transition-colors ${
                  active === s.id
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setShowMenu(false)}
              >
                {s.label}
              </motion.a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setShowMenu((s) => !s)}
              className="p-2 bg-white/80 rounded-full shadow"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </nav>

        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/90 border-t"
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`py-2 ${
                    active === s.id ? "text-pink-600 font-semibold" : ""
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main className="pt-28 relative z-10">
        <section
          id="home"
          ref={(el) => (refs.current["home"] = el)}
          className="min-h-[80vh] flex items-center"
        >
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={sectionVariant}
              className="space-y-6"
            >
              <motion.p
                className="uppercase text-sm tracking-widest text-pink-600 flex items-center gap-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles size={16} /> 生日快乐, 兰月 | 6 October 2025
              </motion.p>
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Celebrate <span className="text-pink-600">Saeyuki's</span>{" "}
                Birthday
              </h2>
              <p className="text-gray-600 max-w-xl text-lg">
                Happy birthday to you, I hope all your wishes come true! Here's
                to another amazing year filled with joy, laughter, and
                unforgettable moments.
              </p>

              <div className="flex gap-3 items-center flex-wrap">
                <a
                  href="#wishes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-lg"
                >
                  <Gift size={18} /> View Wishes
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <Camera size={18} /> See Gallery
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <motion.div
                className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-200 to-purple-200 p-1"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={"/main.png"}
                  alt="birthday"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          id="wishes"
          ref={(el) => (refs.current["wishes"] = el)}
          className="py-20 bg-gradient-to-b from-transparent to-white/50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariant}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
                <Sparkles className="text-pink-600" /> Birthday Wishes{" "}
                <Sparkles className="text-pink-600" />
              </h3>
              <p className="text-gray-600">
                Click on each card to reveal your special wishes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishes.map((wish, idx) => {
                const Icon = wish.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => toggleWish(idx)}
                    className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg cursor-pointer border border-pink-100 hover:border-pink-300 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-pink-100 p-3 rounded-full">
                        <Icon className="text-pink-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">
                          {wish.title}
                        </h4>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: wishesRevealed[idx] ? "auto" : 0,
                            opacity: wishesRevealed[idx] ? 1 : 0,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-700">{wish.text}</p>
                        </motion.div>
                        {!wishesRevealed[idx] && (
                          <p className="text-pink-600 text-sm">
                            Click to reveal...
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="gallery"
          ref={(el) => (refs.current["gallery"] = el)}
          className="py-20 bg-gradient-to-b from-white/50 to-pink-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariant}
              className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2"
            >
              <Camera className="text-pink-600" /> Gallery
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                  className="overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={src}
                    alt={`gallery-${idx}`}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="memories"
          ref={(el) => (refs.current["memories"] = el)}
          className="py-20 bg-gradient-to-b from-pink-50 to-white"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariant}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
                <Heart className="text-pink-600" /> Cherished Memories
              </h3>
              <p className="text-gray-600">Lets make this moment cherish</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {memories.map((memory, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur p-5 rounded-xl shadow border border-pink-100 text-center"
                >
                  <div className="text-4xl mb-3">{memory.emoji}</div>
                  <p className="text-gray-700 font-medium">{memory.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 p-8 rounded-2xl"
            >
              <Music className="text-pink-600 mx-auto mb-4" size={32} />
              <h4 className="text-2xl font-bold mb-3">Here's to Many More!</h4>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Thank you for being such an amazing person. Your kindness,
                laughter, and spirit brighten everyone's day. May this birthday
                be just the beginning of a year filled with happy memories,
                wonderful moments, and all the blessings you deserve!
              </p>
              <motion.div
                className="mt-6 inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-4xl">🎉🎂🎈</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-gray-500 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <p>Made with 🎉 By M</p>
            <p className="mt-2 text-xs">
              Wishing you the happiest birthday ever!
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
