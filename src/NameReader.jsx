import { createEffect, createSignal } from "solid-js";
import { withSolid } from "solid-element";
import { compose, register } from 'component-register'
import { withEvents } from './util'
import { withNoShadowDOM } from './util'

export const NameReader = (props, options) => {
    const [name, setName] = createSignal(props.name);
    const { events } = options;

    createEffect(() => {
        events.trigger('onNameChanged', { name: name() });
    });

    return (
        <div class="d-flex flex-row align-items-center">
            <div>
                <label for="name">Name:</label>
                <input name="name" type="text" value={name()} onInput={(e) => setName(e.target.value)} />
            </div>
            <div class="tryNameChange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M14.292 4.292l-8 8c-.39.39-.39 1.024 0 1.414l8 8c.195.196.451.292.707.292s.512-.097.707-.292c.39-.39.39-1.024 0-1.414l-7.293-7.293 7.293-7.293c.39-.39.39-1.024 0-1.414s-1.024-.39-1.414 0z" stroke="#3f51b5" stroke-width="2" fill="none" />
                </svg>

                Try changing the name!
            </div>
        </div>
    );
};

compose(
    register('name-reader', { name: null }, { useShadowDOM: false }),
    withNoShadowDOM,  // removes the shadow dom from the component
    withEvents,  // adds event functions to the solidJs component, gives this component the ability to dispach events
    withSolid
)(NameReader);
