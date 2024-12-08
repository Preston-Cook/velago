interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 4 }: SpinnerProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="status"
      aria-label="loading"
    >
      <div
        className={`inline-block size-${size} animate-spin rounded-full border-[2px] border-current border-t-transparent text-foreground`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
