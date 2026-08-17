import { Request, Response } from 'express';

// A static list of some supported countries for the map
const supportedCountries = [
  { code: 'US', name: 'United States' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' },
  { code: 'KR', name: 'South Korea' },
  { code: 'DE', name: 'Germany' },
  { code: 'MX', name: 'Mexico' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' }
];

export const getCountries = (req: Request, res: Response) => {
  return res.status(200).json(supportedCountries);
};
