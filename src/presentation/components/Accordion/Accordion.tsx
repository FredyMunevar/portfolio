import React from "react";
import { IAccordion } from "./interface/iAccordion";
import { LayoutGroup } from "motion/react";
import AccordionItem from "./AccordionItem";

/**
 * Accordion component that renders a list of expandable/collapsible items.
 * Uses Framer Motion's LayoutGroup for smooth animations between state changes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {IAccordionItem[]} props.items - Array of accordion items to render
 * @param {string} props.id - Unique identifier for the LayoutGroup
 */
const Accordion = ({ items, id }: IAccordion) => {
  return (
    <LayoutGroup id={id}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} toolDescription={item.toolDescription} />
      ))}
    </LayoutGroup>
  );
};

export default Accordion;
