import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';
import cors from 'cors';

import * as Controllers from '../controllers/application';

import applicationValidator from '../types/zodValidators/applicationValidator';
import type Application  from '../types/modelTypes/applicationModel';
const routes = Router();

routes.post('/',
    validateRequest({
        body: applicationValidator,
    }),
    async (req, res) => {

        const application : Application = applicationValidator.parse(req.body);
        console.log("creating new application", application);
        const app = await Controllers.createApplication(application);

        res.json({
            message: `Start a new insurance application with id ${app.appId}`,
            callbackUrl: `http://localhost:5173/?id=${app.appId}`,
        });

    });

routes.get('/:id', async (req, res) => {

    const id = req.params.id;
    const dbApp = await Controllers.getApplicationFromDb(id); //null if not found

    console.log("fetched application", dbApp);
    res.json({
        message: `Get insurance application with id ${req.params.id}`,
        application: dbApp,
    });
});

routes.put('/:id', (req, res) => {
    res.json({
        message: `Update insurance application with id ${req.params.id}`,
    });
});

routes.post('/:id/submit', (req, res) => {
    res.json({
        message: `Submit insurance application with id ${req.params.id}`,
    });
});

export default routes;
