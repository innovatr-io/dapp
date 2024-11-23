import { useState, useEffect } from "react";
import { Project } from "../market-data-access";
import { ProjectCard } from "./project-card";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter((p) => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredProjects.length - visibleCount);
  
  const scroll = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex(Math.max(0, currentIndex - visibleCount));
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + visibleCount));
    }
  };

  if (!featuredProjects.length) return null;

  const visibleProjects = featuredProjects.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">
            {currentIndex + 1}-{Math.min(currentIndex + visibleCount, featuredProjects.length)} of {featuredProjects.length}
          </span>
          <div className="flex gap-2">
            <button
              className="btn btn-circle btn-sm"
              onClick={() => scroll("prev")}
              disabled={currentIndex === 0}
            >
              ←
            </button>
            <button
              className="btn btn-circle btn-sm"
              onClick={() => scroll("next")}
              disabled={currentIndex >= maxIndex}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300"
        >
          {visibleProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} featured />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}