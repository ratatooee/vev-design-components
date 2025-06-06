import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Accordion.module.css';
import { registerVevComponent, Image } from '@vev/react';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Define the interface for item content properties
interface ItemContentProps {
  title?: string;
  image?: string;
  text?: string;
}

// Function to render item content
const renderItemContent = (itemContent: ItemContentProps, index: number) => {
  const correctedContent = itemContent.itemContent || itemContent;

  return (
    (correctedContent.title || correctedContent.image || correctedContent.text) &&
    <div key={index} className={styles.body}>
      {correctedContent.image && <div className={styles.image}><Image className={styles.content_image} src={correctedContent.image} /></div>}
      {(correctedContent.text || correctedContent.title) &&
        <div className={styles.text}>
        {correctedContent.title && <h4 className={styles.content_title}>{correctedContent.title}</h4>}
          {correctedContent.text && <div dangerouslySetInnerHTML={{ __html: correctedContent.text }} />}
      </div>}
    </div>
  );
};

// Define the interface for accordion item properties
interface AccordionItemProps {
  icon?: string;
  title?: string;
  rows?: number;
  itemContents: ItemContentProps[];
  isOpen: boolean;
  onClick: () => void;
}

// Component for individual accordion item
const AccordionItem: React.FC<AccordionItemProps> = ({ icon, title, rows = 1, itemContents = [], isOpen, onClick }) => {
  const contentHeight = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.wrapper}>
      <button className={classNames(styles.accordion_item, { [styles.active]: isOpen })} onClick={onClick}>
        {icon && <span className={styles.icon}><Image className={styles.icon_image} src={icon} /></span>}
        {title && <h3 className={styles.title}>{title}</h3>}
        <RiArrowDropDownLine className={classNames(styles.arrow, { [styles.arrow_active]: isOpen })} />
      </button>

      <div
        ref={contentHeight}
        className={classNames(styles.accordion_item_content, styles[`rows_${rows}`])}
        style={isOpen ? { height: contentHeight.current?.scrollHeight } : { height: "0px" }}>
        {itemContents.length > 0 &&
          <div className={styles.accordion_item_content_inner}>
            {itemContents.map(renderItemContent)}
          </div>
        }
      </div>
    </div>
  );
};

// Define the interface for accordion properties
interface AccordionProps {
  items: {
    item: {
      icon?: string;
      title?: string;
      rows?: number;
      itemContents: ItemContentProps[];
    };
  }[];
}

// Component for the accordion
const Accordion: React.FC<AccordionProps> = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.container}>
      {items.map((value, index) => (
        <AccordionItem
          key={index}
          icon={value.item.icon}
          title={value.item.title}
          rows={value.item.rows || 1}
          itemContents={value.item.itemContents || []}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

// Register the accordion component with Vev
registerVevComponent(Accordion, {
  name: "CustomAccordion",
  props: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
          fields: [
            { name: 'icon', type: 'image' },
            { name: 'title', type: 'string' },
            { name: 'rows', type: 'number' },
            {
              name: 'itemContents',
              type: 'array',
              of: [
                {
                  name: 'itemContent',
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'image', type: 'image' },
                    { name: 'text', type: 'string', options: { multiline: true } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ['border'],
    },
    {
      selector: styles.accordion_item,
      properties: ['padding'],
    },
    {
      selector: styles.accordion_item_content_inner,
      properties: ['padding'],
    },
    {
      selector: styles.icon,
      properties: ['padding'],
    },
    {
      selector: styles.arrow,
      properties: ['color', 'font-size'],
    },
    {
      selector: styles.title,
      properties: ['color', 'font-size', 'font-family'],
    },
    {
      selector: styles.content_title,
      properties: ['color', 'font-size', 'font-family'],
    },
    {
      selector: styles.text,
      properties: ['color', 'font-size', 'font-family'],
    },
  ],
  type: 'standard',
});

export default Accordion;
