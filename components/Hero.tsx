"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="text-center flex flex-col items-center gap-6 pt-20 w-full max-w-full"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          src="/logo.jpeg"
          alt="Ashkan Bashiri"
          width={160}
          height={160}
          className="rounded-full border-4 border-primary shadow-xl"
        />
      </motion.div>
      <motion.h1
        className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Ashkan Bashiri
      </motion.h1>
      <motion.h2
        className="text-xl text-muted-foreground"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Co-Founder & CTO @{" "}
        <a
          href="https://xnovative.com"
          className="underline hover:text-primary"
        >
          Xnovative
        </a>
        ,<br />
        Software Engineer @ UCLA Health
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground max-w-xl rounded-xl bg-gradient-to-l tracking-wide font-bold
         from-purple-50/50 to-pink-50/50 dark:from-purple-500/50 dark:to-pink-500/50 p-4 md:p-6 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        I build beautiful web products, and design delightful digital
        experiences.
      </motion.p>
    </section>
  );
}
