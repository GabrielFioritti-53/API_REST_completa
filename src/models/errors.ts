
// Errores de cliente
export const NoEncontradoError = {
	code: 'NO_ENCONTRADO',
	message: 'El recurso solicitado no fue encontrado',
	statusCode: 404
};
export const ErrorAutenticacion = {
	code: 'ERROR_AUTENTICACION',
	message: 'Error de autenticación',
	statusCode: 401
};
export const ErrorAutorizacion = {
	code: 'ERROR_AUTORIZACION',
	message: 'No tienes permisos para realizar esta acción',
	statusCode: 403
};
export const ErrorValidacion = {
	code: 'ERROR_VALIDACION',
	message: 'Error de validación de datos',
	statusCode: 400
};
export const ErrorConflicto = {
	code: 'ERROR_CONFLICTO',
	message: 'Conflicto al procesar la solicitud',
	statusCode: 409
};

// Errores de servidor
export const ErrorInterno = {
	code: 'ERROR_INTERNO',
	message: 'Ha ocurrido un error interno en el servidor',
	statusCode: 500
};
export const ErrorBaseDatos = {
	code: 'ERROR_BASE_DATOS',
	message: 'Error al interactuar con la base de datos',
	statusCode: 500
};
export const ErrorServicioNoDisponible = {
	code: 'ERROR_SERVICIO_NO_DISPONIBLE',
	message: 'El servicio no está disponible',
	statusCode: 503
};
export const ErrorTiempoAgotado = {
	code: 'ERROR_TIEMPO_AGOTADO',
	message: 'La solicitud ha excedido el tiempo límite',
	statusCode: 504
};