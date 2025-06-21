"use client";

import { motion } from "framer-motion";

const POSTS = [
  {
    title: "Introducing UniversityCube: Academia's New Networking Platform",
    summary: "Crafting UniversityCube for scholars",
    link: "/writing/academic-software",
  },
  //   {
  //     title: "Trading Bot Strategy",
  //     summary: "Risk-managed automated trades",
  //     link: "/writing/trading-strategy",
  //   },
];

export default function Writings() {
  return (
    <section id="writings" className="max-w-3xl mx-auto py-20">
      <h2 className="text-5xl font-bold text-center mb-12">Writings</h2>
      <div className="space-y-8">
        {POSTS.map((post, i) => (
          <motion.a
            key={post.title}
            href={post.link}
            className="block p-6 bg-secondary-foreground/20 rounded-2xl shadow hover:bg-secondary-foreground/30 transition"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground">{post.summary}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
