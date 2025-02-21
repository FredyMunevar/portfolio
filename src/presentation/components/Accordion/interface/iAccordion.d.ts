/**
 * Interface representing a single accordion item
 */
interface IAccordionItem {
  /** Title text displayed in the header */
  title: string;

  /** Content to be displayed when the item is expanded */
  toolDescription: string | ReactNode;
}

/**
 * Interface for the main Accordion component props
 */
export interface IAccordion {
  /** Unique identifier for the LayoutGroup */
  id: string;

  /** Array of accordion items to render */
  items: IAccordionItem[];
}
