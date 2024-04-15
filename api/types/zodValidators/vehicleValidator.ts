import { z } from 'zod';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const vehicleValidator = z.object({
  vin: z.string().optional(),
  year: z.number().int().min(1985).max(nextYear).optional(), //min 1985, max next year
  make: z.string().optional(),
  model: z.string().optional(),
  appId: z.number().int().optional(),
});

export default vehicleValidator;