export class Storage {
    constructor(typeVal, htmlString) {
        this.typeVal = typeVal;
        this.htmlString = htmlString;
        this.oldData = [];
        this.setItem(typeVal, htmlString);
    }
    static checkLocalStorage() {
        if (localStorage.getItem("invoice") === null) {
            localStorage.setItem("invoice", "[]");
        }
        if (localStorage.getItem("estimate") === null) {
            localStorage.setItem("estimate", "[]");
        }
    }
    setItem(typeVal, htmlString) {
        let array;
        array = localStorage.getItem(typeVal);
        if (array !== null) {
            this.oldData = JSON.parse(array);
            this.oldData.push(htmlString); // array up to date
            const arrayFormatted = JSON.stringify(this.oldData);
            localStorage.setItem(typeVal, arrayFormatted);
        }
        else {
            document.location.reload();
        }
    }
}
