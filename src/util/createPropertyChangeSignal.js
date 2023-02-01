import { createSignal, onCleanup } from "solid-js";

/**
 * Creates a signal that is updated when the element's property changes
 * it listens to the `propertychange` event.
 * @param {*} element the second parameter sent into the solid component ... either the JSXElement or a HTMLElement works
 * @param {*} props props sent to the solid component
 * @param {*} propName this is the name of the property to watch
 * @returns 
 */
export const createPropertyChangeSignal = (element, propName, initalValue) => {   
    const [value, setValue] = createSignal(initalValue);

    const propertyChanged = (e) => {
        if (e.detail.name === propName) {
            setValue(e.detail.value);
        }
    };

    const eventTarget = element.element ? element.element : element;

    eventTarget.addEventListener(`propertychange`, propertyChanged);
    
    onCleanup(() => eventTarget.removeEventListener(`properychange`, propertyChanged));

    return value;
}
