export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  desk: string;
  deskColor: string;
  date: string;
  readTime: string;
  content: string;
}

export interface Signal {
  desk: string;
  deskColor: string;
  title: string;
  date: string;
}

export interface EditorialDesk {
  id: string;
  name: string;
  label: string;
  color: string;
  description: string;
}

export interface ConstitutionalDesk {
  id: string;
  name: string;
  status: "red" | "amber" | "green";
  constitutionalSection: string;
  finding: string;
  source: string;
  tier: number;
  tierLabel: string;
}

export interface Town {
  id: number;
  name: string;
  municipality: string;
  province: string;
  lat: number;
  lng: number;
  aiAccessScore: number;
  languageSupport: number;
  offlineAccess: number;
  responseTime: number;
}

export interface Country {
  name: string;
  flag: string;
  policy: number;
  compute: number;
  talent: number;
}

export interface EvidenceRecord {
  id: string;
  source: string;
  url: string;
  date: string;
  finding: string;
  constitutionalRight: string;
  tier: number;
  desk: string;
  type: "desktop" | "primary";
}
