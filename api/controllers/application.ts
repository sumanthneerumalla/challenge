import db from '../db';
import type Application  from '../types/modelTypes/applicationModel';

export async function createApplication(newApp: Application ) {

    let data = {firstName: newApp.firstName,
        lastName: newApp.lastName,
        dateOfBirth: newApp.dateOfBirth,
        streetAddress: newApp.streetAddress,
        city: newApp.city,
        state: newApp.state,
    }

    let relatedVehiclesToCreate = undefined;

    if (newApp.vehicles) {

        relatedVehiclesToCreate = {
            create: newApp.vehicles.map((vehicle) => {
                return vehicle;
            })
          }
        
        data = {...data, vehicles: relatedVehiclesToCreate};
    }

    const app = await db.application.create({
        data: data
    })
    return app;
}

export async function getApplicationFromDb(id: string) {
    const app = await db.application.findUnique({
        where: {appId: Number(id)},
    })
    console.log('found app: ', app);
    return app;
}
