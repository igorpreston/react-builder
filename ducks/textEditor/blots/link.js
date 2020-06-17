import Quill from '../quill';

const Inline = Quill.import('blots/inline');

export class Link extends Inline {
  static create(value) {
    let node = super.create(value);
    if (value.tel === true) {
      let newVal = this.sanitize(value.href);
      node.setAttribute('href', newVal);
      node.setAttribute('data-tel', value.tel);
      return node;
    } else if (value.tel === false) {
      node.removeAttribute('data-tel');
    }
    if (value.scrollTo) {
      node.setAttribute('href', value.href);
      node.setAttribute('data-scroll-to', value.href);
      return node;
    } else if (!value.scrollTo) {
      node.removeAttribute('data-scroll-to');
    }
    if (value.email === true) {
      let newVal = this.sanitize(value.href);
      node.setAttribute('href', newVal);
      node.setAttribute('data-email', value.email);
      return node;
    } else if (value.email === false) {
      node.removeAttribute('data-email');
    }
    if (value.href) {
      let newVal = this.sanitize(value.href);
      node.setAttribute('href', newVal); 
    }
    if (value.target === true) {
      node.setAttribute('target', '_blank');
    } else if (value.target === false) {
      node.removeAttribute('target');
    }
    return node;
  }

  static formats(domNode) {
    return {
      href: domNode.getAttribute('href'),
      target: domNode.getAttribute('target'),
      tel: domNode.getAttribute('data-tel'),
      email: domNode.getAttribute('data-email'),
      scrollTo: domNode.getAttribute('data-scroll-to'),
    };
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'mailto', 'tel']) ? url : this.SANITIZED_URL;
  }

  static value(domNode) {
    return {
      href: domNode.getAttribute('href'),
      target: domNode.getAttribute('target'),
      tel: domNode.getAttribute('data-tel'),
      email: domNode.getAttribute('data-email'),
      scrollTo: domNode.getAttribute('data-scroll-to'),
    };
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value.href) return super.format(name, value);
    let newValue = this.constructor.sanitize(value.href);
    this.domNode.setAttribute('href', newValue);
    if (value.target === true) {
      this.domNode.setAttribute('target', '_blank');
    } else if (value.target === false) {
      this.domNode.removeAttribute('target');
    }
    if (value.tel === true) {
      this.domNode.setAttribute('data-tel', true);
    } else if (value.tel === false) {
      this.domNode.removeAttribute('data-tel');
    }
    if (value.email === true) {
      this.domNode.setAttribute('data-email', true);
    } else if (value.email === false) {
      this.domNode.removeAttribute('data-email');
    }
    if (value.scrollTo) {
      this.domNode.setAttribute('data-scroll-to', value.href);
    } else if (!value.scrollTo) {
      this.domNode.removeAttribute('data-scroll-to');
    }
  }
};

Link.blotName = 'link';
Link.tagName = 'a';
Link.SANITIZED_URL = 'about:blank';


export function sanitize(url, protocols) {
  let anchor = document.createElement('a');
  anchor.href = url;
  let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
};
