import { Request, Response } from 'express'
import { CreateAssessmentService } from '../../services/assessment/CreateAssessmentService'

export class CreateAssessmentController {
    async handle(req: Request, res: Response) {
        try {
            const { note, comment, productId } = req.body;
    
            const createAssessmentService = new CreateAssessmentService();
    
            const result = await createAssessmentService.execute({ note, comment, productId });
    
            return res.status(201).json(result);

        } catch(err) {
            console.log(err);
            res.status(404).json({error:err})
        }
    }
}




