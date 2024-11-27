export function Spinner() {
  return (
    <div
      className="inline-block size-6 animate-spin rounded-full border-[2px] border-current border-t-transparent text-foreground"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
