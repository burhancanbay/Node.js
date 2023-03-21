import {
  createContract,
  getContractDetails,
  getContracts,
  removeContract,
  updateContract,
} from "../controller/ContractController";

import { Router } from "express";
import { adminUser } from "../middleWares/adminUser";

const contractRouter = Router();

contractRouter.get("/", getContracts);
contractRouter.get("/:id", getContractDetails);
contractRouter.post("/", adminUser, createContract);
contractRouter.put("/:id", adminUser, updateContract);
contractRouter.delete("/:id", adminUser, removeContract);

export { contractRouter };
