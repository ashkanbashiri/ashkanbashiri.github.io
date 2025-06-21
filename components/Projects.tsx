"use client";

import { motion } from "framer-motion";
const PROJECTS = [
  {
    title: "UniversityCube",
    description: "Academia networking & showcase platform",
    link: "https://universitycube.net",
    img: "/ucube.png",
  },
  //   {
  //     title: "Crypto Bot",
  //     description: "AI-driven trading bot",
  //     link: "#",
  //     img: "/crypto.png",
  //   },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-4xl mx-auto py-20">
      <h2 className="text-5xl font-bold text-center mb-12">Projects</h2>
      <div className="grid gap-8 md:grid-cols-2 h-fit">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-primary-foreground rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition h-fit"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="relative h-fit">
              <img
                src={p.img}
                alt={p.title}
                className="object-cover w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 opacity-0 group-hover:opacity-30 transition" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-primary group-hover:text-foreground transition">
                {p.title}
              </h3>
              <p className="text-muted-foreground">{p.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
