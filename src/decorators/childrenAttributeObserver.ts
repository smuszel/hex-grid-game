export function childrenAttributeObserver(...attributeNames) {
    return function _decorator(target, propKey, descriptor) {
        const connectedDescriptor = Object.getOwnPropertyDescriptor(target, 'connectedCallback');
        const callbackToDecorate = connectedDescriptor.value;

        const connectedDecoration = function () {
            callbackToDecorate.bind(this)();

            const ob = new MutationObserver(descriptor.value.bind(this));
            const options = {
                attributes: true,
                subtree: true,
                attributeFilter: attributeNames
            }

            ob.observe(this, options)
        }
        connectedDecoration.bind(target);

        Object.defineProperty(target, 'connectedCallback', {
            ...connectedDescriptor,
            value: connectedDecoration
        });

        return descriptor;
    }
}