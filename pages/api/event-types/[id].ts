import asyncHandler from "middlewares/errors/async_handler";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const eventType = await prisma.eventType.findUnique({
      where: { id: Number(id) },
      include: { user: true, events: true },
    });
    if (eventType === null) {
      return res.status(404).json({
        status: "failed",
        error: "Event type not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event type retrieved successfully",
      data: eventType,
    });
  }
};

export default asyncHandler(handler);
