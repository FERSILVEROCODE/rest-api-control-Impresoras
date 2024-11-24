import {getallServicios,getServicioPorId,crearNuevoServicio,actualizaServicio,eliminarServicio} from '../model/serviciosModel.js'

export const getServicios = async (req,res)=> {
    try {
        const result = await getallServicios(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }  
}

export const getServicio = async (req,res)=>{
    try {
        const result = await getServicioPorId(req.params.id)
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
        res.status(500).json(error.message);
    }
    
}

export const createServicio = async (req,res)=> {
    try {
        const result = await crearNuevoServicio(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }    
}

export const updateServicio = async (req, res) => {
    try {
        const result = await actualizaServicio(req.params.id,req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
};

export const deleteServicio = async(req,res)=>{ 
    try {
        const {id}=req.params

        const result = await eliminarServicio(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}