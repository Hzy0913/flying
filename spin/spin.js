/**
 * @style style
 * @className className
 * @scale spin缩放比
 * @type spin类型 arrow-circle | circle | circle-side | shape
 * @visible 是否显示
 */
import React from 'react';
import './spin-style.less';
import PropTypes, {oneOfType} from 'prop-types';

const shapeNode = () => (<div className="shape-container">
  <div className="shape shape-1"></div>
  <div className="shape shape-2"></div>
  <div className="shape shape-3"></div>
  <div className="shape shape-4"></div>
</div>)

export default function Spin(props) {
  const {className = '', style = {}, scale = 1, type = 'arrow-circle', visible = true} = props;
  const scaleSize = `scale(${scale})`;
  const scaleStyle = {
    transform: scaleSize,
    WebkitTransform: scaleSize,
    MozTransform: scaleSize,
  };
  const assignStyle = {...style, ...scaleStyle};
  if (!visible) return null;
  const createContent = () => {
    if (type === 'shape') return shapeNode();
    return <div className={type} />;
  }
  return(<div className={`tplus-spin ${className}`} style={assignStyle}>
    {createContent()}
  </div>);
}


Spin.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  scale: PropTypes.number,
  visible: PropTypes.bool,
};
