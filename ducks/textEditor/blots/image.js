import Quill from '../quill';
import { sanitize } from './link';

const Embed = Quill.import('blots/embed');

const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];

export class Image extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('alt', this.sanitize(value.alt));
    node.setAttribute('src', this.sanitize(value.url));
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  }

  static value(domNode) {
    return {
      src: domNode.getAttribute('src'),
      alt: domNode.getAttribute('alt'),
    };
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
};

Image.blotName = 'image';
Image.tagName = 'img';