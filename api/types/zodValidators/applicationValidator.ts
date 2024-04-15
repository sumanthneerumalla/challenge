import { z } from 'zod';
import vehicleValidator from './vehicleValidator';


const today = new Date();
const maxBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

const applicationValidator = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z.date().max(maxBirthDate).optional(), //only allowed to be as young as 16 to have insurance
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().min(2).max(2).optional(), //only allowing 2 character state codes
    zipcode: z.number().max(99999).optional(),
    vehicles: z.array(vehicleValidator).nonempty().max(3).optional(), //allow up to 3 vehicles per application
  });

export default applicationValidator;