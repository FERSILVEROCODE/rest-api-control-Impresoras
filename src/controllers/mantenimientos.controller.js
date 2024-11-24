import {getallMantenimientos,getMantenimientosPorId,crearNuevoMantenimiento,actualizaMantenimiento,eliminarMantenimiento} from '../model/mantenimientosModel.js'

export const getMantenimientos = async (req,res)=> {
    try {
        const result = await getallMantenimientos(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }  
}

export const getMantenimiento = async (req,res)=>{
    try {
        const result = await getMantenimientosPorId(req.params.id)
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
        res.status(500).json(error.message);
    }
    
}

export const createMantenimiento = async (req,res)=> {
    try {
        const result = await crearNuevoMantenimiento(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }    
}

export const updateMantenimiento = async (req, res) => {
    try {
        const result = await actualizaMantenimiento(req.params.id,req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
};

export const deleteMantenimiento = async(req,res)=>{ 
    try {
        const {id}=req.params

        const result = await eliminarMantenimiento(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}