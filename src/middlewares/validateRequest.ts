import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import type z from "zod";

export const validateRequest = (schema: z.ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => err.message);

        console.log(error);

        return res.status(500).json({
          error: 'Invalid request',
          details: errorMessages
        });
      }

      // Jika error bukan dari ZodError
      return res.status(500).json({
        error: "Internal server error"
      });
    }
  };



  // kode ini dipanggil sebelum memanggil ffungsi dari validate controller. untuk chcking request yang masuk ke dalam kontroller. jika ada request yang tiak valid mak akan dilakukan throw error 

