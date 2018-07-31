// document.createElement('input').addEventListener('')

const getTxt = target => () => {
    return target.self.value;
};

const append = target => x => {
    return target.self.appendChild(build(x))
}

const inputFiled = {
    tag: 'input',
    children: [],
    handlers: [],
    attributes: [],
}

const buttonElement = {
    tag: 'button',
    children: ['add'],
    handlers: [['click', () => append(myElement)()]],
    attributes: [],
}

const buttonElement2 = {
    tag: 'button',
    children: ['get'],
    attributes: [],
    handlers: [['click', () => displayer.pass([{ children: [getTxt(inputFiled)] }, { children: ['abc'] }])]],
}

const displayer = {
    tag: 'div',
    children: [],
    attributes: [],
    handlers: [],
    pass: xs => xs.forEach(x => displayer.self.appendChild(build({...displayerChild, ...x})))
}

const displayerChild = {
    tag: 'span',
    children: [],
    handlers: [['click', e => e.target.remove()]],
    attributes: [],
}

const myElement = {
    tag: 'div',
    handlers: [],
    attributes: [['abc', 1], ['cbaa', 2]],
    children: [inputFiled, buttonElement, buttonElement2, displayer]
}

const build = spec => {
    if (typeof spec === 'string') {
        return document.createTextNode(spec);
    } else if (typeof spec === 'function') {
        return build(spec());
    }

    const el = document.createElement(spec.tag);
    spec.handlers.forEach(([chanel, f]) => el.addEventListener(chanel, f));
    spec.attributes.forEach(([name, val]) => el.setAttribute(name, val));
    spec.children.forEach(child => el.appendChild(build(child)));
    spec.self = el;

    return el;
}

const main = () => {
    const el = build(myElement);
    document.body.appendChild(el);
}; main();