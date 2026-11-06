"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ProjectImage } from "@/content/types";

type Props = {
  images: ProjectImage[];
  projectTitle: string;
  priority?: boolean;
};

export function ProjectGallery({ images, projectTitle, priority = false }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  function goTo(direction: -1 | 1) {
    const element = scroller.current;
    if (!element) return;

    const width = element.clientWidth;
    const current = Math.round(element.scrollLeft / width);
    const next = (current + direction + images.length) % images.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    element.scrollTo({ left: next * width, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="bg-placeholder relative aspect-video w-full overflow-hidden">
      <div
        ref={scroller}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full shrink-0 snap-start">
            {image.url && (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 40vw, 100vw"
                priority={priority && index === 0}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute right-4 bottom-4 flex items-center gap-1">
          <GalleryButton
            label={`Imagem anterior de ${projectTitle}`}
            onClick={() => goTo(-1)}
            flipped
          />
          <GalleryButton
            label={`Imagem seguinte de ${projectTitle}`}
            onClick={() => goTo(1)}
          />
        </div>
      )}
    </div>
  );
}

type GalleryButtonProps = {
  label: string;
  onClick: () => void;
  flipped?: boolean;
};

function GalleryButton({ label, onClick, flipped = false }: GalleryButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="bg-control flex size-8 cursor-pointer items-center justify-center rounded-lg p-1 backdrop-blur-[20px] transition-colors hover:bg-[rgb(225_225_225/0.9)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/arrow-forward.svg"
        alt=""
        width={20}
        height={20}
        className={flipped ? "rotate-180" : undefined}
      />
    </button>
  );
}
