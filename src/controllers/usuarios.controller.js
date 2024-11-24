import {getallUsers,getUserPorId,crearNuevoUsuario,actualizaUsuario,eliminarUsuario} from '../model/usuariosModel.js'

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
        const {id}=req.params

        const result = await eliminarUsuario(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}