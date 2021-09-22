import { Router } from "express";
import {
  getCierres,
  getCierresCount,
  saveCierre,
  getCierre,
  deleteCierre,
  updateCierre,
  getCierreLocales,
} from "../controllers/controlCierreController";

const router = Router();

router.get("/cierre", getCierres);

router.get("/cierre/count", getCierresCount);

// ruta ingreso agrupado
router.get("/cierre/locales", getCierreLocales);

router.post("/cierre", saveCierre);

router.get("/cierre/:id", getCierre);

router.delete("/cierre/:id", deleteCierre);

router.put("/cierre/:id", updateCierre);

export default router;
