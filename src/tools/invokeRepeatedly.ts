export const invokeRepeatedly = (f, times) => {
    for (let index = 0; index < times; index++) {
        f();
    }
}