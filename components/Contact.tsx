"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className=" mx-auto flex flex-col items-center py-20 px-4 w-full"
    >
      <h2 className="text-5xl font-bold text-center mb-8">Get in Touch</h2>
      <motion.form
        className="space-y-6 bg-primary-foreground/10 p-8 rounded-3xl shadow-lg flex flex-col gap-4 min-w-[calc(min(100vw,800px))]  max-w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 rounded-full border border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-full border border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <textarea
          placeholder="Message"
          rows={4}
          className="w-full p-4 rounded-2xl border border-primary focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
        />
        <motion.button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
}
