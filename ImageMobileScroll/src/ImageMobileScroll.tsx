import React from 'react';
import styles from './ImageMobileScroll.module.css';
import { registerVevComponent, Image } from '@vev/react';

type Props = {
  className?: string;
  sizes?: [number, number][];
  src?: string | { key: string };
  width?: string | number;
  height?: string | number;
  image?: string | { key: string };
  style?: { [attr: string]: number | string };
};

const ImageMobileScroll: React.FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <Image
          src={props.image}
          className={styles.image}
          style={{ width: props.width, height: props.height }}
        />
      </div>
    </div>
  );
};

registerVevComponent(ImageMobileScroll, {
  name: 'ImageMobileScroll',
  props: [
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'width',
      type: 'string',
    },
    {
      name: 'height',
      type: 'string',
    },
  ],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ['background', 'margin', 'padding', 'border', 'border-radius', 'opacity', 'filter'],
    },
  ],
  type: 'standard',
});

export default ImageMobileScroll;
