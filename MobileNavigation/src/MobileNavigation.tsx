import './matchMedia.js';
import React, { useEffect } from 'react';
import styles from './MobileNavigation.module.css';
import { registerVevComponent } from '@vev/react';
import Slider from 'react-slick';
import './slider-style.css';
import classNames from 'classnames';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={classNames(className, styles.navArrow )}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={classNames(className, styles.navArrow )}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const MobileNavigation = (props) => {
  let settings = {
    infinite: false,
    initialSlide: 0,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    variableWidth: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 600,
      },
      {
        breakpoint: 100000,
        settings: 'unslick',
      },
    ],
  };

  const navItems = document.querySelectorAll('.navItem__MobileNavigation');
  const blocks = document.querySelectorAll('[data-anchorid]');
  const scrollCheckInterval = 100;
  let scrollWait  = null;

  function updateOnClick (event) {
    const target = event.target;
    const scrollName = target.dataset.hash;
    const scrollBlock = document.querySelectorAll(`[data-anchorid="${scrollName}"]`);
    if (scrollBlock.length === 0) return;

    setTimeout(() => {
      scrollBlock[0].scrollIntoView({behavior: "smooth"})
      for (let item of navItems) {
        item.classList.remove ('active__MobileNavigation')
      }
      target.closest('.navItem__MobileNavigation').classList.add ('active__MobileNavigation');
    }, 200);
  } // updateOnClick function.

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if(scrollY < rect.top) {
      return false;
    }
    return rect.top <= windowHeight && rect.bottom >= 0;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollWait) clearTimeout(scrollWait);
      scrollWait = setTimeout(() => {
        let nearestNode = null;
        for (let node of blocks) {
          const visible = isInViewport(node);
          if (visible) {
            nearestNode = node;
          }
        }
  
        if (nearestNode) {
          let name = nearestNode.dataset.anchorid;
          const slickSlides = document.querySelectorAll('.navItem__MobileNavigation');
          slickSlides.forEach((sl) => {
            let span = sl.querySelector('span');
            sl.classList.remove('active__MobileNavigation');
            if (span && span.dataset.hash === name) {
              sl.classList.add('active__MobileNavigation');
            }
          });
        }
      }, scrollCheckInterval);
    };

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="slider-container">
      <Slider {...settings} className={styles.slider}>
        {props.items && props.items.length > 0 && props.items.map((value, i) => (
          value.item.title && (
            <div onClick={updateOnClick} className={classNames(styles.navItem, { 'active__MobileNavigation': i === 0 })} key={i} style={{ width: 'auto' }}>
              <span className="sliderItem" title={value.item.title} data-hash={value.item.hash}>{value.item.title}</span>
              <hr className={styles.highlight}></hr>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

registerVevComponent(MobileNavigation, {
  name: 'MobileNavigation',
  props: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'hash', type: 'string' },
          ],
        },
      ],
    },
  ],
  type: 'standard',
  editableCSS: [
    {
      selector: styles.navItem,
      properties: ['color', 'padding'],
    },
    {
      selector: styles.navArrow,
      properties: ['color'],
    },
    {
      selector: styles.highlight,
      properties: [ 'height', 'background'],
    },
  ],
});

export default MobileNavigation;
