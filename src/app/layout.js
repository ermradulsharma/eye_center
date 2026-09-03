import "./globals.css";

export const metadata = {
  title: "R.S. Eye Care & Rehabilitation Center, Etah | Best Eye Hospital",
  description: "Premier Eye Hospital, Low Vision Rehabilitation Center, and Optical Store in Etah, UP. Expert Cataract Surgery (MICS), LASIK, Glaucoma & Prescription Power Glasses.",
  keywords: ["Eye Hospital Etah", "Best Eye Doctor Etah", "Cataract Surgery Etah", "LASIK Etah", "Vision Rehabilitation UP", "Chasma Shop Etah"],
  openGraph: {
    title: "R.S. Eye Care & Rehabilitation Center, Etah",
    description: "Complete Eye Care Solutions under one roof: Doctor OPD Checkup, Micro-Incision Surgery, and In-House Optical Store.",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "R.S. Eye Care & Rehabilitation Center",
  "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600",
  "telephone": "+91-9876543210",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "GT Road, Near Railway Crossing",
    "addressLocality": "Etah",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "207001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "27.5615",
    "longitude": "78.6622"
  },
  "medicalSpecialty": ["Ophthalmology", "Optometry", "VisionRehabilitation"],
  "openingHours": "Mo-Sa 09:30-19:00",
  "priceRange": "₹₹"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
