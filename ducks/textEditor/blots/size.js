import Parchment from 'parchment';

const config = {
  scope: Parchment.Scope.INLINE,
};

export class SizeAttributor extends Parchment.Attributor.Style {
  add(node, operation) {
    if (operation.type === 'inc' || operation.type === 'dec') {
      let size = this.value(node) || 16;
      let newValue = size <= 0 ? 1 : size + operation.value + 'px';
      if (newValue === 16) {
        this.remove(node);
        return true;
      }  else {
        return super.add(node, newValue);
      }
    } else if (operation.type === 'set') {
      let newValue = operation.value + 'px';
      return super.add(node, newValue);
    }
    return;
  }

  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value));
  }

  value(node) {
    return parseInt(super.value(node)) || undefined;  // Don't return NaN
  }
};

export const SizeStyle = new SizeAttributor('size', 'font-size', config);

/*
export const SizeStyle = new Parchment.Attributor.Style('size', 'font-size', {
  scope: Parchment.Scope.INLINE,
});
*/