import {getallImpresoras,getImpresoraPorId,crearImpresora,actualizaImpresora,eliminarImpresora} from '../model/impresoraModel.js'



export const getImpresoras = async (req,res)=> {
    try {
        const result = await getallImpresoras(req.body)

        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }  
}

export const getImpresora = async (req,res)=>{
    try {
        const result = await getImpresoraPorId(req.params.id)
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
        res.status(500).json(error.message);
    }
    
}

export const createImpresora = async (req,res)=> {
    try {
        const result = await crearImpresora(req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }    
}


export const updateImpresora = async (req, res) => {
    try {
        const result = await actualizaImpresora(req.params.id,req.body)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
};


export const deleteImpresora = async(req,res)=>{ 
    try {
        const {id}=req.params

        const result = await eliminarImpresora(id)
        
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        
        res.status(500).json(error.message);
    }
}