import type Vehicle from "./vehicleModel";

interface Application {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    streetAddress?: string;
    city?: string;
    state?: string;
    vehicles?: [Vehicle, Vehicle?, Vehicle?]; //allow up to 3 vehicles per application
  }

export default Application