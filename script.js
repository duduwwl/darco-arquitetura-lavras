const galleries = {
  residencia: {
    title: "Residência contemporânea",
    images: [
      { src: "assets/residencia-01-hd.webp", alt: "Fachada da residência com iluminação cênica", caption: "Materialidade e luz" },
      { src: "assets/residencia-02-hd.webp", alt: "Fachada da residência vista da rua ao entardecer", caption: "Fachada e relação com a rua" },
      { src: "assets/residencia-03.jpg", alt: "Vista aérea do jardim e área de estar da residência", caption: "Jardim e área de convivência" },
      { src: "assets/residencia-04.jpg", alt: "Área de estar externa e paisagismo da residência", caption: "Área externa e paisagismo" },
      { src: "assets/residencia-05.jpg", alt: "Vista da residência a partir do jardim", caption: "Arquitetura vista do jardim" },
      { src: "assets/residencia-06.jpg", alt: "Fachada da residência vista em perspectiva da rua", caption: "Perspectiva da fachada" }
    ]
  },
  postinho: {
    title: "Postinho",
    images: [
      { src: "assets/postinho-01.jpg", alt: "Fachada do projeto comercial Postinho", caption: "A presença da fachada" },
      { src: "assets/postinho-02.jpg", alt: "Entrada e área externa do Postinho", caption: "Entrada e circulação" },
      { src: "assets/postinho-03.jpg", alt: "Área externa coberta do Postinho", caption: "Área externa e convivência" },
      { src: "assets/postinho-04.jpg", alt: "Detalhe da varanda coberta do Postinho", caption: "Varanda e materialidade" },
      { src: "assets/postinho-05.jpg", alt: "Vista lateral do edifício comercial Postinho", caption: "Vista lateral" },
      { src: "assets/postinho-06.jpg", alt: "Fachada do Postinho vista frontalmente", caption: "Composição da fachada" }
    ]
  },
  gastronomia: {
    title: "Espaço gastronômico",
    images: [
      { src: "assets/gastronomia-01.jpg", alt: "Fachada do espaço gastronômico vista da rua", caption: "Fachada e relação com a rua" },
      { src: "assets/gastronomia-02.jpg", alt: "Entrada do espaço gastronômico", caption: "Entrada e área externa" },
      { src: "assets/gastronomia-03.jpg", alt: "Fachada do espaço gastronômico vista de frente", caption: "Composição da fachada" },
      { src: "assets/gastronomia-04.jpg", alt: "Área de convivência do espaço gastronômico", caption: "Área de convivência" },
      { src: "assets/gastronomia-05.jpg", alt: "Ambiente interno do espaço gastronômico", caption: "Interior e materialidade" }
    ]
  }
};

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");
const dialog = document.getElementById("gallery-dialog");
const galleryTitle = document.getElementById("gallery-title");
const galleryImage = document.getElementById("gallery-image");
const galleryCaption = document.getElementById("gallery-caption");
let currentGallery = null;
let currentIndex = 0;

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 36);
}

function closeMenu() {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
updateHeader();

function showGalleryImage() {
  const gallery = galleries[currentGallery];
  const item = gallery.images[currentIndex];
  galleryTitle.textContent = gallery.title;
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = `${item.caption} · Visualização arquitetônica`;
}

function openGallery(name, index) {
  if (!galleries[name]) return;
  currentGallery = name;
  currentIndex = Number(index) || 0;
  showGalleryImage();
  dialog.showModal();
  document.body.classList.add("gallery-open");
}

function moveGallery(direction) {
  if (!currentGallery) return;
  const length = galleries[currentGallery].images.length;
  currentIndex = (currentIndex + direction + length) % length;
  showGalleryImage();
}

document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(button.dataset.gallery, button.dataset.index));
});
document.getElementById("gallery-close").addEventListener("click", () => dialog.close());
document.getElementById("gallery-prev").addEventListener("click", () => moveGallery(-1));
document.getElementById("gallery-next").addEventListener("click", () => moveGallery(1));
dialog.addEventListener("close", () => {
  document.body.classList.remove("gallery-open");
  galleryImage.removeAttribute("src");
});
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") { event.preventDefault(); moveGallery(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); moveGallery(1); }
});
