const db = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// GET CONTROLLERS
const getAllUsers = (req, res, next) => {  
    db.query("SELECT * FROM usuarios;", (err, result) => {
        res.status(201).send(result);
    });
};

const getAllCars = (req, res, next) => {
    const { userID } = req.query;
    db.query(`SELECT coches.*, usuarios.surnames_name 
    FROM coches INNER JOIN usuarios USING (userID) WHERE userID=${userID};`, (err, result) => {
        res.status(201).send(result);
    });
};

const getAllInvoice = (req, res, next) => {  
    db.query(`SELECT facturas.*, usuarios.surnames_name 
    FROM facturas INNER JOIN usuarios ON facturas.userID = usuarios.userID;`, (err, result) => {
        res.status(201).send(result);
    });    
};

const getOneClient = (req, res, next) => {
    const { userID } = req.query;
    db.query(`SELECT * 
    FROM usuarios WHERE userID=${userID};`, (err, result) => {
        res.status(201).send(result);
    });
};

const getOneCar = (req, res, next) => {  
    const { licensePlate } = req.query;
    db.query(`SELECT coches.*, usuarios.surnames_name 
    FROM coches INNER JOIN usuarios USING (userID) WHERE licensePlate="${licensePlate}";`, (err, result) => {
        res.status(201).send(result);
    });
};

const getOneInvoice = (req, res, next) => {
    const { invoiceID } = req.query;
    db.query(`SELECT facturas.*, usuarios.surnames_name 
    FROM facturas INNER JOIN usuarios ON facturas.userID = usuarios.userID WHERE invoiceID=${invoiceID};`, (err, result) => {
        if (err) return console.log(err)
        res.status(201).send(result);
    });
};

const getAdmin = (req, res) => {
    db.query(`SELECT * FROM admin;`, (err, result) => {
        res.status(201).send(result);
    });
}



// POST CONTROLLERS
const postOneUser = (req, res, next) => {  
    const { surnames_name, adress, phoneNumber, email, moreInfo } = req.body;
    db.query(`INSERT INTO usuarios (surnames_name, adress, phoneNumber, email, moreInfo) 
    VALUES (?, ?, ?, ?, ?);`, [surnames_name, adress, phoneNumber, email, moreInfo], (err, result) => {         
        if (err) console.log(err);
        res.status(201).send("POST REQUEST DONE");
    });   
};

const postOneCar = (req, res, next) => {  
    const { licensePlate, branch, model, motor, year, userID } = req.body;
    db.query(`INSERT INTO coches (licensePlate, branch, model, motor, year, userID) 
    VALUES (?, ?, ?, ?, ?, ?);`, [licensePlate, branch, model, motor, year, userID], (err, result) => {         
        if (err) console.log(err);
        res.status(201).send("POST REQUEST DONE");
    });   
};

const postOneInvoice = (req, res, next) => {  
    const { item1, disc1, price1, item2, disc2, price2, item3, disc3, price3, iva, total, userID, licensePlate } = req.body;
    db.query(`INSERT INTO facturas (item1, disc1, price1, item2, disc2, price2, item3, disc3, price3, iva, total, userID, licensePlate) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [item1, disc1, price1, item2, disc2, price2, item3, disc3, price3, iva, total, userID, licensePlate], (err, result) => {         
        if (err) console.log(err);
        res.status(201).send("POST REQUEST DONE");
    });   
};

const postRegister = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const { name, email } = req.body;
        db.query(`INSERT INTO admin (name, email, password)
        VALUES (?, ?, ?);`, [name, email, hashedPassword], (err, result) => {
            res.status(201).send("REGISTER DONE");
        });
      } catch {
        res.status(500).send()
      }
    //Nos registramos y se almacena el usuario en la DB con la contraseña encriptada
};

const postLogin = (req, res, next) => {
    db.query("SELECT * FROM admin;", (err, data) => {
        if (req.body.email === data[0].email) {
            try {
                bcrypt.compare(req.body.password, data[0].password, (error, result) => {
                    if(error) {
                        res.send(error);
                    } else if (result) {
                        const user = { email: req.body.email }
                        const email = req.body.email;
                        const accessToken = jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '1d'});
                        res.json({ email: email, token: accessToken});
                    } else {
                        return res.json({success: false, message: 'Contraseña incorrecta'});
                    }
                })
            } catch (e) {
                res.status(500).send(e)
            }
        } else {
            return res.json({success: false, message: 'Usuario inexistente'});
        }      
    }); 
    //Si el usuario coincide con el de la DB, obtendremos un token para acceder a otros endpoints que estarán protegidos
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
        //user devuelve el email y 'iat' o momento en el que el token fue creado
    })
}



// PUT CONTROLLERS
const updateOneUser = (req, res, next) => { 
    db.query(`UPDATE usuarios SET ? WHERE userID=?;`, [req.body, req.params.id], (err, result) => {        
        if (err) console.log(err, req.params);
        res.status(201).send(`User ${req.params.id} updated from DB`);
    });    
};



// DELETE CONTROLLERS
const deleteOneUser = (req, res, next) => {    
    const userID = req.params;
    db.query("DELETE FROM usuarios WHERE userID=?;", [userID.id], (err, result) => {        
        if (err) console.log(err);
        res.status(201).send(`User ${userID.id} deleted from DB`);
    });    
};

const deleteOneCar = (req, res, next) => {    
    const licensePlate = req.params;
    db.query("DELETE FROM coches WHERE licensePlate=?;", [licensePlate.lp], (err, result) => {        
        if (err) console.log(err);
        res.status(201).send(`Car with license plate: ${licensePlate.lp}, deleted from DB`);
    });    
};

const deleteOneInvoice = (req, res, next) => {    
    const invoiceID = req.params;
    db.query("DELETE FROM facturas WHERE invoiceID=?;", [invoiceID.id], (err, result) => { 
        try {
            res.status(201).send(`Invoice ${invoiceID.id} deleted from DB`);
            console.log(invoiceID.id)
        } catch (e) {
            console.error(e)
        }
        
    });    
};

module.exports = { getAllUsers, getAllCars, getAllInvoice, 
    getOneCar, getOneInvoice, postOneUser, deleteOneUser, 
    deleteOneCar, deleteOneInvoice, postOneCar, postOneInvoice,
    updateOneUser, postRegister, postLogin, 
    authenticateToken, getAdmin, getOneClient };