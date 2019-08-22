export function insertCustomerName(divName: string, name: string) {
    const elements = document && document.querySelectorAll(divName);
    elements.forEach((elm) => {
        (<HTMLElement>elm).innerText = name;
    });
}
