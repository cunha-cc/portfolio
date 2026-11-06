// U+FE0E pede a versão em texto da seta, para o macOS e o iOS não a mostrarem como emoji.
const ARROW = "↗︎";

type Props = { href?: string | null; children: React.ReactNode };

/** Texto com seta ↗ quando tem link; sem link, fica só o texto. */
export function ExternalLink({ href, children }: Props) {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-offset-2 hover:underline"
    >
      {children}
      {ARROW}
    </a>
  );
}
