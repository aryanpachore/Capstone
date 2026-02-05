import express from "express";
import {
  rewriteText,
  generateClause,
  analyzeDocument,
} from "../controllers/magic.controller.js";

const router = express.Router();

router.post("/rewrite", rewriteText);
router.post("/generate", generateClause);
router.post("/analyze", analyzeDocument);

export default router;
