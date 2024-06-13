interface AboutHeaderProps {
  title: string;
  subheading: string;
}

export function AboutHeader({ title, subheading }: AboutHeaderProps) {
  return (
    <section>
      <div className="px-4text-center mx-auto max-w-screen-xl pt-4 lg:px-12 lg:pb-10 lg:pt-16">
        <h1 className="mb-12 flex flex-row items-center justify-center text-center text-4xl font-bold leading-none tracking-tight text-primary md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="mb-12 text-center text-lg font-normal sm:px-16 lg:text-xl xl:px-48">
          {subheading}
        </p>
      </div>
    </section>
  );
}
