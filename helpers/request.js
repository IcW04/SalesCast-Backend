const sql = require('mssql');
const { getConnection } = require("../database");

let guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validIdentifier( id ) {
    return (isNaN(Number(id)) || Number(id) < 1 || Number.isInteger(Number(id)));
}

function isValidDate(dateString, format) {
    let regex;

    switch (format) {
        case 'YYYY-MM-DD':
            regex = /^\d{4}-\d{2}-\d{2}$/;
            break;
        case 'DD/MM/YYYY':
            regex = /^\d{2}\/\d{2}\/\d{4}$/;
            break;
        case 'DD-MM-YYYY':
            regex = /^\d{2}-\d{2}-\d{4}$/;
            break;
        default:
            return { ok: false, msg: "Unsupported format"}; // Formato no contemplado
    }

    // Valida que el string cumpla con la expresion regular
    if (!regex.test(dateString)) return { ok: false, msg: `The given date does not match ${format}` };

    // Basado en el formato indicado, extraer las partes de la fecha
    let parts, day, month, year;

    switch (format) {
        case 'YYYY-MM-DD':
            [year, month, day] = dateString.split('-').map(Number);
            month--; // JS months are 0-based
            break;
        case 'DD/MM/YYYY':
            [day, month, year] = dateString.split('/').map(Number);
            month--;
            break;
        case 'DD-MM-YYYY':
            [day, month, year] = dateString.split('-').map(Number);
            month--;
            break;
    }

    // Validar creando el objeto Date
    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {

        return {ok: true, date};

    } else {

        return {ok: false, msg: `Could not parse the given date: ${attrValue}`}

    }

}

function isValidTime(timeString, format) {
    let regex;

    // Define regex patterns based on the format
    switch (format) {
        case 'HH:mm:ss':
            regex = /^\d{2}:\d{2}:\d{2}$/;
            break;
        case 'HH:mm':
            regex = /^\d{2}:\d{2}$/;
            break;
        default:
            return { ok: false, msg: "Unsupported format" }; // Format not supported
    }

    // Validate the string matches the regex pattern
    if (!regex.test(timeString)) {
        return { ok: false, msg: `The given time does not match ${format}` };
    }

    // Extract hours, minutes, and seconds based on the format
    let hours, minutes, seconds;
    switch (format) {
        case 'HH:mm:ss':
            [hours, minutes, seconds] = timeString.split(':').map(Number);
            break;
        case 'HH:mm':
            [hours, minutes] = timeString.split(':').map(Number);
            seconds = 0; // Default seconds to 0 for this format
            break;
    }

    // Validate the time parts
    if (
        hours >= 0 && hours < 24 &&
        minutes >= 0 && minutes < 60 &&
        seconds >= 0 && seconds < 60
    ) {
        return { ok: true, time: new Date(0, 0, 0, hours, minutes, seconds) };
    } else {
        return { ok: false, msg: "The time parts are invalid" };
    }
}

