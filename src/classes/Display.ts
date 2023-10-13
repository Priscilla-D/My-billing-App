import { HasHtmlFormat, HasRender } from "../interfaces/Types.js";
import { Storage } from "./Storage.js";

export class Display implements HasRender {
  formContainer: HTMLDivElement;

  constructor(
    private container: HTMLDivElement,
    private hiddenDiv: HTMLDivElement,
    private btnPrint: HTMLButtonElement
  ) {
    this.formContainer = document.getElementById(
      "form-container"
    ) as HTMLDivElement;
  }
  render(docObj: HasHtmlFormat, docType: string) {
    const htmlString: string = docObj.htmlFormat();
    this.container.classList.add("p-4");
    this.container.innerHTML = htmlString;

    // Local storage
    new Storage(docType, htmlString);

    // Display
    if (docType === "invoice") {
      this.btnPrint.innerHTML = "Imprimer la facture";
    } else {
      this.btnPrint.innerHTML = "Imprimer le devis";
    }
    this.hiddenDiv.classList.remove("invisible");
    this.formContainer.innerHTML = "";
  }
}
