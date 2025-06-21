export default async function ResumePage() {
  return (
    <article className="prose dark:prose-invert  mx-auto space-y-8 w-full max-w-full">
      <h1 className="text-3xl font-headers text-primary-foreground">
        About Me
      </h1>
      <p className="font-p mb-6">View or download my resume below:</p>
      <iframe
        src="/ashkan_bashiri_resume.pdf"
        className="w-full h-[600px] border border-border rounded-[var(--radius)]"
        title="My Resume"
      ></iframe>
      <a
        href="/ashkan_bashiri_resume.pdf"
        download
        className="mt-4 inline-block text-primary-foreground underline hover:text-primary-foreground-subtle transition-colors"
      >
        Download Resume
      </a>
    </article>
  );
}
