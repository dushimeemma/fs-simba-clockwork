import asyncHandler from "middlewares/errors/async_handler";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const events = await prisma.event.findMany({
      include: { eventType: { include: { user: true } } },
      orderBy: { id: "desc" },
    });

    res.status(200).json({
      status: "success",
      message: "Events retrieved successfully",
      data: events,
    });
  }
  if (req.method === "POST") {
    const { date, time, name, email, guests, eventType: id, notes } = req.body;
    const { MAILTRAP_USER, MAILTRAP_PASSWORD, SENDER_EMAIL } = process.env;

    const eventType = await prisma.eventType.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (eventType === null) {
      return res.status(404).json({
        status: "failed",
        error: "Event type not found",
      });
    }

    const newEvent = {
      name: name,
      email: email,
      date: new Date(date),
      time,
      guests: guests,
      notes: notes,
      eventTypeId: Number(id),
    };

    const events = await prisma.event.create({
      data: newEvent,
    });

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL,
      to: [email, ...guests],
      subject: "New Message from simba clockwork mission",
      text: `Your have successfully book event ${new Date(date)}`,
      html: `<b>Dear ${name},</b><br><br><br><br>Confirm that you will attend the meeting with ${eventType.user.name}<br><br><br><b><i>simba clockwork mission</i></b>`,
    };

    transport.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(400).json({
          status: "failed",
          error: "message not send",
          data: error,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Event booked successfully",
        data: events,
      });
    });
  }
};

export default asyncHandler(handler);
