import { createMixin } from "component-register";

export const withEvents = createMixin(options => {
    const { element } = options;
    const events = {
        trigger(
            name,
            detail,
            options = { bubbles: true, cancelable: true, composed: true }
        ) {
            let eventTarget;
            if (this?.dispatchEvent) {
                eventTarget = this;
            }
            else {
                eventTarget = element;                
            }
            const event = new CustomEvent(name, {
                ...options,
                detail
            });
            let cancelled = false;
            if (eventTarget["on" + name]) cancelled = eventTarget["on" + name](event) === false;
            if (cancelled) event.preventDefault();
            eventTarget.dispatchEvent(event);
            return event;
        },

        forward(name) {
            events.on(name, ({ detail, bubbles, cancelable, composed }) =>
                events.trigger(name, detail, { bubbles, cancelable, composed })
            );
        },
        // handles child events for delegation
        on(name, handler) {
            element.renderRoot.addEventListener(name, handler);
            element.addReleaseCallback(() =>
                element.renderRoot.removeEventListener(name, handler)
            );
        },

        off(name, handler) {
            element.renderRoot.removeEventListener(name, handler);
        },

        listenTo(emitter, key, fn) {
            emitter.on(key, fn);
            element.addReleaseCallback(() => emitter.off(key, fn));
        }
    };
    return { ...options, events };
});
