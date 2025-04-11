import { IconName } from "./icon";

/**
 * Interface representing the properties for the Icon component.
 */
export interface IMuneIconProps {
  /**
   * The name of the icon.
   */
  name: IconName;

  /**
   * Optional size of the icon.
   * @default 24
   */
  size?: number;

  /**
   * Optional additional CSS class for the icon.
   */
  className?: string;

  /**
   * Optional color of the icon.
   */
  color?: string;

  /**
   * Optional click handler for the icon.
   */
  onClick?: () => void;
}
