import {pool} from '../db.js'

export async function getallImpresoras(req,res){
    try {
        const [rows] = await pool.query('SELECT * FROM impresoras')
        // Si no hay resultados, responde con un mensaje indicando que no hay registros
        if (rows.length === 0) {
            return { message: "No existen registros de impresoras ", data:rows};
        }

        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getImpresoraPorId(req,res){
    try {
        let sql = 'SELECT * FROM impresoras WHERE id_impresora = ?';
      
        let id = req

        const [rows,fields] = await pool.query(sql, id);

        // Si no hay resultados, responde con un mensaje indicando que no hay registros
        if (rows.length === 0) {
            return { message: "No existen registros de impresoras con el ID proporcionado ", data:rows};
        }
        
        return (rows)

    } catch (err) {
        console.log(err);
      }
}

export async function crearImpresora (body,res){
    try {        
        let consulta = ('INSERT INTO impresoras (marca,modelo,numero_serie,num_inventario,tipo,propiedad,contador_impresiones,ubicacion,fecha_registro,id_area) VALUES(?,?,?,?,?,?,?,?,?,?)')
        
        const datos = [body.marca, body.modelo, body.numero_serie, body.num_inventario, body.tipo, body.propiedad, body.contador_impresiones, body.ubicacion, body.fecha_registro, body.id_area];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`No se pudo crear la impresora`);
            error.status = 404;
            throw error;
          }
         
        const [rows] = await pool.query('SELECT * FROM impresoras WHERE id_impresora =?', [result.insertId]);
        return { message: "impresora creada con exito ", data:rows};
    
    } catch (error) {
        throw error;
    }

}


export async function actualizaImpresora (id,body){
    try {        
        const consulta = 'UPDATE impresoras SET marca = IFNULL(?, marca), modelo = IFNULL(?, modelo), numero_serie = IFNULL(?, numero_serie), num_inventario = IFNULL(?, num_inventario), tipo = IFNULL(?, tipo), propiedad = IFNULL(?, propiedad), contador_impresiones = IFNULL(?, contador_impresiones), ubicacion = IFNULL(?, ubicacion), fecha_registro = IFNULL(?, fecha_registro), id_area = IFNULL(?, id_area) WHERE id_impresora = ?'
        
        const datos = [body.marca, body.modelo, body.numero_serie, body.num_inventario, body.tipo, body.propiedad, body.contador_impresiones, body.ubicacion, body.fecha_registro, body.id_area, id];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`impresora no encontrada`);
            error.status = 404;
            throw error;
          }
        const [rows] = await pool.query('SELECT * FROM impresoras WHERE id_impresora = ?', [id]);
        return ({message: "impresora actualizada con exito" , data: rows[0]});
    } catch (error) {
        throw error;
    }

}

export async function eliminarImpresora(id){
    try {
        const sql = 'DELETE FROM impresoras WHERE id_impresora = ?';
        
        const [result] = await pool.query(sql,id);
        
        if (result.affectedRows === 0){
            const error = new Error(`impresora no encontrada`);
            error.status = 404;
            throw error;
          }
        return({message:`impresora con ID ${id} eliminada con exito `})
      } catch (err) {
        console.log(err);
      }
}

