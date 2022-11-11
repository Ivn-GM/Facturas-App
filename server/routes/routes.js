const express = require("express");
const router = express.Router();
const { getAllUsers, getAllCars, getAllInvoice, getOneCar, getOneInvoice, 
    postOneUser, deleteOneUser, deleteOneCar, deleteOneInvoice, postOneCar, 
    postOneInvoice, updateOneUser,
    postRegister, postLogin, authenticateToken, getAdmin, getOneClient } = require("../controllers/controller");


// GET REQUEST
// --- GET All users, cars, invoices or admin
router.get("/usuarios", authenticateToken, getAllUsers);
router.get("/coche?", authenticateToken, getAllCars);
router.get("/facturas", authenticateToken, getAllInvoice);
router.get("/admin", authenticateToken, getAdmin);
//--- GET One client, car or one invoice by userID or license plate
router.get("/usuario?", authenticateToken, getOneClient );
router.get("/ind-coche?", authenticateToken, getOneCar);
router.get("/ind-factura?", authenticateToken, getOneInvoice);


// POST REQUEST
// --- POST One user, car or invoice
router.post("/usuarios", authenticateToken, postOneUser);
router.post("/coches", authenticateToken, postOneCar);
router.post("/facturas", authenticateToken, postOneInvoice);
// --- POST register and login of a user
router.post("/registrar", postRegister);
router.post("/acceder", postLogin);


// PUT REQUEST
// --- UPDATE One user
router.put("/usuarios/:id", authenticateToken, updateOneUser);


// DELETE REQUEST
// --- DELETE One user, car or invoice
router.delete("/usuarios/:id", authenticateToken, deleteOneUser);
router.delete("/coches/:lp", authenticateToken, deleteOneCar);
router.delete("/facturas/:id", authenticateToken, deleteOneInvoice);


module.exports = router;