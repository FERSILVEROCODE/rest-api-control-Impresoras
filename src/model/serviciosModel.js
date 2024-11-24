import {pool} from '../db.js'

export async function getallServicios(req,res){
    try {
        const [rows] = await pool.query('SELECT * FROM servicios')
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getServicioPorId(req,res){
    try {
        let sql = 'SELECT * FROM servicios WHERE id_servicio = ?';
      
        let id = req

        const [rows,fields] = await pool.query(sql, id);

        // Si no hay resultados, responde con un mensaje indicando que no hay registros
        if (rows.length === 0) {
            return { message: "No existen registros de servicios con el ID proporcionado ", data:rows};
        }
        
        return rows;

    } catch (err) {
        console.log(err);
      }
}

export async function crearNuevoServicio (body,res){
    try {        
        let consulta = ('INSERT INTO servicios (descripcion,tipo_printer) VALUES(?,?)')
        
        const datos = [body.descripcion, body.tipo_printer];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`No se pudo crear el registro`);
            error.status = 404;
            throw error;
          }
         
        const [rows] = await pool.query('SELECT * FROM servicios WHERE id_servicio =?', [result.insertId]);
        return { message: "se ha registrado con exito ", data:rows};
    
    } catch (error) {
        throw error;
    }

}


export async function actualizaServicio (id,body){
    try {        
        const consulta = 'UPDATE servicios SET id_servicio = IFNULL(?, id_servicio), descripcion = IFNULL(?, descripcion), tipo_printer = IFNULL(?, tipo_printer) WHERE id = ?'
        
        const datos = [body.id_servicio, body.descripcion, body.tipo_printer, id];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`Servicio no encontrado`);
            error.status = 404;
            throw error;
          }
        const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
        return ({message: "servicio actualizado con exito" , data: rows[0]});
    } catch (error) {
        throw error;
    }

}

export async function eliminarServicio(id){
    try {
        const sql = 'DELETE FROM servicios WHERE id = ?';
        
        const [result] = await pool.query(sql,id);
        
        if (result.affectedRows === 0){
            const error = new Error(`servicio no encontrado`);
            error.status = 404;
            throw error;
          }
        return({message:`registro con ID ${id} eliminado con exito `})
      } catch (err) {
        console.log(err);
      }
}