import casement from "@/assets/casement.jpg";
import sliding from "@/assets/sliding.jpg";
import french from "@/assets/french.jpg";
import commercial from "@/assets/commercial.jpg";
import apartment from "@/assets/apartment.jpg";
import factory from "@/assets/factory.jpg";
import installation from "@/assets/installation.jpg";
import hero from "@/assets/hero-villa.jpg";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  short: string;
  description: string;
  image: string;
  gallery: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  advantages: string[];
  technicalFeatures: string[];
  benefits: string[];
};

export const products: Product[] = [
  {
    id: "pr1",
    slug: "casement-windows",
    title: "Casement Windows",
    category: "Windows",
    short: "Side-hung windows with full ventilation and a flush, architectural sightline.",
    description:
      "Skyarth casement windows open outward or inward on multi-point espagnolette hardware, delivering unrestricted ventilation, an airtight seal when closed and a clean flush profile that suits both contemporary villas and heritage renovations.",
    image: casement,
    gallery: [casement, hero, installation],
    specifications: [
      { label: "Profile Depth", value: "60 mm / 70 mm multi-chambered" },
      { label: "Reinforcement", value: "Galvanised steel core, 1.5 mm" },
      { label: "Glazing", value: "5 mm single to 24 mm DGU" },
      { label: "Hardware", value: "Multi-point locking, stainless friction stays" },
      { label: "Wind Load", value: "Tested up to 2400 Pa" },
    ],
    applications: ["Villas", "Apartments", "Bedrooms & living rooms", "Hospitality projects"],
    advantages: ["100% ventilation opening", "Airtight compression seal", "Excellent acoustic rating", "Easy exterior cleaning"],
    technicalFeatures: ["EPDM double gasket", "Concealed drainage channels", "Lead-free calcium-zinc compound", "Optional grill & mesh integration"],
    benefits: ["Lower cooling loads", "Reduced external noise", "Zero maintenance finish", "25+ year service life"],
  },
  {
    id: "pr2",
    slug: "sliding-windows",
    title: "Sliding Windows",
    category: "Windows",
    short: "Space-saving horizontal sliders with wide glass and smooth stainless rollers.",
    description:
      "The most specified system in Indian homes — Skyarth sliding windows glide on twin stainless-steel rollers within a reinforced track, offering wide glass surfaces without intruding into interior space.",
    image: sliding,
    gallery: [sliding, apartment, commercial],
    specifications: [
      { label: "Track Options", value: "2 / 3 track systems" },
      { label: "Profile Depth", value: "60 mm – 92 mm" },
      { label: "Sash Weight", value: "Up to 80 kg per shutter" },
      { label: "Glazing", value: "Up to 24 mm insulated glass" },
      { label: "Interlock", value: "Anti-lift interlocking meeting stile" },
    ],
    applications: ["Apartments", "Balconies", "Offices", "Compact urban homes"],
    advantages: ["No swing space required", "Wide uninterrupted glass", "Effortless operation", "Integrated mosquito mesh track"],
    technicalFeatures: ["Stainless twin-wheel rollers", "Brush pile weather sealing", "Sloped sill drainage", "Optional tandem lock"],
    benefits: ["Maximised daylight", "Space efficiency", "Smooth lifetime operation", "Easy cleaning access"],
  },
  {
    id: "pr3",
    slug: "french-windows",
    title: "French Windows",
    category: "Windows",
    short: "Floor-to-ceiling glazed openings that connect interiors to terraces and gardens.",
    description:
      "French windows extend from floor level to lintel, dissolving the boundary between interior and landscape. Skyarth builds them with reinforced tall sashes and premium hinge sets rated for daily use.",
    image: french,
    gallery: [french, hero, sliding],
    specifications: [
      { label: "Max Height", value: "Up to 2700 mm per sash" },
      { label: "Profile", value: "70 mm reinforced casement series" },
      { label: "Hinges", value: "3D adjustable heavy-duty" },
      { label: "Glazing", value: "Toughened / laminated DGU" },
      { label: "Threshold", value: "Low-rise weathered sill" },
    ],
    applications: ["Villas", "Terrace access", "Garden rooms", "Boutique hotels"],
    advantages: ["Dramatic daylight", "Seamless indoor-outdoor flow", "Premium visual proportion", "Safety-glass options"],
    technicalFeatures: ["Reinforced tall-sash construction", "Multi-point shoot bolts", "Concealed drainage", "Optional georgian bars"],
    benefits: ["Elevated property value", "Panoramic views", "Excellent ventilation", "Weather-tight seal"],
  },
  {
    id: "pr4",
    slug: "fixed-windows",
    title: "Fixed Windows",
    category: "Windows",
    short: "Non-operable picture glazing for uninterrupted views and maximum insulation.",
    description:
      "Fixed windows deliver the largest possible glass area with the tightest thermal envelope — ideal for stairwells, double-height living areas and façade compositions where light matters more than airflow.",
    image: commercial,
    gallery: [commercial, hero, apartment],
    specifications: [
      { label: "Max Panel", value: "2400 x 2400 mm" },
      { label: "Profile Depth", value: "60 mm / 70 mm" },
      { label: "Glazing", value: "Up to 32 mm DGU" },
      { label: "Sealing", value: "Structural glazing bead + EPDM" },
      { label: "U-Value", value: "As low as 1.6 W/m²K" },
    ],
    applications: ["Stairwells", "Double-height halls", "Commercial façades", "Feature walls"],
    advantages: ["Largest glass area", "Best-in-class insulation", "Lowest maintenance", "Cost-efficient per sq.ft."],
    technicalFeatures: ["Glazing bead fixing", "Thermal break options", "Structural reinforcement", "Solar-control glass options"],
    benefits: ["Maximum daylight", "Superior thermal comfort", "No moving parts", "Uninterrupted views"],
  },
  {
    id: "pr5",
    slug: "tilt-and-turn-windows",
    title: "Tilt & Turn Windows",
    category: "Windows",
    short: "Dual-action European hardware — tilt for trickle ventilation, turn for full access.",
    description:
      "A single handle controls two modes: tilt inward for secure background ventilation, or swing fully open for cleaning and airflow. The definitive premium European window system.",
    image: casement,
    gallery: [casement, sliding, installation],
    specifications: [
      { label: "Hardware", value: "European tilt-turn gearing" },
      { label: "Profile Depth", value: "70 mm, 5-chamber" },
      { label: "Glazing", value: "24 mm – 32 mm DGU" },
      { label: "Security", value: "Multi-point mushroom cams" },
      { label: "Sealing", value: "Triple EPDM gasket" },
    ],
    applications: ["High-rise apartments", "Premium residences", "Hotels", "Cold-climate projects"],
    advantages: ["Two ventilation modes", "Child-safe tilt position", "Cleaned from inside", "Highest security grade"],
    technicalFeatures: ["Concealed hinge system", "Micro-ventilation notch", "Anti-mis-handling device", "Triple sealing plane"],
    benefits: ["Secure night ventilation", "Superior weather sealing", "High-rise safe cleaning", "Premium tactile operation"],
  },
  {
    id: "pr6",
    slug: "sliding-doors",
    title: "Sliding Doors",
    category: "Doors",
    short: "Large-format sliding door systems for terraces, balconies and living areas.",
    description:
      "Engineered for wide openings, Skyarth sliding doors move heavy glazed shutters effortlessly on reinforced tracks — the everyday luxury of a fully open living wall.",
    image: sliding,
    gallery: [sliding, hero, french],
    specifications: [
      { label: "Track Options", value: "2 / 3 / 4 track" },
      { label: "Profile Depth", value: "92 mm reinforced" },
      { label: "Shutter Weight", value: "Up to 120 kg" },
      { label: "Glazing", value: "Toughened DGU up to 24 mm" },
      { label: "Locking", value: "Hook lock with anti-lift" },
    ],
    applications: ["Living rooms", "Terraces", "Poolside", "Restaurants & cafés"],
    advantages: ["Very wide openings", "Zero swing clearance", "Panoramic glazing", "Smooth heavy-panel glide"],
    technicalFeatures: ["Tandem bearing rollers", "Stainless track inlay", "Interlock weather seal", "Optional mesh shutter"],
    benefits: ["Indoor-outdoor living", "Abundant daylight", "Low operating effort", "Weather-tight when closed"],
  },
  {
    id: "pr7",
    slug: "openable-doors",
    title: "Openable Doors",
    category: "Doors",
    short: "Hinged uPVC doors for utility, bath, balcony and service entries.",
    description:
      "Robust hinged doors with fully welded frames and moisture-proof panels — a permanent, rust-free alternative to timber for wet and high-traffic areas.",
    image: french,
    gallery: [french, casement, installation],
    specifications: [
      { label: "Profile", value: "70 mm door series" },
      { label: "Panel", value: "Solid uPVC / glazed / louvered" },
      { label: "Hinges", value: "3D adjustable, 3-point" },
      { label: "Lock", value: "Mortise multi-point" },
      { label: "Finish", value: "White, laminated woodgrain" },
    ],
    applications: ["Bathrooms", "Utility areas", "Balconies", "Service entries"],
    advantages: ["Fully waterproof", "Termite proof", "No warping", "Wide finish palette"],
    technicalFeatures: ["Welded corner joints", "Steel-reinforced stiles", "Composite infill panels", "Concealed drainage"],
    benefits: ["Long wet-area life", "Zero repainting", "Secure locking", "Clean modern look"],
  },
  {
    id: "pr8",
    slug: "lift-and-slide-doors",
    title: "Lift & Slide Doors",
    category: "Doors",
    short: "Flagship system for oversized panels with effortless lift-and-glide motion.",
    description:
      "Turning the handle lifts the entire shutter off its seal so a 300 kg glazed panel moves with one finger, then drops into a compression seal for outstanding acoustic and thermal performance.",
    image: hero,
    gallery: [hero, sliding, commercial],
    specifications: [
      { label: "Panel Weight", value: "Up to 300 kg" },
      { label: "Profile Depth", value: "160 mm frame system" },
      { label: "Max Height", value: "Up to 2900 mm" },
      { label: "Glazing", value: "Up to 40 mm insulated glass" },
      { label: "Threshold", value: "Flush / low-rise option" },
    ],
    applications: ["Luxury villas", "Penthouses", "Resorts", "Architect-led residences"],
    advantages: ["Massive glass panels", "Feather-light operation", "Compression sealing", "Flush threshold available"],
    technicalFeatures: ["Lift-slide gear mechanism", "Heavy-duty carriage rollers", "Reinforced multi-chamber frame", "Concealed track drainage"],
    benefits: ["Best-in-class insulation", "Uninterrupted views", "Barrier-free access", "Signature architectural statement"],
  },
  {
    id: "pr9",
    slug: "customized-solutions",
    title: "Customized Solutions",
    category: "Custom",
    short: "Arched, bay, combination and façade-scale framing engineered to your drawings.",
    description:
      "When a standard system will not do, our design cell engineers bespoke framing — arched heads, bay assemblies, corner glazing and coupled façade grids — fabricated to your architect's drawings.",
    image: factory,
    gallery: [factory, commercial, installation],
    specifications: [
      { label: "Geometry", value: "Arched, bay, trapezoidal, corner" },
      { label: "Coupling", value: "Structural mullion coupling" },
      { label: "Finish", value: "50+ laminate & RAL options" },
      { label: "Drawings", value: "Shop drawings with every order" },
      { label: "Lead Time", value: "3 – 6 weeks project dependent" },
    ],
    applications: ["Architectural projects", "Corporate façades", "Heritage restorations", "Industrial glazing"],
    advantages: ["Design freedom", "Engineered to spec", "Coordinated with site", "Single accountable supplier"],
    technicalFeatures: ["CAD-driven fabrication", "Structural calculation support", "Custom reinforcement", "Site mock-up option"],
    benefits: ["Perfect design fit", "Faster approvals", "Reduced site rework", "Distinctive façades"],
  },
];
