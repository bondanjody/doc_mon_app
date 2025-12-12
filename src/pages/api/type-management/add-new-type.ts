import { NextApiRequest, NextApiResponse } from "next";
import { Type } from "@/models";
import { authorize } from "@/middlewares/rbac";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method Not Allowed",
    });
  }

  const { name, description } = req.body;
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
    const existingType = await Type.findOne({
      where: { name },
    });

    if (existingType) {
      return res.status(409).json({
        status: false,
        message: `Type already exists !`,
      });
    }

    // ================================
    // 💾 INSERT DATA
    // ================================
    const newType = await Type.create({
      name,
      description,
      created_by: user.username,
    });

    return res.status(201).json({
      status: true,
      message: "Type data saved.",
      data: newType,
    });
  } catch (error: any) {
    console.error("SAVE TYPE ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "FAILED to save type data.",
      error: error.message,
    });
  }
}

// ⬇ ROLE YANG DIIZINKAN
export default authorize(["ADMIN", "SUPERADMIN"], handler);
