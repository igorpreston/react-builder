import Parchment from 'parchment';

const config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['left', 'right', 'center', 'justify']
};

export const AlignAttribute = new Parchment.Attributor.Attribute('align', 'align', config);
export const AlignStyle = new Parchment.Attributor.Style('align', 'text-align', config);
