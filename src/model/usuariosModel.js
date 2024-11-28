import {pool} from '../db.js'

export async function getallUsers(req,res){
    try {
        const [rows] = await pool.query('SELECT * FROM USUARIO')
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getUserPorId(req,res){
    try {
        let sql = 'SELECT * FROM USUARIO WHERE id_usuario = ?';
      
        let id = req

        const [rows,fields] = await pool.query(sql, id);

        // Si no hay resultados, responde con un mensaje indicando que no hay registros
        if (rows.length === 0) {
            return { message: "No existen registro de usuario con el ID proporcionado ", data:rows};
        }

        
        return (rows)

    } catch (err) {
        console.log(err);
      }
}

export async function crearNuevoUsuario (body,res){
    try {        
        let consulta = ('INSERT INTO USUARIO (nombre,apellido,mail,pass,fecha_creacion,telefono,id_printer) VALUES(?,?,?,?,?,?,?)')
        
        const datos = [body.nombre, body.apellido, body.mail, body.pass, body.fecha_creacion, body.telefono, body.id_printer];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`No se pudo crear el registro`);
            error.status = 404;
            throw error;
          }
         
        const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario =?', [result.insertId]);
        return { message: "se ha registrado con exito ", data:rows};
    
    } catch (error) {
        throw error;
    }

}


export async function actualizaUsuario (id,body){
    try {        
        const consulta = 'UPDATE USUARIO SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), mail = IFNULL(?, mail), pass = IFNULL(?, pass), fecha_creacion = IFNULL(?, fecha_creacion), telefono = IFNULL(?, telefono), id_printer = IFNULL(?, id_printer)  WHERE id_usuario = ?'
        
        const datos = [body.nombre, body.apellido, body.mail, body.pass, body.fecha_creacion, body.telefono, body.id_printer, id];

        const [result] = await pool.query(consulta, datos);

        if (result.affectedRows === 0){
            const error = new Error(`usuario no encontrado`);
            error.status = 404;
            throw error;
          }
        const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [id]);
        return ({message: "Usuario actualizado con exito" , data: rows[0]});
    } catch (error) {
        throw error;
    }

}

export async function eliminarUsuario(id){
    try {
        const sql = 'DELETE FROM USUARIO WHERE id_usuario = ?';
        
        const [result] = await pool.query(sql,id);
        
        if (result.affectedRows === 0){
            const error = new Error(`Usuario no encontrado`);
            error.status = 404;
            throw error;
          }
        return({message:`registro con ID ${id} eliminado con exito `})
      } catch (err) {
        console.log(err);
      }
}

//un metodo que utiliza la funcion del login para saber si existe ese usuario o no
export async function findByMail (mail){
    try {

      const sql = 'select mail,pass FROM USUARIO WHERE mail = ?';
        
      const [rows] = await pool.query(sql,mail);
      /*
      const consulta = `SELECT mail, pass FROM usuario where mail = $1`;
      const { rows } = await pool.query(consulta, [mail]);*/
  
      if (rows.length === 0) {
        const error = new Error(`Usuario no encontrado con el mail : ${mail}`);
        error.status = 404;
        throw error;
      }
  
      return rows[0]; //si no saltó el error en el if anterior entoces se devuelve el resultado
    } catch (error) {
      throw error;
    }
  }
