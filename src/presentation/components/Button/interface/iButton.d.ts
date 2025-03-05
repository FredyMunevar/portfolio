/**
 * Interface for Button component props.
 */
export interface IButton {
  /**
   * The click handler function for the button.
   */
  onClick?: () => void;

  /**
   * The URL to navigate to if the button is rendered as a link.
   */
  link?: Url;

  /**
   * The type of the button, either "primary" or "secondary".
   */
  buttonType?: "primary" | "secondary";

  /**
   * The content to be displayed inside the button.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply to the button.
   */
  className?: string;

  /**
   * Flag to determine if the button should be rendered in a larger size.
   */
  largeButton?: boolean;

  /**
   * Additional properties to be passed to the button or link element.
   */
  props?: Record<string, unknown>;

  /**
   * The target attribute for the link element.
   */
  target?: string;
}
