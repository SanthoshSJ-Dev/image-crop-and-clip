document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.getElementById("uploadInput");
    const uploadedImageModal = document.getElementById("uploadedImageModal");

    const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
    const nextBtn = document.getElementById("nextBtn");
    const imageContainer = document.getElementById("imageContainer");

    const clipModal = new bootstrap.Modal(document.getElementById("clipModal"));
    const saveBtn = document.getElementById("saveBtn");
    const resultContainer = document.getElementById("resultContainer");

    let cropper; // initailze cropper
    let clippedImage; // Declare the clippedImage variable here

    // Add event listener to the file input
    uploadInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImageModal.src = e.target.result;
            imageModal.show(); // Show the modal

            // Reset Cropper.js instance
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(uploadedImageModal, {
                aspectRatio: 1, // Set the aspect ratio for the cropped image
                viewMode: 1, // Set the view mode to restrict the crop box to the container
                autoCropArea: 2, // Automatically set the crop area to the maximum size
                zoomable: false, // Disable zooming for the image
                movable: true,
                dragMode: 'move',
            });
        };

        reader.readAsDataURL(file);
    });

    // Add event listener to the Crop button
    nextBtn.addEventListener("click", function () {
        // Get the cropped image data
        const croppedImageData = cropper.getCroppedCanvas().toDataURL();

        // Create an image element to display the cropped image
        clippedImage = document.createElement("img");
        clippedImage.src = croppedImageData;
        clippedImage.alt = "Cropped Image";
        clippedImage.style.width = "100%"; // Set the width to 100 percentage
        clippedImage.style.height = "100%"; // Set the height to 100 percentage

        // Append the cropped image to the webpage
        imageContainer.innerHTML = ""; // Clear previous image
        imageContainer.appendChild(clippedImage);

        // Close the modal
        imageModal.hide();
        clipModal.show();

        // Save button event listener in the clip modal
        saveBtn.addEventListener("click", function () {
            clippedImage.style.width = "100%"; // Set the width to  100 percentage
            clippedImage.style.height = "100%"; // Set the height to  100 percentage

            // Append the clipped image to the webpage
            resultContainer.innerHTML = ""; // Clear previous result
            resultContainer.appendChild(clippedImage);

            // Close the clip modal
            clipModal.hide();
        });
    });

    const roundBtn = document.getElementById("roundBtn");
    const circleBtn = document.getElementById("circleBtn");
    const squareBtn = document.getElementById("squareBtn");
    const heartBtn = document.getElementById("heartBtn");
    const flipHorizontalBtn = document.getElementById("flipHorizontalBtn");
    const flipVerticalBtn = document.getElementById("flipVerticalBtn");
    const rotate = document.getElementById("rotate");

    // Add event listeners to the shape buttons
    roundBtn.addEventListener("click", function () {
        // Implement rounded square mask
        clippedImage.style.clipPath = "none";
        clippedImage.style.borderRadius = "30px";
    });

    circleBtn.addEventListener("click", function () {
        // Implement circle mask
        clippedImage.style.clipPath = "circle()";
    });

    squareBtn.addEventListener("click", function () {
        // Implement plain square mask
        clippedImage.style.clipPath = "none";
        clippedImage.style.borderRadius = "0";
    });

    heartBtn.addEventListener("click", function () {
        // Implement heart-shaped mask
        clippedImage.style.clipPath = "url(#heartMask)";
    });

    // Add event listeners to the Flip and Rotate buttons
    flipHorizontalBtn.addEventListener("click", function () {
        cropper.scaleX(-cropper.getData().scaleX || -1);
    });

    flipVerticalBtn.addEventListener("click", function () {
        cropper.scaleY(-cropper.getData().scaleY || -1);
    });

    rotate.addEventListener("click", function () {
        cropper.rotate(90);
    });
});
