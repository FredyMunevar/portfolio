"use client";
import IcomoonReact from "icomoon-react";
import iconSet from "@/public/fonts/mune-icons.json";
import { IIconProps } from "./interface/iIconProps";

const getIconSize = (size: number): string => (size / 14).toString() + "rem";
/**
 * This component renders an icon using a custom font from an IcoMoon selection. It supports various icon styles
 * defined in the local font files and allows customization of size, color, and additional styles.
 * It also supports click handling, allowing icons to be interactive.
 *
 ** @param `IIconProps` props** The properties to customize the icon.
 ** @param `string` props.name** The name of the icon to be displayed, as defined in the icon set.
 ** @param `number` props.size=21 ** The size of the icon, with a default value of 21 (converted to rems).
 ** @param `string` props.color='black' ** The color of the icon. Can accept any valid CSS color value.
 ** @param `string` props.className ** Additional class names to apply to the icon for custom styling.
 ** @param `function` props.onClick ** Optional click handler function to handle click events on the icon.
 ** @returns `JSX.Element`** The rendered Icon component.
 ** @function `getIconSize` ** Utility function that converts the provided icon size from pixels to rems.
 ** @function `handleClick` ** Handles the click event and triggers the onClick callback if provided.
 */

export const Icon: React.FC<IIconProps> = ({ name, size = 21, className, color = "black", onClick }) => {
  /**
   * Handles click event on the logo to navigate to the specified href.
   */
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {iconSet.icons.find((el) => el.properties.name === name) !== undefined && (
        <IcomoonReact
          className={className ?? `icon_${name}`}
          iconSet={iconSet}
          color={color}
          size={getIconSize(size)}
          icon={`${name}`}
          data-testid={name}
          role={"sort-content"}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default Icon;
