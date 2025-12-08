/**
 * Rhythm & Ruin - Main JavaScript
 * Handles smooth scrolling, photo gallery lightbox, and mobile menu functionality
 */

(function () {
  "use strict";

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }

  // Smooth Scrolling for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or empty
      if (href === "#" || href === "") {
        return;
      }

      // Skip if it's a link to another page (contains .html)
      if (href.includes(".html")) {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight =
          document.getElementById("header")?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Photo Gallery Lightbox
  const photosGrid = document.getElementById("photosGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (photosGrid && lightbox && lightboxImage) {
    const photoItems = photosGrid.querySelectorAll(".photo-item");
    let currentPhotoIndex = 0;
    const photos = [];

    // Collect all photo items
    photoItems.forEach((item, index) => {
      const img = item.querySelector("img");
      if (img) {
        photos.push({
          src: img.src,
          alt: img.alt || `Photo ${index + 1}`,
        });
      } else {
        // For placeholder images, we'll use a placeholder
        photos.push({
          src: "",
          alt: `Photo ${index + 1}`,
          isPlaceholder: true,
        });
      }
    });

    // Open lightbox
    function openLightbox(index) {
      if (photos.length === 0) return;

      currentPhotoIndex = index;
      updateLightboxImage();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }

    // Update lightbox image
    function updateLightboxImage() {
      const photo = photos[currentPhotoIndex];
      const existingPlaceholder = lightboxImage.parentElement.querySelector(
        ".lightbox-placeholder"
      );

      if (photo && !photo.isPlaceholder && photo.src) {
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        lightboxImage.style.display = "block";
        if (existingPlaceholder) {
          existingPlaceholder.remove();
        }
      } else {
        // For placeholders, show a message
        lightboxImage.style.display = "none";
        if (!existingPlaceholder) {
          const placeholder = document.createElement("div");
          placeholder.className = "lightbox-placeholder";
          placeholder.textContent = "Photo coming soon";
          placeholder.style.cssText =
            "color: white; font-size: 1.5rem; text-align: center; padding: 2rem;";
          lightboxImage.parentElement.appendChild(placeholder);
        }
      }
    }

    // Navigate to previous photo
    function showPrevPhoto() {
      if (photos.length === 0) return;
      currentPhotoIndex =
        (currentPhotoIndex - 1 + photos.length) % photos.length;
      updateLightboxImage();
    }

    // Navigate to next photo
    function showNextPhoto() {
      if (photos.length === 0) return;
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      updateLightboxImage();
    }

    // Add click handlers to photo items
    photoItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    // Lightbox controls
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", showPrevPhoto);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", showNextPhoto);
    }

    // Close lightbox on background click
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          showPrevPhoto();
          break;
        case "ArrowRight":
          showNextPhoto();
          break;
      }
    });
  }

  // Header is now sticky, no scroll effects needed

  // Form iframe placeholder handling (for future use)
  const formIframes = document.querySelectorAll(".form-iframe-placeholder");
  formIframes.forEach((placeholder) => {
    // This is where Google Forms iframes would be inserted
    // The placeholder provides instructions for users
  });

  // Band Modal
  const bandModal = document.getElementById("bandModal");
  const bandModalOverlay = document.getElementById("bandModalOverlay");
  const bandModalClose = document.getElementById("bandModalClose");
  const bandModalName = document.getElementById("bandModalName");
  const bandModalGenre = document.getElementById("bandModalGenre");
  const bandModalTime = document.getElementById("bandModalTime");
  const bandModalDescription = document.getElementById("bandModalDescription");
  const bandModalImage = document.getElementById("bandModalImage");
  const bandSocialLinks = document.querySelector(".band-social-links");

  // Band data structure (placeholder - replace with actual data)
  const bandData = {
    headliner: {
      name: "Headliner Band Name",
      genre: "Rock & Metal",
      time: "10:00 PM - 11:00 PM",
      description:
        "This is the headlining act that will close out the night with an unforgettable performance. Known for their high-energy shows and incredible stage presence.",
      socials: [
        { platform: "Website", url: "#", icon: "🌐" },
        { platform: "Facebook", url: "#", icon: "📘" },
        { platform: "Instagram", url: "#", icon: "📷" },
        { platform: "YouTube", url: "#", icon: "▶️" },
      ],
    },
    "featuring-1": {
      name: "Featuring Band 1",
      genre: "Metal",
      time: "9:00 PM - 10:00 PM",
      description:
        "A powerful metal act that brings intense energy and technical prowess to the stage.",
      socials: [
        { platform: "Website", url: "#", icon: "🌐" },
        { platform: "Facebook", url: "#", icon: "📘" },
        { platform: "Instagram", url: "#", icon: "📷" },
      ],
    },
    "featuring-2": {
      name: "Featuring Band 2",
      genre: "Rock",
      time: "8:00 PM - 9:00 PM",
      description:
        "A dynamic rock band known for their catchy riffs and powerful vocals.",
      socials: [
        { platform: "Website", url: "#", icon: "🌐" },
        { platform: "Facebook", url: "#", icon: "📘" },
        { platform: "Spotify", url: "#", icon: "🎵" },
      ],
    },
    "featuring-3": {
      name: "Featuring Band 3",
      genre: "Metal",
      time: "7:00 PM - 8:00 PM",
      description:
        "Heavy metal with a modern twist, delivering crushing riffs and soaring melodies.",
      socials: [
        { platform: "Website", url: "#", icon: "🌐" },
        { platform: "Instagram", url: "#", icon: "📷" },
        { platform: "YouTube", url: "#", icon: "▶️" },
      ],
    },
    "with-1": {
      name: "With Band 1",
      genre: "Rock",
      time: "6:00 PM - 7:00 PM",
      description:
        "An up-and-coming rock band making waves in the local scene.",
      socials: [
        { platform: "Facebook", url: "#", icon: "📘" },
        { platform: "Instagram", url: "#", icon: "📷" },
      ],
    },
    "with-2": {
      name: "With Band 2",
      genre: "Metal",
      time: "5:00 PM - 6:00 PM",
      description:
        "Brutal metal that will get the crowd moving from the first note.",
      socials: [
        { platform: "Website", url: "#", icon: "🌐" },
        { platform: "Instagram", url: "#", icon: "📷" },
      ],
    },
    "with-3": {
      name: "With Band 3",
      genre: "Rock",
      time: "4:00 PM - 5:00 PM",
      description: "Classic rock vibes with a fresh modern edge.",
      socials: [
        { platform: "Facebook", url: "#", icon: "📘" },
        { platform: "Spotify", url: "#", icon: "🎵" },
      ],
    },
    "with-4": {
      name: "With Band 4",
      genre: "Metal",
      time: "3:00 PM - 4:00 PM",
      description:
        "Opening the festival with an explosive set that sets the tone for the night.",
      socials: [
        { platform: "Instagram", url: "#", icon: "📷" },
        { platform: "YouTube", url: "#", icon: "▶️" },
      ],
    },
  };

  function openBandModal(bandId) {
    const band = bandData[bandId];
    if (!band) return;

    bandModalName.textContent = band.name;
    bandModalGenre.textContent = band.genre;
    bandModalTime.textContent = band.time;
    bandModalDescription.innerHTML = `<p>${band.description}</p>`;

    // Clear and populate social links
    bandSocialLinks.innerHTML = "";
    band.socials.forEach((social) => {
      const link = document.createElement("a");
      link.href = social.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "band-social-link";
      link.textContent = `${social.icon} ${social.platform}`;
      bandSocialLinks.appendChild(link);
    });

    bandModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeBandModal() {
    bandModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Add click handlers to all band cards
  const bandCards = document.querySelectorAll(".band-card, .headliner-card");
  bandCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      const bandId = this.getAttribute("data-band");
      if (bandId) {
        openBandModal(bandId);
      }
    });
  });

  // Close modal handlers
  if (bandModalClose) {
    bandModalClose.addEventListener("click", closeBandModal);
  }

  if (bandModalOverlay) {
    bandModalOverlay.addEventListener("click", closeBandModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bandModal.classList.contains("active")) {
      closeBandModal();
    }
  });
})();
