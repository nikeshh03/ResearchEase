
import { BookOpenText } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <BookOpenText className="text-primary w-6 h-6" />
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full -z-10"></div>
      </div>
      <span className={cn("font-medium tracking-tight", sizeClasses[size])}>
        ResearchEase
      </span>
    </div>
  );
}
