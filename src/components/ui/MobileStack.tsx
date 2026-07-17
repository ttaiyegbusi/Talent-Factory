import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileStackProps = {
  children: ReactNode[];
  /** px added to the sticky offset per card — the growing "peek" gap. */
  peek?: number;
  /** sticky offset (px from the viewport top) for the first card. */
  baseTop?: number;
  className?: string;
};

/**
 * Mobile-only sticky card stack. Each card sticks a little lower than the
 * one before it, so scrolling "lands" cards on top of one another with the
 * previous card's top edge peeking out above — a deck you flip through by
 * scrolling, instead of cards just floating past independently.
 *
 * `isolate` keeps the small z-indexes here from bleeding into unrelated
 * positioned elements elsewhere on the page.
 */
export default function MobileStack({
  children,
  peek = 20,
  baseTop = 16,
  className,
}: MobileStackProps) {
  return (
    <div className={cn("isolate", className)}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="sticky rounded-2xl shadow-[0_-10px_28px_-10px_rgba(0,0,0,0.18)]"
          style={{ top: baseTop + i * peek, zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
