import { Router } from "express";
import {
  getIngresos,
  getIngresosCount,
  saveIngreso,
  getIngreso,
  deleteIngreso,
  updateIngreso,
  getUltimoRegistro,
  getIngresoColaboradores,
} from "../controllers/controlIngresoController";

const router = Router();

router.get("/ingreso", getIngresos);

router.get("/ingreso/count", getIngresosCount);

// ruta ingreso agrupado por id_colaborador
router.get("/ingreso/colaboradores", getIngresoColaboradores);

router.post("/ingreso", saveIngreso);

router.get("/ingreso/:id", getIngreso);

// último registro
router.get("/ingreso/ultimoregistro/:id", getUltimoRegistro);

router.delete("/ingreso/:id", deleteIngreso);

router.put("/ingreso/:id", updateIngreso);

export default router;