function validateObjectStructure( attr, parent, parentName ) {
    const { name, type, required } = attr;

        for (elem of parent) {
            
            // Check if the attribute is required but missing
            if (required && !elem.hasOwnProperty(name)) {
                return `Missing required attribute in ${parentName}: ${name}`;
            }
            
            // If the attribute is present, validate its type
            if (elem.hasOwnProperty(name)) {
                const attrValue = elem[name];
                
                // Use switch for type checking
                switch (type) {

                        case "number":
                            if (isNaN(Number(attrValue)) || !Number.isInteger(Number(attrValue)) || Number(attrValue) < 0) {
                                return `Attribute '${name}' must be a positive integer`;
                            }
                        break;

                        case "float":
                            if (isNaN(Number(attrValue)) || Number(attrValue) < 0) {
                                return `Attribute '${name}' must be a positive numeric value`;
                            }
                        break;

                        case "date":
                            const validDate = isValidDate(attrValue, attr.format);
                            if (!validDate.ok) {
                                return `Attribute '${name}' fails: ${validDate.msg}`;
                            } else {
                                elem[name] = validDate.date;
                            }
                        break;

                        case "time":
                            const validTime = isValidTime(attrValue, attr.format);
                            if (!validTime.ok) {
                                return `Attribute '${name}' fails: ${validDate.msg}`;
                            } else {
                                elem[name] = validTime.time;
                            }
                        break;
                            
                        case "array":
                            
                            if (!Array.isArray(attrValue)) {
                                return `Attribute '${name}' should be of type '${type}'`;
                            }
                            
                            let elemType = attr.elemType;
                            
                            if (elemType === "number" && attrValue.some(isNaN)) 
                                {
                                    return `Attribute '${name}' should be of type '${type}' and its elements should be ${elemType}s`;
                                } 
                                else if ( elemType === "guid" && attrValue.some(value => !guidPattern.test(value))) 
                                    {
                                        return `Attribute '${name}' should be of type '${type}' and its elements should be ${elemType}s`;
                                    }
                                    
                        break;
                                        
                        case "guid":
                            if (!guidPattern.test(attrValue)) {
                                return `Attribute '${name}' must be a GUID`;
                            }
                        break;
                                            
                        case "string":
                            if (attrValue.length > attr.len) {
                            return `Attribute '${name}' allows a maximum of ${attr.len} characters`;
                        }
                        break;

                        default:
                            
                            if (typeof attrValue !== type) {
                                return `Attribute '${name}' must be of type ${type}`;
                            }
                        break;
                }

                // return '';
            }
            return '';
        }
    }
            
function validateRequestBody(possibleAttr) {
    return (req, res, next) => {
        for (const attr of possibleAttr) {
            const { name, type, required } = attr;
            
            // Check if the attribute is required but missing
            if (required && (!req.body.hasOwnProperty(name) || req.body[name] == null) ) {
                return res.badrequest(`Missing required attribute: ${name}`);
            }

            // If the attribute is present, validate its type
            if (req.body.hasOwnProperty(name)) {
                const attrValue = req.body[name];

                // Use switch for type checking
                switch (type) {
                    case "number":
                        if (isNaN(Number(attrValue)) || !Number.isInteger(Number(attrValue)) || Number(attrValue) < 0) {
                            return res.badrequest(`Attribute '${name}' must be a positive integer`);
                        }
                        break;

                    case "float":
                        if (isNaN(Number(attrValue)) || Number(attrValue) < 0) {
                            return res.badrequest(`Attribute '${name}' must be a positive numeric value`);
                        }
                    break;

                    case "date":
                        const validDate = isValidDate(attrValue, attr.format);
                        if (!validDate.ok) {
                            return res.badrequest(`Attribute '${name}' fails: ${validDate.msg}`);
                        } else {
                            req.body[name] = validDate.date;
                        }
                        break;

                    case "time":
                        const validTime = isValidTime(attrValue, attr.format);
                        if (!validTime.ok) {
                            return res.badrequest(`Attribute '${name}' fails: ${validTime.msg}`)
                        } else {
                            req.body[name] = validTime.time;
                        }
                    break;
                    
                    case "objectArray":
                        
                        if (!Array.isArray(attrValue)) {
                            return res.badrequest(`Attribute '${name}' should be of type '${type}'`);
                        }

                        let props = attr.props;
                        for (prop in props) {
                            let msg = validateObjectStructure(props[prop], attrValue, name)

                            if (msg.length > 0) return res.badrequest(msg);
                        }
                    break;
                    
                    case "array":

                        if (!Array.isArray(attrValue)) {
                            return res.badrequest(`Attribute '${name}' should be of type '${type}'`);
                        }

                        let elemType = attr.elemType;

                        if (elemType === "number" && attrValue.some(isNaN)) 
                        {
                            return res.badrequest(`Attribute '${name}' should be of type '${type}' and its elements should be ${elemType}s`);
                        } 
                        else if ( elemType === "guid" && attrValue.some(value => !guidPattern.test(value))) 
                        {
                            return res.badrequest(`Attribute '${name}' should be of type '${type}' and its elements should be ${elemType}s`);
                        }

                        break;

                    case "guid":
                        if (!guidPattern.test(attrValue)) {
                            return res.badrequest(`Attribute '${name}' must be a GUID`);
                        }
                        break;

                    case "string":
                        if (attrValue.length > attr.len) {
                            return res.badrequest(`Attribute '${name}' allows a maximum of ${attr.len} characters`);
                        }
                        break;

                    default:

                        if (typeof attrValue !== type) {
                            return res.badrequest(`Attribute '${name}' must be of type ${type}`);
                        }
                        break;
                }
            }
        }

        next();
    };
}

