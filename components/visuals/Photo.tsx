import Image from "next/image";
import type { SiteImage } from "@/content/imagery";
import { cn } from "@/lib/cn";

/**
 * Photograph with consistent treatment. Reference (stock) images always carry
 * a visible tag so they are never mistaken for Fidelity's own projects.
 */
export function Photo({
  image,
  className,
  sizes = "100vw",
  priority,
  tagPosition = "bottom-left",
  tone,
  fill = true,
}: {
  image: SiteImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tagPosition?: "bottom-left" | "top-right" | "none";
  tone?: "warm" | "mono";
  fill?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden bg-charcoal", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          tone === "mono" && "grayscale-[0.85] contrast-[1.05]",
          tone === "warm" && "sepia-[0.12] saturate-[0.9]",
        )}
      />
      {image.reference && tagPosition !== "none" && (
        <figcaption
          className={cn(
            "eyebrow absolute z-10 max-w-[calc(100%-1.5rem)] truncate whitespace-nowrap bg-obsidian/65 px-2 py-1 !text-[0.66rem] !tracking-[0.14em] text-bone/80 backdrop-blur-[2px]",
            tagPosition === "bottom-left" ? "bottom-3 left-3" : "right-3 top-3",
          )}
        >
          Reference image
        </figcaption>
      )}
    </figure>
  );
}
