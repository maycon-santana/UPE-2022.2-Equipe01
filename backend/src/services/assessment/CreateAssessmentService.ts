import { Assessment } from "@prisma/client";
import prismaClient from "../../prisma";

interface AssessmentDTO {
    productId: number;
    note: number;
    comment: string;
}

export class CreateAssessmentService {
    async execute({ productId, note, comment }: AssessmentDTO): Promise<Assessment> {
            const assessment = await prismaClient.assessment.create({
                data: {
                    note,
                    comment,
                    product: {
                        connect: { id: productId }
                    }
                }
            });
    
            // Atualiza o valor de assessmentId no produto correspondente
        
        return assessment;
    }
}