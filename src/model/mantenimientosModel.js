import {pool} from '../db.js'

export async function getallMantenimientos(req,res){
    try {
        const [rows] = await pool.query('SELECT * FROM mantenimientos')
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getMantenimientosPorId(req,res){
    try {
        let sql = 'SELECT * FROM mantenimientos WHERE id_impresora = ?';
      
        let id = req

        const [rows,fields] = await pool.query(sql, id);

        
        return (rows)

    } catch (err) {
        console.log(err);
      }
}

export async function crearNuevoMantenimiento (body,res){
    try {        
        let consulta = ('INSERT INTO mantenimientos (id_impresora,id_servicio,fecha,observaciones) VALUES(?,?,?,?)')
        
        const datos = [body.id_impresora, body.id_servicio, body.fecha, body.observaciones];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`No se pudo crear el registro`);
            error.status = 404;
            throw error;
          }
         
        const [rows] = await pool.query('SELECT * FROM mantenimientos WHERE id =?', [result.insertId]);
        return { message: "se ha registrado con exito ", data:rows};
    
    } catch (error) {
        throw error;
    }

}


export async function actualizaMantenimiento (id,body){
    try {        
        const consulta = 'UPDATE mantenimientos SET id_impresora = IFNULL(?, id_impresora), id_servicio = IFNULL(?, id_servicio), fecha = IFNULL(?, fecha), observaciones = IFNULL(?, observaciones) WHERE id = ?'
        
        const datos = [body.id_impresora, body.id_servicio, body.fecha, body.observaciones, id];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`mantenimiento no encontrado`);
            error.status = 404;
            throw error;
          }
        const [rows] = await pool.query('SELECT * FROM mantenimientos WHERE id = ?', [id]);
        return ({message: "mantenimiento actualizado con exito" , data: rows[0]});
    } catch (error) {
        throw error;
    }

}

export async function eliminarMantenimiento(id){
    try {
        const sql = 'DELETE FROM mantenimientos WHERE id = ?';
        
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
