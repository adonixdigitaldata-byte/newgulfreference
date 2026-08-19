export interface AssetMeta {
  src: string;
  alt: string;
  altAr: string;
  category: string;
  aspectRatio?: string;
}

export const ASSETS = {
  hero: {
    femaleProfessionalBeigeHijab: {
      src: "/images/hero/medical-professional-hijab.jpg",
      alt: "Gulf M Reference healthcare professional in clinical environment",
      altAr: "أخصائية رعاية صحية في بيئة سريرية لدى جولف إم ريفرنس",
      category: "1. Female healthcare professional wearing a beige hijab",
    },
  },
  about: {
    femaleProfessionalGreenHijab: {
      src: "/images/about/healthcare-director-green-hijab.jpg",
      alt: "Healthcare consultant and specialist in medical support attire",
      altAr: "استشارية وأخصائية رعاية صحية في الدعم الطبي",
      category: "2. Female healthcare professional wearing a green hijab",
    },
    surgicalProcedure: {
      src: "/images/about/surgical-procedure-support.jpg",
      alt: "Clinical procedure assistance and specialized medical operations",
      altAr: "دعم العمليات والخدمات الجراحية المتخصصة",
      category: "4. Medical professional in surgical environment",
    },
  },
  whyUs: {
    ambulanceEnvironment: {
      src: "/images/why-us/emergency-ambulance-logistics.jpg",
      alt: "Emergency medical transport and healthcare logistics coordination",
      altAr: "تنسيق الخدمات اللوجستية الطبية الطارئة",
      category: "3. Ambulance / medical equipment environment",
    },
  },
  services: {
    warehouseActivities: {
      src: "/images/services/medical-warehouse-logistics.jpg",
      alt: "Medical equipment warehouse management and storage planning",
      altAr: "إدارة وتخطيط مستودعات المعدات الطبية",
      category: "Medical Equipment Warehouse Activities",
    },
    programsSoftware: {
      src: "/images/services/healthcare-software-systems.jpg",
      alt: "Clinical software and medical digital workflow systems",
      altAr: "برمجيات الرعاية الصحية وأنظمة سير العمل السريرية",
      category: "Medical Equipment Programs & Software",
    },
    glpTracksCaring: {
      src: "/images/services/clinical-care-monitoring.jpg",
      alt: "Structured care workflow tracking and communication",
      altAr: "متابعة مسارات الرعاية والتواصل السريري المنظم",
      category: "GLP Tracks Caring",
    },
    installationEquipment: {
      src: "/images/services/equipment-installation-handover.jpg",
      alt: "Medical device technical installation and commissioning",
      altAr: "تركيب واختبار وتسليم الأجهزة والمعدات الطبية",
      category: "Installation of Medical Equipment",
    },
    newTechnologies: {
      src: "/images/services/future-medical-technology.jpg",
      alt: "Advanced medical device consultation and healthcare technology roadmap",
      altAr: "استشارات أحدث تقنيات الأجهزة الطبية وحلول المستقبل",
      category: "New Technologies Medical Devices",
    },
  },
  support: {
    hospitals: {
      src: "/images/support/hospitals-infrastructure.jpg",
      alt: "Hospital facilities and inpatient clinical environments",
      altAr: "المستشفيات والمنشآت السريرية المتكاملة",
    },
    clinicalTeams: {
      src: "/images/support/clinical-teams-collaboration.jpg",
      alt: "Physicians, surgical teams, and clinical departments",
      altAr: "الفرق السريرية والأطباء وأقسام الجراحة",
    },
    specialistFacilities: {
      src: "/images/support/specialist-facilities-centers.jpg",
      alt: "Specialized diagnostic and ambulatory healthcare centers",
      altAr: "المراكز التشخيصية والعيادات التخصصية",
    },
    healthcareInnovators: {
      src: "/images/support/healthcare-innovators-technology.jpg",
      alt: "Medical technology developers and healthcare innovation pioneers",
      altAr: "مبتكرو التكنولوجيا الطبية ورواد الرعاية الصحية",
    },
  },
};
