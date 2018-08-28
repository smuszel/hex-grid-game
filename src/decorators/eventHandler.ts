export function eventHandler(eventName: string) {
    return function _decorator(target: any, propKey, descriptor) {

        if (!target.connectedCallback) {
            target.connectedCallback = function() {}
        }
        
        const connectedDescriptor =
            Object.getOwnPropertyDescriptor(target, 'connectedCallback') ||
            Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), 'connectedCallback');

        const originalConnectedCallback = connectedDescriptor.value;

        const connectedDecoration = function () {
            originalConnectedCallback.bind(this)();
            this.addEventListener(eventName, this[propKey].bind(this));
        };
        connectedDecoration.bind(target);

        Object.defineProperty(target, 'connectedCallback', {
            ...connectedDescriptor,
            value: connectedDecoration
        });

        return descriptor;
    }
}