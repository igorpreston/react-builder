import Parchment from 'parchment';

const config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['0px', '40px', '80px', '120px', '160px', '200px', '240px', '280px'],
};

export class IndentAttributor extends Parchment.Attributor.Style {
  add(node, value) {
    let indent = this.value(node) || 0;
    value = indent === 0 && value === -40 ? 0 : indent + value + 'px';
    if (value === 0) {
      this.remove(node);
      return true;
    }  else {
      return super.add(node, value);
    }
  }

  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value));
  }

  value(node) {
    return parseInt(super.value(node)) || undefined;  // Don't return NaN
  }
};

export const Indent = new IndentAttributor('indent', 'margin-left', config);
