export async function fetchJson(filename) {
    const response = await fetch(filename);
    return await response.json();
};

export function createElement(tag, attributes = {}, text = "") {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    element.innerText = text;
    return element;
}

export function nestingElement(elements) {
    for (let i = 1; i < elements.length; i++) {
        elements[i - 1].appendChild(elements[i]);
    }
}

export function deleteChildElement(element) {
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

export function indexQuerySelector(element, selector) {
    var elements = document.querySelectorAll('.' + element.className);
    const index = Array.prototype.indexOf.call(elements, targetElement);
    return document.querySelectorAll(selector)[index]
}
