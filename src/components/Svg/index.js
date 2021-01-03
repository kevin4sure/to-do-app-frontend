
import React from "react";
import PropTypes from 'prop-types';

const Icon = ({ name, color, size, icons, ...extra }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size} {...extra}>
    <use xlinkHref={`${icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  icons: PropTypes.node,
  extra: PropTypes.objectOf(PropTypes.any),
};

Icon.defaultProps = {
  color: '#000',
  size: 12,
  icons: null,
  extra: {}
};

export default Icon;