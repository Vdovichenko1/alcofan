const e={btnModalClose:document.querySelector("[data-modal-close]"),overlay:document.querySelector("[data-overlay]"),modal:document.querySelector("[data-modal]"),learnMoreBtn:document.querySelectorAll(".btn--lm")};function o(t){e.overlay.classList.remove("active"),e.modal.classList.remove("active"),e.btnCloseModal.removeEventListener("click",o)}e.learnMoreBtn.forEach((e=>{e.addEventListener("click",o)}));
//# sourceMappingURL=index.ad827776.js.map