function validateQueryParams(params) {
    return (req, res, next) => {
        for (const param of params) {
            const { name, type, required } = param;

            // Check if the parameter is required but missing
            if (required && !req.query.hasOwnProperty(name)) {
                return res.badrequest(`Missing required parameter: ${name}`);
            }

            // If the parameter is present, validate its type
            if (req.query.hasOwnProperty(name)) {
                const paramValue = req.query[name];

                // Use switch for type checking
                switch (type) {
                    case "number":
                        if (isNaN(Number(paramValue)) || !Number.isInteger(Number(paramValue)) || Number(paramValue) < 0) {
                            return res.badrequest(`Parameter '${name}' must be a positive integer`);
                        }
                        break;

                    case "float":
                        if (isNaN(Number(attrValue)) || Number(attrValue) < 0) {
                            return res.badrequest(`Attribute '${name}' must be a positive numeric value`);
                        }
                    break;

                    case "date":
                        const validDate = isValidDate(paramValue, param.format);
                        if (!validDate.ok) {
                            return res.badrequest(`Parameter '${name}' fails: ${validDate.msg}`);
                        } else {
                            req.body[name] = validDate.date;
                        }
                        break;

                    case "time":
                        const validTime = isValidTime(paramValue, param.format);
                        if (!validTime.ok) {
                            return res.badrequest(`Attribute '${name}' fails: ${validDate.msg}`)
                        } else {
                            req.body[name] = validTime.time;
                        }
                    break;

                    case "string":
                        if (paramValue.length > param.len) {
                            return res.badrequest(`Query parameter '${name}' allows a maximum of ${param.len} characters`);
                        }
                        break;

                    case "guid":
                        if (!guidPattern.test(attrValue)) {
                            return res.badrequest(`Query parameter '${name}' must be a GUID`);
                        }
                        break;

                    default:

                        if (typeof paramValue !== type) {
                            return res.badrequest(`Query parameter '${name}' must be of type ${type}`);
                        }
                        break;
                }
            }
        }

        next();
    };
}

function validatePermissions(permission) {
    return (req, res, next) => {
        if ( !req.jwt_data.permissions.includes(permission) ) {
            return res.forbidden();
        }
        else {
            next();
        }
    }
}

async function validateStock( requested, clientId ) {

    // REQUESTED
    // {
    //      r200: 1
    //      r500: 1
    //      r1000: 1
    //      r2000: 1
    // }

    let pool;
    let actualStock;

    try {

        pool = await getConnection();
        let stockTickets = await pool.request()
                .input('ClientID', sql.BigInt, clientId)
                .input('StatusTicket', sql.Bit, 1)
                .execute('Fuel.sp_GetCountTickets');

        let stock = stockTickets.recordset[0];
        actualStock = { 
            r100: Number(stock.D100),
            r200: Number(stock.D200),
            r300: Number(stock.D300),
            r500: Number(stock.D500),
            r1000: Number(stock.D1000),
            r2000: Number(stock.D2000)
        };
        
    } catch (error) {
        return error;
    }

    let errors = [];
    let index = 0;

    for (const denomination in requested) {

        if (requested[denomination] > actualStock[denomination]) {
            errors.push(`No hay suficientes tickets para la entrega en curso: ${denomination.slice(1)}`);
        }
        index++;
    }

    return errors;

}

module.exports = {
    validateRequestBody,
    validateQueryParams,
    validatePermissions,
    validIdentifier,
    validateStock
};