import {pool} from '../db.js'

export async function getallContadores(req,res){
    try {
        const [rows] = await pool.query('SELECT * FROM contadores_impresiones')
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getContadoresPorId(req,res){
    try {
        let sql = 'SELECT * FROM contadores_impresiones WHERE id_impresora = ?';
      
        let id = req

        const [rows,fields] = await pool.query(sql, id);

        
        return (rows)

    } catch (err) {
        console.log(err);
      }
}

export async function crearContadorDeImpresiones (body,res){
    try {        
        let consulta = ('INSERT INTO contadores_impresiones (id,id_impresora,contador,fecha) VALUES(?,?,?,?)')
        
        const datos = [body.Id_impresora, body.contador, body.fecha];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`No se pudo crear el registro`);
            error.status = 404;
            throw error;
          }
         
        const [rows] = await pool.query('SELECT * FROM contador_impresiones WHERE id =?', [result.insertId]);
        return { message: "se ha registrado con exito ", data:rows};
    
    } catch (error) {
        throw error;
    }

}


export async function actualizaContador (id,body){
    try {        
        const consulta = 'UPDATE contador_impresiones SET id_impresora = IFNULL(?, id_impresora), contador = IFNULL(?, contador), fecha = IFNULL(?, fecha) WHERE id = ?'
        
        const datos = [body.id_impresora, body.contador, body.fecha, id];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`contador no encontrado`);
            error.status = 404;
            throw error;
          }
        const [rows] = await pool.query('SELECT * FROM contador_impresiones WHERE id = ?', [id]);
        return ({message: "contador actualizado con exito" , data: rows[0]});
    } catch (error) {
        throw error;
    }

}

export async function eliminarContador(id){
    try {
        const sql = 'DELETE FROM contador_impresiones WHERE id = ?';
        
        const [result] = await pool.query(sql,id);
        
        if (result.affectedRows === 0){
            const error = new Error(`registro no encontrado`);
            error.status = 404;
            throw error;
          }
        return({message:`registro con ID ${id} eliminado con exito `})
      } catch (err) {
        console.log(err);
      }
}
