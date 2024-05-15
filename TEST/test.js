document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");
  const imageGallery = document.querySelector(".image-gallery");

  // Event listener for clicks on images in the gallery
  imageGallery.addEventListener("click", function (event) {
      const target = event.target;
      if (target.tagName === "IMG" && target.closest(".image-item")) {
          showModal(target);
      }
  });

  // Function to show the modal with the selected image
  function showModal(img) {
      modalImg.src = img.dataset.full;  // Set the source for the modal image
      captionText.textContent = img.alt;  // Use the alt text as the caption
      modal.style.opacity = "1";
      modal.style.visibility = "visible";
  }

  // Event listener for the close button in the modal
  document.querySelector(".close").addEventListener("click", function() {
      closeModal();
  });

  // Event listener for clicking outside the modal image to close it
  modal.addEventListener("click", function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });

  // Function to close the modal
  function closeModal() {
      modal.style.opacity = "0";
      modal.addEventListener("transitionend", function() {
          modal.style.visibility = "hidden";
      }, { once: true });
  }

  // Function to handle the escape key for closing the modal
  document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" || event.key === "Esc") {
          closeModal();
      }
  });
});
