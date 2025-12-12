import { NextApiRequest, NextApiResponse } from "next";
import { Bantex } from "@/models";
import { authorize } from "@/middlewares/rbac";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method Not Allowed",
    });
  }

  const { name, location, is_active } = req.body;

  const user = (req as any).user;

  try {
    const newBantex = await Bantex.create({
      name,
      location,
      is_active,
      created_by: user.username,
    });

    return res.status(201).json({
      status: true,
      message: "Bantex data saved.",
      data: newBantex,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "FAILED to save bantex data.",
      error: error.message,
    });
  }
}

// ⬇ DAFTAR ROLE YANG DIIZINKAN
export default authorize(["ADMIN", "SUPERADMIN"], handler);
