// temp nextjs/polyfill for images until we find a way to handle ssg properly through thumbor
import React from 'react';

const layoutToStyle = {
  responsive: { width: '100%', height: '100%' },
  fill: { width: '100%', height: '100%' },
};

const Image = ({ width, height, src, layout, objectFit, ...props }) => (
  <img style={{ width, height, objectFit, ...layoutToStyle[layout] }} src={src} {...props} />
);

export default Image;
