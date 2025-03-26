interface CarouselProps {
  id: number;
  src: string;
  logo?: string;
  link?: string;
}
type CarouselType = {
  slides: CarouselProps[];
  options?: EmblaOptionsType;
};

type UseCarouselButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

type CarouselButtonType = ComponentPropsWithRef<"button">;
