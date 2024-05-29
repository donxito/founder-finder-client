export interface Ad  {
  id: string;
  posterName: string;
  businessIdea: string;
  location: string;
  investment: string;
  requiredSkills: string[];
  description: string;
  posterInfo: {
    name: string;
    about: string;
    email: string;
    phone: number;
  };
}