import { Controller } from "@hotwired/stimulus";
import { DirectUpload } from "https://cdn.skypack.dev/pin/@rails/activestorage@v7.1.2-mMfISpKfx80eNgqlgnDN/mode=imports/optimized/@rails/activestorage.js";

export default class extends Controller {
  static targets = ["image", "input", "textField"];

  connect() {
    this.imageTarget.style.visibility = "hidden";
  }

  changed() {
    Array.from(this.inputTarget.files).forEach((file) => {
      const upload = new DirectUpload(file, this.postURL());
      upload.create((error, blob) => {
        this.hiddenInput().value = blob.signed_id;
        this.imageTarget.src = `${this.getURL()}/${blob.signed_id}/${
          blob.filename
        }`;
      });
    });

    this.imageTarget.style.visibility = "visible";
  }

  hiddenInput() {
    if (this._hiddenInput == undefined) {
      this._hiddenInput = document.createElement("input");
      this._hiddenInput.id = "hiddenImageUpload";
      this._hiddenInput.name = this.inputTarget.name;
      this._hiddenInput.type = "hidden";
      this.inputTarget.parentNode.insertBefore(
        this._hiddenInput,
        this.inputTarget.nextSibling
      );
    }
    return this._hiddenInput;
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

  postURL() {
    return "/rails/active_storage/direct_uploads";
  }

  getURL() {
    return "/rails/active_storage/blobs/redirect";
  }
}
