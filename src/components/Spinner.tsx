interface SpinnerProps {
  size?: number; // size in rem
}

export function Spinner({ size = 1 }: SpinnerProps) {
  const spinnerSize = `${size}rem`;

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="status"
      aria-label="loading"
    >
      <div
        style={{ width: spinnerSize, height: spinnerSize }}
        className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-foreground"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
