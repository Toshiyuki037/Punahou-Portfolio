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
  
  const wavePath = document.querySelector("#wave path");
  const duration = 2000; 
  let currentState = 0;

 const waveStates = [
   [
     { x: 64.33, y: 10 },
     { x: 134.23, y: 60 },
     { x: 200, y: 20 }, 
     { x: 278.35, y: 45 },
     { x: 362.89, y: 15 }
   ],
   [
     { x: 64.33, y: 60 },
     { x: 134.23, y: 10 },
     { x: 200, y: 20 },
     { x: 278.35, y: 40 },
     { x: 362.89, y: 20 }
   ],
   [
     { x: 64.33, y: 60 },
     { x: 134.23, y: 10 },
     { x: 200, y: 40 },
     { x: 278.35, y: 25 },
     { x: 362.89, y: 60 }
   ],
 ];

  function interpolateValues(from, to, progress) {
    return from + (to - from) * progress;
  }

  function updatePath(progress) {
    const from = waveStates[currentState];
    const to = waveStates[(currentState + 1) % waveStates.length];
    const points = from.map((point, index) => {
      return {
        x: interpolateValues(point.x, to[index].x, progress),
        y: interpolateValues(point.y, to[index].y, progress)
      };
    });

    const fixedStart = { x: 0, y: 65.69 };
    const fixedEnd = { x: 362.89, y: 65.69 };

    const pathData = `
      M0,${points[0].y}
      C${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}
      S${points[3].x},${points[3].y} ${points[4].x},${points[4].y}
      V${fixedEnd.y} H0 Z
    `;
    wavePath.setAttribute("d", pathData);
  }

  function animateWave(timestamp) {
    const startTime = performance.now();
    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      updatePath(progress);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        currentState = (currentState + 1) % waveStates.length;
        animateWave();
      }
    }
    requestAnimationFrame(frame);
  }

  animateWave();