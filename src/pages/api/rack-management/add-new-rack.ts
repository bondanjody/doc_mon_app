import { NextApiRequest, NextApiResponse } from "next";
import { Rack } from "@/models";
import { authorize } from "@/middlewares/rbac";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method Not Allowed",
    });
  }

  const { name, location } = req.body;

  const user = (req as any).user;

  try {
    const newRack = await Rack.create({
      name,
      location,
      created_by: user.username,
    });

    return res.status(201).json({
      status: true,
      message: "Rack data saved.",
      data: newRack,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "FAILED to save rack data.",
      error: error.message,
    });
  }
}

// ⬇ DAFTAR ROLE YANG DIIZINKAN
export default authorize(["ADMIN", "SUPERADMIN"], handler);
