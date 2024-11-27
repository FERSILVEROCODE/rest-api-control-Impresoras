import { body, check, validationResult } from "express-validator"

export const reglas_para_validar_id = () => [
    check('id_impresora')
        .isInt().withMessage('el id debe ser un numero entero')
        .isLength({ max: 10 }).withMessage('no tan largo che')
];



export const rulesCreate = () => [
    body("marca")
        .notEmpty()
        .withMessage("La marca de la impresora es obligatoria")
        .isLength({ max: 50 })
        .withMessage("La marca no puede exceder los 50 caracteres"),
    body("modelo")
        .notEmpty()
        .withMessage("el modelo de la impresora es obligatorio")
        .isLength({ max: 50 })
        .withMessage("el modelo no puede exceder los 50 caracteres"),    
    body("numero_serie")
        .notEmpty()
        .withMessage("el numero de serie tambien es obligatorio")
        .isLength({ max: 50 })
        .withMessage("el numero de serie no puede exceder los 50 caracteres")
        
];

export const rulesUpdate = () => [
    check("marca")
        .notEmpty().withMessage("la marca  es obligatoria"),
    check("modelo")
        .notEmpty().withMessage("el modelo es obligatorio"),
    check("numero_serie")
        .notEmpty().withMessage("el numero de serie es obligatorio")
];

export const rulesList = () => [
    check("id_impresora")
        .notEmpty().withMessage("el ID no puede ser nulo")
        .isInt().withMessage('El id debe ser un valor numerico')
];


export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};