import { createEffect, createSignal } from "solid-js";
import { withSolid } from "solid-element";
import { compose, register} from 'component-register'
import { withEvents } from './util'

export const NameReader = (props, element) => {
    const [name, setName] = createSignal(props.name);
    const { events } = element;

    createEffect(() => {
        events.trigger('onNameChanged', { name: name() });
    });

    return (
        <div>
            <label for="name">Name:</label>
            <input name="name" type="text" value={name()} onInput={(e) => setName(e.target.value)} />
        </div>        
    );    
};

compose(
    register('name-reader', { name: null }),
    withEvents,  // adds event functions to the solidJs component, gives this component the ability to dispach events
    withSolid
)(NameReader);
