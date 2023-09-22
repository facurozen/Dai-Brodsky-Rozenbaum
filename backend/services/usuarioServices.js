import 'dotenv/config';
import config from '../dbconfig.js';
import sql from 'mssql';

class UsuarioServices {
  static register = async (User) => {
    let rowsAffected = 0;
    console.log('estoy en el insert');
    console.log(User);
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('pUsuario',User.Usuario)
        .input('pPassword',User.Password)
        .input('pNombre', User.Nombre)
        .input('pApellido',User.Apellido)
        .query('INSERT INTO Usuario (Usuario,Password,Nombre,Apellido) VALUES (@pUsuario,@pPassword,@pNombre,@pApellido)');
      rowsAffected = result.rowsAffected; // Accede al número de filas afectadas en el índice 0
    } catch (error) {
      console.log(result.rowsAffected);
      console.log("error");
    }
    return rowsAffected;
  };

  static loguearse = async (usuario, password) => {
      let rowsAffected = 0;
      console.log('Estoy en: usuarioServices.Loguearse()');
      try{
        let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pUsuario",usuario)
                .input("pContraseña",password)
                .query('SELECT * FROM Usuario WHERE Usuario = @pUsuario AND Password = @pContraseña');
                rowsAffected = result.rowsAffected;
      }catch(error){
        console.log(error);
      }
      return rowsAffected;
};

}
export default UsuarioServices;
