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
    button.addEventListener("click", function (event) {
      openModal(event.target.getAttribute("data-id"));
    });
  });

  // Delete button logic
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      openModal(event.target.getAttribute("data-id"));
    });
  });

  // Open Delete Modal Function
  function openModal(dataId) {
    const modal = document.querySelector(dataId);
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
  const closeDetailsButton = document.querySelector(".details-close-btn");
  const tabs = document.querySelectorAll(".tab2");
  const detailsContent = document.querySelector(".details-content");

  if (detailsPanel) {
    detailsPanel.forEach((panel) => {
      panel.addEventListener("click", function () {
        openDetails();
      });
    });
  }

  if (closeDetailsButton) {
    closeDetailsButton.addEventListener("click", function () {
      closeDetails();
    });
  }

  // tabs.forEach((tab) => {
  //   tab.addEventListener("click", () => {
  //     // Remove the active class from all tabs
  //     tabs.forEach((t) => t.classList.remove("active"));

  //     // Add the active class to the clicked tab
  //     tab.classList.add("active");

  //     // For now, display the same content regardless of the tab clicked
  //     detailsContent.innerHTML = `
  //       <p><strong>Full Name</strong> <span>Jamiu Jimoh</span></p>
  //       <p><strong>Employee ID</strong> <span>j-001</span></p>
  //       <p><strong>Email Address</strong> <span>waleyinka55@gmail.com</span></p>
  //       <p><strong>Status</strong> <span>Active</span></p>
  //       <p><strong>Position</strong> <span>Software Engineer</span></p>
  //       <p><strong>Gross Income</strong> <span>1200000.00</span></p>
  //       <p><strong>Currency</strong> <span>NGN</span></p>
  //       <p><strong>Manual Payment</strong> <span>No</span></p>
  //     `;
  //   });
  // });

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));

          tab.classList.add("active");

          const tabKey = tab.getAttribute("data-tab");

          const tabData = data[tabKey];

          if (tabData) {
            detailsContent.innerHTML = `
              <h3>${tabData.title}</h3>
              ${tabData.details
                .map(
                  (item) => `
                <p><strong>${item.label}</strong> <span>${item.value}</span></p>
              `
                )
                .join("")}
            `;
          } else {
            detailsContent.innerHTML = `<p>No data available for this section.</p>`;
          }
        });
      });

      // Trigger the first tab click to load initial content
      tabs[0].click();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      detailsContent.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    });

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

  if(toggleButtonForOnboardingEmployees){
    document.addEventListener("click", (event) => {
      if(!event.target.classList.contains("dropdown-toggle2")){
        dropdownList.classList.add("hidden");
      }
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

  const primaryInput = $("#primaryInput");
  const secondaryInput = $("#secondaryInput");

  // Function to update colors
  const updateColor = (event) => {
    const target = event.target;
    const isPrimary = target.id.includes("primary");
    const colorValue = target.value;

    // Determine elements to update
    const circleId = isPrimary ? "#primaryCircle" : "#secondaryCircle";
    const textInputId = isPrimary ? "#primaryText" : "#secondaryText";
    const pickerId = isPrimary ? "#primaryPicker" : "#secondaryPicker";
    const cssVarName = isPrimary ? "--primary-color" : "--secondary-color";

    // Update circle, text, and CSS variables
    $(circleId).css("background-color", colorValue);
    $(textInputId).val(colorValue);
    $(pickerId).val(colorValue);
    document.documentElement.style.setProperty(cssVarName, colorValue);
  };

  // Event listeners for color inputs and text inputs
  $(".color-input").on("input", updateColor);
  $(".text-input").on("input", function () {
    const colorValue = $(this).val();
    const inputType = this.id.includes("primary")
      ? "#primaryPicker"
      : "#secondaryPicker";

    // Validate and update only if the value is a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(colorValue)) {
      $(inputType).val(colorValue).trigger("input");
    }
  });

  // Initialize colors
  $(".color-input").trigger("input");

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
