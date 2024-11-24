import {getallContadores,getContadoresPorId,crearContadorDeImpresiones,actualizaContador,eliminarContador} from '../model/contadorImpModel.js'

export const getContadores = async (req,res)=> {
    try {
        const result = await getallContadores(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }  
}

export const getContador = async (req,res)=>{
    try {
        const result = await getContadoresPorId(req.params.id)
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
        res.status(500).json(error.message);
    }
    
}

export const createContador = async (req,res)=> {
    try {
        const result = await crearContadorDeImpresiones(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }    
}

export const updateContador = async (req, res) => {
    try {
        const result = await actualizaContador(req.params.id,req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
};

export const deleteContador = async(req,res)=>{ 
    try {
        const {id}=req.params

        const result = await eliminarContador(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}