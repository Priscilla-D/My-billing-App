import { Storage } from "./Storage.js";
export class Display {
    constructor(container, hiddenDiv, btnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.btnPrint = btnPrint;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObj, docType) {
        const htmlString = docObj.htmlFormat();
        this.container.classList.add("p-4");
        this.container.innerHTML = htmlString;
        // Local storage
        new Storage(docType, htmlString);
        // Display
        if (docType === "invoice") {
            this.btnPrint.innerHTML = "Imprimer la facture";
        }
        else {
            this.btnPrint.innerHTML = "Imprimer le devis";
        }
        this.hiddenDiv.classList.remove("invisible");
        this.formContainer.innerHTML = "";
    }
}
