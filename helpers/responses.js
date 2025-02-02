const responseHandler = (req, res, next) => {

    // 200

    res.success = (data = '', message = "Operacion realizada con exito") => {
      res.status(200).json({
        ok: true,
        message,
        data,
      });
    };

    res.nocontent = (data = '', message = "No se han encontrado registros") => {
      res.status(204).json({
        ok: true,
        message,
        data
      });
    };

    // 400

    res.badrequest = (message = "Estructura incorrecta") => {
      res.status(400).json({
        ok: false,
        message
      });
    };
    
    // 401
    
    res.unathorized = (message = "No esta autorizado") => {
      res.status(401).json({
        ok: false,
        message
      });
    };
    
    // 403
    
    res.forbidden = (message = "No tiene los permisos para consumir este recurso") => {
      res.status(403).json({
        ok: false,
        message
      });
    };
    
    
    // Otros errores
  
    res.error = (code, message = "Ocurrio un error", details = null) => {
      res.status(code).json({
        ok: false,
        message,
        error: {
          code,
          details
        },
      });
    };
  
    next();
  };
  
  module.exports = responseHandler;