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
    // ================================
    // 🔍 VALIDASI INPUT
    // ================================
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Invalid 'name' value.",
      });
    }

    // ================================
    // 🔍 CEK DUPLIKAT NAMA
    // ================================
    const existingRack = await Rack.findOne({
      where: { name },
    });

    if (existingRack) {
      return res.status(409).json({
        status: false,
        message: `Rack already exists !`,
      });
    }

    // ================================
    // 💾 INSERT DATA
    // ================================
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
    console.error("SAVE RACK ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "FAILED to save rack data.",
      error: error.message,
    });
  }
}

// ⬇ ROLE YANG DIIZINKAN
export default authorize(["ADMIN", "SUPERADMIN"], handler);
