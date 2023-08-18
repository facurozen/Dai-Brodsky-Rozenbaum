import 'dotenv/config';
import config from '../dbconfig.js';
import sql from 'mssql';

class UsuarioServices {
  static login = async (Usuario) => {
    let rowsAffected = 0;
    console.log('estoy en el insert');

    const { Nombre, Contraseña } = Usuario;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .input('pNombre', Nombre)
        .input('pContraseña', Contraseña)
        .query('INSERT INTO Usuario (Nombre, Contraseña) VALUES (@pNombre, @pContraseña)');
      console.log(result);
      rowsAffected = result.rowsAffected[0]; // Accede al número de filas afectadas en el índice 0
    } catch (error) {
      console.log(error);
    }
    return rowsAffected;
  };

  static authenticate = async (username, password) => {
    let user;

    try {
        let pool = await sql.connect(config);
        let request = new sql.Request(pool); // Crear una instancia de Request
    
        request.input('pNombre', sql.NVarChar, username);
        request.input('pContraseña', sql.NVarChar, password);
    
        let result = await request.query('SELECT * FROM Usuario WHERE Nombre = @pNombre AND Contraseña = @pContraseña');
        
        if (result.recordset && result.recordset.length > 0) {
            user = result.recordset[0];
        } else {
            console.log('No se encontró ningún usuario');
        }
    } catch (error) {
        console.log(error);
    }
    return user;
};

}
export default UsuarioServices;
