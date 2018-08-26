export const childElements = (collection: HTMLCollection) => {
    const arr: HTMLElement[] = [];

    for (let i = 0; i < collection.length; i++) {
        const el = collection[i];

        if (el instanceof HTMLElement) {
            arr.push(el);
        }
    }

    return arr;
}