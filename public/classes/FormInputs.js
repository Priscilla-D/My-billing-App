import { Datas } from "./Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    constructor() {
        // Form elements
        this.form = document.getElementById("form");
        this.type = document.getElementById("type");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.price = document.getElementById("price");
        this.quantity = document.getElementById("quantity");
        this.tva = document.getElementById("tva");
        // Div elements
        this.docContainer = document.getElementById("document-container");
        this.hiddenDiv = document.getElementById("hiddenDiv");
        this.storedDatasDiv = document.getElementById("stored-data");
        // Buttons
        this.btnPrint = document.getElementById("print");
        this.btnReload = document.getElementById("reload");
        this.btnInvoices = document.getElementById("stored-invoices");
        this.btnEstimates = document.getElementById("stored-estimates");
        // Listener
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.deleteListener(this.btnReload);
        this.getStoredDocs(this.btnInvoices, this.btnEstimates);
    }
    // Listners
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    printListener(btn, docContainer) {
        btn.addEventListener("click", () => {
            let availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    deleteListener(btn) {
        btn.addEventListener("click", () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    // Get informations
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [
                type,
                firstName,
                lastName,
                address,
                country,
                town,
                zip,
                product,
                price,
                quantity,
                tva,
            ];
        }
        alert("Les valeurs numériques doivent être supérieures à 0.");
        return;
    }
    getStoredDocs(btnInvoices, btnEstimates) {
        btnInvoices.addEventListener("click", this.getItems.bind(this, this.type.value));
        btnEstimates.addEventListener("click", this.getItems.bind(this, this.type.value));
    }
    getItems(doctype) {
        if (this.storedDatasDiv.hasChildNodes()) {
            this.storedDatasDiv.innerHTML = "";
        }
        if (localStorage.getItem(doctype)) {
            let array = localStorage.getItem(doctype);
            if (array !== null && array.length > 2) {
                let arrayDatas = JSON.parse(array);
                arrayDatas.map((doc) => {
                    let card = document.createElement("div");
                    let cardBody = document.createElement("div");
                    let cardClasses = ["card", "mt-5"];
                    let cardBodyClasses = "card-body";
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedDatasDiv.append(card);
                });
            }
            else {
                this.storedDatasDiv.innerHTML =
                    '<div class="card mt-5 p-5 font-italic text-secondary"> Pas de document.</div>';
            }
        }
    }
    // Handle
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas(); // Array ou undefined
        if (Array.isArray(inputs)) {
            let date = new Date();
            let docData = new Datas(...inputs, date);
            let template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            let [type] = inputs;
            template.render(docData, type);
        }
    }
}
