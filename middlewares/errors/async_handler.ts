/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const asyncHandler = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      res.status(500).json({
        errors: [{ error: error.message }],
      });
    }
  };
};

export default asyncHandler;
