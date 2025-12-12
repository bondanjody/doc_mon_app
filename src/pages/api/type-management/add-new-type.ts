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

  const { name, description, is_active } = req.body;

  const user = (req as any).user;

  try {
    const newType = await Type.create({
      name,
      description,
      is_active,
      created_by: user.username,
    });

    return res.status(201).json({
      status: true,
      message: "Berhasil menambah type",
      data: newType,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Gagal menambah type",
      error: error.message,
    });
  }
}

// ⬇ DAFTAR ROLE YANG DIIZINKAN
export default authorize(["ADMIN", "SUPERADMIN"], handler);
