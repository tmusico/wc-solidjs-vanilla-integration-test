import { createSignal } from "solid-js";
import { withSolid } from "solid-element";
import { compose, register } from 'component-register'
import { withSetProperty, createPropertyChangeSignal } from "./util";

export const HelloWorld = (props, element) => {
    const greeting = createPropertyChangeSignal(element, 'greeting', props.greeting);
    const [count, setCount] = createSignal(0);

    const displayName = () => greeting() ? greeting() : "World";

    return (
        <div>
            <h1>Hello {displayName()}</h1>
            <p>You clicked {count()} times</p>
            <button onClick={() => setCount(count() + 1)}>Click me</button>
        </div>
    );
};

compose(
    register("hello-world", { greeting: { value: null, notify: true } }),  // notify: true will raise the `propertychange` event (see the `withSetProperty` code)
    withSetProperty,  // adds a setProperty method to the element, allows vanilla js to set properties, it will raise the `propertychange` event
    withSolid
)(HelloWorld);
