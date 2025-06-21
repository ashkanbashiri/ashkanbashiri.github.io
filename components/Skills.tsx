"use client";
import { motion } from "framer-motion";
const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "TailwindCSS",
  "Docker",
  "AI",
];
export default function Skills() {
  return (
    <section id="skills" className="max-w-xl mx-auto text-center py-20">
      <h2 className="text-5xl font-bold mb-12">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {SKILLS.map((skill, i) => (
          <motion.span
            key={skill}
            className="px-4 py-2 bg-primary/20 text-primary rounded-full font-medium shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
