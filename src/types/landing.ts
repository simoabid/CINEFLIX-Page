export interface Movie {
  id: string;
  title: string;
  genres: string[];
  rating: number;
  year: number;
  img: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  mutedFeatures?: string[];
  isPopular?: boolean;
}
