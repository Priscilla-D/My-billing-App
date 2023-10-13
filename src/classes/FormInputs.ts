import { Datas } from "./Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
import { HasHtmlFormat, HasPrint, HasRender } from "../interfaces/Types.js";

export class FormInput {
  form: HTMLFormElement;
  type: HTMLSelectElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  address: HTMLInputElement;
  country: HTMLInputElement;
  town: HTMLInputElement;
  zip: HTMLInputElement;
  product: HTMLInputElement;
  price: HTMLInputElement;
  quantity: HTMLInputElement;
  tva: HTMLInputElement;
  docContainer: HTMLDivElement;
  hiddenDiv: HTMLDivElement;
  storedDatasDiv: HTMLDivElement;
  btnPrint: HTMLButtonElement;
  btnReload: HTMLButtonElement;
  btnInvoices: HTMLButtonElement;
  btnEstimates: HTMLButtonElement;

  constructor() {
    // Form elements
    this.form = document.getElementById("form") as HTMLFormElement;
    this.type = document.getElementById("type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstName") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;

    // Div elements
    this.docContainer = document.getElementById(
      "document-container"
    ) as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.storedDatasDiv = document.getElementById(
      "stored-data"
    ) as HTMLDivElement;

    // Buttons
    this.btnPrint = document.getElementById("print") as HTMLButtonElement;
    this.btnReload = document.getElementById("reload") as HTMLButtonElement;
    this.btnInvoices = document.getElementById(
      "stored-invoices"
    ) as HTMLButtonElement;
    this.btnEstimates = document.getElementById(
      "stored-estimates"
    ) as HTMLButtonElement;

    // Listener
    this.submitFormListener();
    this.printListener(this.btnPrint, this.docContainer);
    this.deleteListener(this.btnReload);
    this.getStoredDocs(this.btnInvoices, this.btnEstimates);
  }

  // Listners
  private submitFormListener(): void {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  private printListener(
    btn: HTMLButtonElement,
    docContainer: HTMLDivElement
  ): void {
    btn.addEventListener("click", () => {
      let availableDoc: HasPrint = new Print(docContainer);
      availableDoc.print();
    });
  }

  private deleteListener(btn: HTMLButtonElement): void {
    btn.addEventListener("click", () => {
      document.location.reload();
      window.scrollTo(0, 0);
    });
  }

  // Get informations
  private inputDatas():
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        number,
        number,
        number
      ]
    | void {
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

  private getStoredDocs(
    btnInvoices: HTMLButtonElement,
    btnEstimates: HTMLButtonElement
  ): void {
    btnInvoices.addEventListener(
      "click",
      this.getItems.bind(this, this.type.value)
    );
    btnEstimates.addEventListener(
      "click",
      this.getItems.bind(this, this.type.value)
    );
  }

  private getItems(doctype: string) {
    if (this.storedDatasDiv.hasChildNodes()) {
      this.storedDatasDiv.innerHTML = "";
    }
    if (localStorage.getItem(doctype)) {
      let array: string | null = localStorage.getItem(doctype);

      if (array !== null && array.length > 2) {
        let arrayDatas: string[] = JSON.parse(array);
        arrayDatas.map((doc: string): void => {
          let card: HTMLDivElement = document.createElement("div");
          let cardBody: HTMLDivElement = document.createElement("div");
          let cardClasses: string[] = ["card", "mt-5"];
          let cardBodyClasses: string = "card-body";
          card.classList.add(...cardClasses);
          cardBody.classList.add(cardBodyClasses);

          cardBody.innerHTML = doc;
          card.append(cardBody);
          this.storedDatasDiv.append(card);
        });
      } else {
        this.storedDatasDiv.innerHTML =
          '<div class="card mt-5 p-5 font-italic text-secondary"> Pas de document.</div>';
      }
    }
  }

  // Handle
  private handleFormSubmit(e: Event) {
    e.preventDefault();
    const inputs = this.inputDatas(); // Array ou undefined
    if (Array.isArray(inputs)) {
      let date: Date = new Date();
      let docData: HasHtmlFormat = new Datas(...inputs, date);

      let template: HasRender = new Display(
        this.docContainer,
        this.hiddenDiv,
        this.btnPrint
      );
      let [type] = inputs;
      template.render(docData, type);
    }
  }
}
