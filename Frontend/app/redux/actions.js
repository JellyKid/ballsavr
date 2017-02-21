export const SOMEACTION = 'SOMEACTION';
export function someAction(content) {
  return {
    type: SOMEACTION,
    payload: content
  };
}
