// taken from https://github.com/ryansolid/component-register-extensions/blob/master/src/mixins/withSetProperty.js
import { createMixin } from "component-register";

export const withSetProperty = createMixin(options => {
  const { element } = options;
  element.setProperty = function(name, value) {
    if (!(name in this.props)) return;
    const prop = this.props[name],
      oldValue = prop.value;
    this[name] = value;
    if (prop.notify)  
      this.dispatchEvent(
        new CustomEvent("propertychange", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { value, oldValue, name }
        })
      );
  };
  return options;
});
