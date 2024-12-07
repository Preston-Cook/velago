interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 6 }: SpinnerProps) {
  return (
    <div
      className={`inline-block size-${size} animate-spin rounded-full border-[2px] border-current border-t-transparent text-foreground`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
