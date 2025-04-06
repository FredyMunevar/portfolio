import { useLoading } from "@/context/LoadingContext";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { CarouselProps } from "@/presentation/components/Carousel/interface/Carousel";
import { LogosType } from "@/presentation/components/Logos/interface/iLogos";
import { EmblaOptionsType } from "embla-carousel";
import { useState, useEffect } from "react";

/**
 * Interface representing the assets of a project.
 */
interface ProjectAssets {
  /** Array of design-related logos */
  designLogos: LogosType[];
  /** Array of development-related logos */
  devLogos: LogosType[];
  /** Groups of slides for the carousel, categorized by group name */
  slideGroups: Record<string, CarouselProps[]>;
  /** Options for the carousel */
  slideOptions: EmblaOptionsType;
}

/**
 * Custom hook to fetch and manage project assets such as design logos, development logos, and carousel slides.
 * This hook fetches data from the API and updates the state accordingly.
 *
 * @param {string} projectId - The ID of the project to fetch assets for
 * @returns {ProjectAssets} An object containing design logos, development logos, and slide groups
 *
 * @example
 * ```typescript
 * const { designLogos, devLogos, slideGroups } = useProjectAssets("branch");
 * console.log(designLogos, devLogos, slideGroups);
 * ```
 *
 * @description
 * - Fetches project data from the API endpoint `${servicesUrls.api}/projects`.
 * - Updates the loading state using the `useLoading` context.
 * - Handles errors gracefully and logs them to the console.
 */
export const useProjectAssets = (projectId: string): ProjectAssets => {
  const [designLogos, setDesignLogos] = useState<LogosType[]>([]);
  const [devLogos, setDevLogos] = useState<LogosType[]>([]);
  const [slideGroups, setSlideGroups] = useState<Record<string, CarouselProps[]>>({});
  const { setLoading } = useLoading();

  const slideOptions: EmblaOptionsType = { align: "start" };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${servicesUrls.api}/projects`);
        if (!res.ok) {
          throw new Error(`❌ Failed to fetch projects: ${res.status}`);
        }

        const data = await res.json();
        const project = data.projects[projectId];

        if (!project) {
          throw new Error(`❌ Project "${projectId}" not found`);
        }

        setDesignLogos(project.designLogos || []);
        setDevLogos(project.devLogos || []);
        setSlideGroups(project.slides || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, [projectId, setLoading]);

  return { designLogos, devLogos, slideGroups, slideOptions };
};
