document.addEventListener("DOMContentLoaded", function () {
  console.log("Bulk JS loaded");
  // Sidebar Toggle Button
  const toggleButton = document.getElementById("toggleButton");
  const sidebar = document.getElementById("sidebar");

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
      toggleButton.classList.toggle("collapsed");
    });
  }

  // Dropdown Toggle
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const selectedValue = document.getElementById("selected-value");
  const arrow = document.querySelector(".arrow");

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function () {
      const dropdown = document.querySelector(".dropdown");
      dropdown.classList.toggle("active");
      arrow.classList.toggle("active");
    });
  }

  // Dropdown Options
  const dropdownOptions = document.querySelectorAll(".dropdown-menu li a");

  dropdownOptions.forEach((option) => {
    option.addEventListener("click", function (event) {
      event.preventDefault();
      const value = option.textContent;
      selectedValue.textContent = value;
      const allItems = document.querySelectorAll(".dropdown-menu li");
      allItems.forEach((item) => item.classList.remove("selected"));
      option.parentElement.classList.add("selected");
      document.querySelector(".dropdown").classList.remove("active");
      arrow.classList.remove("active");
    });
  });

  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      openEditModal();
    });
  });

  // Delete button logic
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      openDeleteModal();
    });
  });

  // Open Edit Modal Function
  function openEditModal() {
    const modal = document.getElementById("editModalOverlay");
    if (modal) {
      modal.style.display = "flex";
    }
  }

  // Open Delete Modal Function
  function openDeleteModal() {
    const modal = document.getElementById("deleteModalOverlay");
    if (modal) {
      modal.style.display = "flex";
    }
  }

  const closeButtons = document.querySelectorAll(
    ".hrismodal-close, .cancel-button, #closehrismodal"
  );

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      closeModal();
    });
  });

  function closeModal() {
    const modals = document.querySelectorAll(".hrismodal-overlay");
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  }

  const detailsPanel = document.querySelectorAll(".detailsPanel");

  if (detailsPanel) {
    detailsPanel.forEach((panel) => {
      panel.addEventListener("click", function () {
        openDetails();
      });
    });
  }

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSubmenu = document.getElementById(
        this.getAttribute("data-target")
      );
      targetSubmenu.classList.toggle("open");
      this.classList.toggle("open");
      document.querySelectorAll(".submenu").forEach((submenu) => {
        if (submenu !== targetSubmenu) {
          submenu.classList.remove("open");
          submenu.previousElementSibling.classList.remove("open");
        }
      });
    });
  });

  const toggleButtonForOnboardingEmployees =
    document.querySelector(".dropdown-toggle2");
  const dropdownList = document.querySelector(".dropdown-list2");

  if (toggleButtonForOnboardingEmployees) {
    toggleButtonForOnboardingEmployees.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownList.classList.toggle("hidden");
    });
  }

  const fileUpload = document.getElementById("fileUpload");
  const fileInput = document.getElementById("fileInput");

  if (fileUpload && fileInput) {
    fileUpload.addEventListener("click", () => {
      fileInput.click();
    });

    // Drag-and-drop events
    fileUpload.addEventListener("dragover", (event) => {
      event.preventDefault();
      fileUpload.classList.add("drag-over");
    });

    fileUpload.addEventListener("dragleave", () => {
      fileUpload.classList.remove("drag-over");
    });

    fileUpload.addEventListener("drop", (event) => {
      event.preventDefault();
      fileUpload.classList.remove("drag-over");

      const files = event.dataTransfer.files;

      // If files are dropped, set them to the input element
      if (files.length) {
        fileInput.files = files;
        alert(`You uploaded: ${files[0].name}`);
      }
    });

    // File selection using the input
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length) {
        alert(`You selected: ${fileInput.files[0].name}`);
      }
    });
  }

  const colorInputs = document.querySelectorAll(".color-input");

  if (colorInputs) {
    colorInputs.forEach((input) => {
      input.addEventListener("input", updateColor);
    });

    // Initialize with the default values
    colorInputs.forEach((input) => {
      const event = new Event("input");
      input.dispatchEvent(event); // Trigger the input event to initialize the circles
    });
  }
  const addWallet = document.querySelector(".addWallet");

  if (addWallet) {
    addWallet.addEventListener("click", function () {
      openhrismodal();
    });
  }

  // document.addEventListener("click", () => {
  //   dropdownList.classList.add("hidden");
  // });
});

function openhrismodal() {
  document.getElementById("hrismodalOverlay").style.display = "flex";
}

// Close hrismodal Function
function closehrismodal() {
  document.getElementById("hrismodalOverlay").style.display = "none";
}

function openDetails() {
  document.getElementById("detailsPanel").classList.add("open");
}

function closeDetails() {
  document.getElementById("detailsPanel").classList.remove("open");
}

function updateColor(event) {
  const input = event.target; // The input element that triggered the event
  const colorCircle = input.parentElement.querySelector(".color-circle");
  const colorCode = input.value;

  // Validate and apply the color
  if (/^#[0-9A-Fa-f]{6}$/i.test(colorCode)) {
    colorCircle.style.backgroundColor = colorCode;
  } else {
    colorCircle.style.backgroundColor = "transparent"; // Default when invalid
  }
}
