// Button back to top
const $backTopButton = document.querySelector(".back-to-top-button")
document.addEventListener("scroll", () => {
  if (this.scrollY > 100) {
    $backTopButton.classList.remove("hide")
  } else {
    $backTopButton.classList.add("hide")
  }
})


// Toggle menu hamb
const $menuHambIcon = document.querySelector(".menu-hamb-icon")
const $closeMenuHamb = document.querySelector(".close-menu-hamb")
const $menuHambItems = document.querySelector(".header-navigation-items")
const $toggleMenuHambButton = document.querySelectorAll(".toggle-menu-hamb")
const $overlayContainer = document.querySelector(".overlay-container")

$toggleMenuHambButton.forEach(button => button.addEventListener("click", () => {
  $menuHambItems.classList.toggle("show")
  $menuHambIcon.classList.toggle("d-none")
  $closeMenuHamb.classList.toggle("d-block")
  $overlayContainer.classList.toggle("active")
}))

// Close menu hamb
function onCloseMenuHamb() {
  $menuHambItems.classList.remove("show")
  $menuHambIcon.classList.remove("d-none")
  $closeMenuHamb.classList.remove("d-block")
  $overlayContainer.classList.remove("active")
}

$menuHambNavigationItems = document.querySelectorAll(".navigation-item")
$menuHambNavigationItems.forEach(item => {
  item.addEventListener("click", () => {
    onCloseMenuHamb()
  })
})

$overlayContainer.addEventListener("click", () => {
  onCloseMenuHamb()
})