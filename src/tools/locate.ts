export const locate = (el: HTMLElement) => {
    const coordinates = ['x', 'y']
        .map(c => el.getAttribute(c))
        .map(c => parseInt(c));

    return coordinates as [number, number];
}