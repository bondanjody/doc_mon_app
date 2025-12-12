import { NextApiRequest, NextApiResponse } from "next";
import { Bantex, Rack } from "@/models";
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
    // 🔍 VALIDASI INPUT DASAR
    // ================================
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Kolom 'name' wajib diisi.",
      });
    }

    if (!location) {
      return res.status(400).json({
        status: false,
        message: "Kolom 'location' wajib diisi.",
      });
    }

    // ================================
    // 🔍 VALIDASI LOCATION (RACK)
    // Cek apakah location (id rack) ada & aktif
    // ================================
    const rack = await Rack.findOne({
      where: { id: location, is_active: true },
    });

    if (!rack) {
      return res.status(400).json({
        status: false,
        message: `Rack dengan ID '${location}' tidak ditemukan atau tidak aktif.`,
      });
    }

    // ================================
    // 🔍 VALIDASI NAME UNIK
    // ================================
    const duplicateName = await Bantex.findOne({
      where: { name },
    });

    if (duplicateName) {
      return res.status(409).json({
        status: false,
        message: `Bantex dengan name '${name}' sudah ada.`,
      });
    }

    // ================================
    // 💾 INSERT DATA
    // ================================

    const newBantex = await Bantex.create({
      name,
      location,
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
