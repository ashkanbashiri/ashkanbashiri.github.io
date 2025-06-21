"use client";
import React from "react";
import dynamic from "next/dynamic";
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);
interface TextViewerProps {
  source: string;
}

const TextViewer = ({ source }: TextViewerProps) => {
  return (
    <MarkdownPreview
      className="w-full min-w-full px-6"
      source={source}
      style={{
        maxWidth: "100%",
        fontSize: "18px",
        lineHeight: "2rem",
        color: "hsl(var(--foreground))",
        backgroundColor: "hsl(var(--background))",
      }}
    ></MarkdownPreview>
  );
};

export default TextViewer;
