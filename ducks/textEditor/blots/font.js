import Parchment from 'parchment';

const config = {
  scope: Parchment.Scope.INLINE,
};

class FontStyleAttributor extends Parchment.Attributor.Style {
  value(node) {
    return super.value(node).replace(/["']/g, '');
  }
}

export const FontStyle = new FontStyleAttributor('font', 'font-family', config);