export const withNoShadowDOM = (ComponentType) => {
  return (props, options) => {
    const { element } = options;
    Object.defineProperty(element, "renderRoot", {
      value: element
    });
    return ComponentType(props, options);
  }
}