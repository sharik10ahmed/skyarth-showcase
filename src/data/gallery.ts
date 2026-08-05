import hero from "@/assets/hero-villa.jpg";
import commercial from "@/assets/commercial.jpg";
import apartment from "@/assets/apartment.jpg";
import factory from "@/assets/factory.jpg";
import sliding from "@/assets/sliding.jpg";
import french from "@/assets/french.jpg";
import casement from "@/assets/casement.jpg";
import installation from "@/assets/installation.jpg";

export const galleryFilters = ["All", "Windows", "Doors", "Sliding", "Projects", "Factory", "Installation"];

export const gallery = [
  { id: "g1", title: "Casement Detail", category: "Windows", image: casement },
  { id: "g2", title: "Terrace Sliding System", category: "Sliding", image: sliding },
  { id: "g3", title: "Villa Façade Glazing", category: "Projects", image: hero },
  { id: "g4", title: "Profile Welding Line", category: "Factory", image: factory },
  { id: "g5", title: "On-Site Fitting", category: "Installation", image: installation },
  { id: "g6", title: "French Door Set", category: "Doors", image: french },
  { id: "g7", title: "Corporate Curtain Glazing", category: "Projects", image: commercial },
  { id: "g8", title: "Apartment Window Grid", category: "Windows", image: apartment },
  { id: "g9", title: "Track Assembly", category: "Factory", image: factory },
  { id: "g10", title: "Balcony Slider", category: "Sliding", image: sliding },
  { id: "g11", title: "Entry Door Install", category: "Installation", image: installation },
  { id: "g12", title: "Garden Door Opening", category: "Doors", image: french },
];
