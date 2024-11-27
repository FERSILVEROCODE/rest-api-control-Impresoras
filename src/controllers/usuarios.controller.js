import {getallUsers,getUserPorId,crearNuevoUsuario,actualizaUsuario,eliminarUsuario} from '../model/usuariosModel.js'
import jwt from 'jsonwebtoken';
import bc from 'bcrypt';


const { sign } = jwt;
const { compareSync } = bc;



export const getUsuarios = async (req,res)=> {
    try {
        const result = await getallUsers(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }  
}

export const getUsuario = async (req,res)=>{
    try {
        const result = await getUserPorId(req.params.id)
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
        res.status(500).json(error.message);
    }
    
}

export const createUsuario = async (req,res)=> {
    try {
        const result = await crearNuevoUsuario(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }    
}

export const updateUsuario = async (req, res) => {
    try {
        const result = await actualizaUsuario(req.params.id,req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
};

export const deleteUsuario = async(req,res)=>{ 
    try {
        const {id}=req.params.id

        const result = await eliminarUsuario(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}


export const login = async (req, res) => {
    try {
        const { mail, pass } = req.body;
        const result = await model.findByMail(mail);
        const iguales = compareSync(pass, result.pass);
        if (iguales) {
            let user = {
                mail: result.mail
            }
            //firmar(dato_a_firmar, 'clave_a_utulizar_en_la_firma', {time_life}, (err, exito)=>{ manejar el resultado})
            sign(user, 'ultraMegaSecretPass', { expiresIn: '600s' }, (err, token) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.status(200).json({ datos: user, credentials: token });
                }
            })
        } else {
            res.status(403).send({ message: 'Contraseña Incorrecta' });
        }
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message });
    }
}

