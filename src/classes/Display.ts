import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { HasRender } from "../interfaces/HasRender.js";

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
    this.container.innerHTML = htmlString;
    if (docType === "invoice") {
      this.btnPrint.innerHTML = "Imprimer la facture";
    } else {
      this.btnPrint.innerHTML = "Imprimer le devis";
    }
    this.hiddenDiv.classList.remove("invisible");
    this.formContainer.innerHTML = "";
  }
}
