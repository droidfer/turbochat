import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["image", "input", "textField"];

  connect() {
    this.imageTarget.style.visibility = "hidden";
  }

  reset() {
    // Hide Preview
    this.imageTarget.setAttribute("src", "");
    this.imageTarget.style.visibility = "hidden";

    // Reset InputImage and InputContent field
    this.inputTarget.value = "";
    this.textFieldTarget.value = "";

    // Remove temporal image upload
    const hiddenImage = document.getElementById("hiddenImageUpload");
    if (hiddenImage !== null) {
      hiddenImage.remove();
    }
  }
}
