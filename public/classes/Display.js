export class Display {
    constructor(container, hiddenDiv, btnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.btnPrint = btnPrint;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObj, docType) {
        const htmlString = docObj.htmlFormat();
        this.container.innerHTML = htmlString;
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
