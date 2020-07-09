/**
 * Created by hzy on 2019/7/30.
 *
 * @className className
 * @isElectron 设置为isElectron环境
 * @height 滚动区高度
 * @width  滚动区宽度
 * @direction  horizontal or undefined
 * @scrollProgress  滚动进度
 */
import React, { Component } from 'react';
import PropTypes, {oneOfType} from 'prop-types';
import Swiper from 'swiper/dist/js/swiper.js';
import {env} from 'mutants-microfx';
import 'swiper/dist/css/swiper.min.css';

const envIsElectron = env.platform === 'electron';

export default class TouchScroll extends Component {
  static propTypes = {
    isElectron: PropTypes.bool,
    height: oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    width: oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    direction: PropTypes.string,
    scrollProgress: PropTypes.func,
  };
  constructor(props){
    super(props);
    const {isElectron, width, height} = this.props;
    this.isElectron = isElectron || envIsElectron;
  }

  componentDidMount() {
    if (!this.isElectron) return;

    this.createScroll();
  }

  componentDidUpdate() {
    if (!this.isElectron) return;

    if (this.touchScroll) {
      this.touchScroll.update();
    } else {
      this.createScroll();
    }
  }

  componentWillUnmount() {
    if (!this.isElectron) return;

    this.touchScroll && this.touchScroll.destroy(false);
    this.touchScroll = undefined;
  }

  createScroll = () => {
    let {height, width, direction, scrollProgress} = this.props;
    const parentElement = this.container.parentElement || {};
    const clientHeight = parentElement.clientHeight;
    const clientWidth = parentElement.clientWidth;

    if (typeof height !== 'undefined' || typeof width !== 'undefined') {
      height = typeof height === 'string' ? parseInt(height) : height;
      width = typeof width === 'string' ? parseInt(width) : width;
    } else if (!direction && clientHeight) {
      height = clientHeight;
    } else if (direction && clientWidth) {
      width = clientWidth;
    }

    if (height < 10 || width < 10) return;
    (parentElement.style || {}).overflow = 'hidden';

    const onScrollProgress = scrollProgress ? {watchSlidesProgress : true, on: {progress: scrollProgress}} : {};
    this.touchScroll = new Swiper(this.container, {
      height,
      width,
      direction: direction || 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      ...onScrollProgress
    });
  }

  render() {
    const {children, className = ''} = this.props;
    if (!this.isElectron) return children;

    return (<div className={className} ref={ref => this.container = ref}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">{children}</div>
      </div>
    </div>);
  }
}
