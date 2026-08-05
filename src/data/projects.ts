import hero from "@/assets/hero-villa.jpg";
import commercial from "@/assets/commercial.jpg";
import apartment from "@/assets/apartment.jpg";
import factory from "@/assets/factory.jpg";
import sliding from "@/assets/sliding.jpg";
import french from "@/assets/french.jpg";
import casement from "@/assets/casement.jpg";

export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Corporate",
  "Villa",
  "Apartment",
  "Office",
];

export const projects = [
  { id: "pj1", title: "Aurelia Private Villa", category: "Villa", location: "Baner, Pune", completion: "March 2025", image: hero, description: "Lift & slide doors and tall casement glazing across a 9,500 sq.ft. contemporary villa." },
  { id: "pj2", title: "Meridian Corporate Park", category: "Corporate", location: "Kharadi, Pune", completion: "November 2024", image: commercial, description: "Fixed and tilt-turn façade glazing over eight floors with solar-control DGUs." },
  { id: "pj3", title: "Sereno Heights", category: "Apartment", location: "Wakad, Pune", completion: "July 2024", image: apartment, description: "412 apartments fitted with three-track sliding windows and mesh shutters." },
  { id: "pj4", title: "Northline Industrial Unit", category: "Industrial", location: "Chakan, Pune", completion: "February 2024", image: factory, description: "Large-format fixed glazing and utility doors engineered for a manufacturing plant." },
  { id: "pj5", title: "The Grove Residences", category: "Residential", location: "Hinjewadi, Pune", completion: "September 2025", image: sliding, description: "Sliding doors opening onto private decks for 48 low-rise garden homes." },
  { id: "pj6", title: "Lumière Boutique Hotel", category: "Commercial", location: "Koregaon Park, Pune", completion: "January 2025", image: french, description: "French windows and acoustic DGUs delivering 38 dB suite-level noise reduction." },
  { id: "pj7", title: "Axis Business Centre", category: "Office", location: "Viman Nagar, Pune", completion: "May 2024", image: commercial, description: "Coupled fixed and openable systems across 62,000 sq.ft. of office floorplate." },
  { id: "pj8", title: "Casa Verde Rowhouses", category: "Residential", location: "Bavdhan, Pune", completion: "December 2024", image: casement, description: "Casement windows with woodgrain laminate finish for 26 rowhouses." },
  { id: "pj9", title: "Skyline Executive Tower", category: "Commercial", location: "Magarpatta, Pune", completion: "August 2025", image: apartment, description: "High-rise tilt & turn glazing rated for 2400 Pa wind load." },
];
