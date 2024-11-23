import { useRef, useState, useEffect } from "react";
import { Project } from "../market-data-access";
import { ProjectCard } from "./project-card";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter((p) => p.featured);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || featuredProjects.length === 0) return;

    const checkPosition = () => {
      setIsAtStart(carousel.scrollLeft <= 10);
      setIsAtEnd(
        Math.abs(
          carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth)
        ) <= 10
      );
    };

    let interval: NodeJS.Timeout;

    const startAutoScroll = () => {
      if (isPaused) return;
      interval = setInterval(() => {
        if (isAtEnd) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
        }
      }, 5000);
    };

    carousel.addEventListener("scroll", checkPosition);
    checkPosition();
    startAutoScroll();

    return () => {
      clearInterval(interval);
      carousel.removeEventListener("scroll", checkPosition);
    };
  }, [featuredProjects.length, isAtEnd, isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!featuredProjects.length) return null;

  return featuredProjects.length ? (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} featured />
        ))}
      </div>
    </div>
  );
}
