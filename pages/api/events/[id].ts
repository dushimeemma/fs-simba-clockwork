import asyncHandler from "middlewares/errors/async_handler";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;

    const event = await prisma.event.findMany({
      where: { eventType: { userId: Number(id) } },
      include: { eventType: { include: { user: true } } },
    });
    if (event === null) {
      return res.status(404).json({
        status: "failed",
        error: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event retrieved successfully",
      data: event,
    });
  }
};

export default asyncHandler(handler);
