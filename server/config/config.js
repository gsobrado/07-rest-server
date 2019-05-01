// ===========================================
//  Configuracion del PUERTO
// ===========================================
process.env.PORT = process.env.PORT || 3000;

// ===========================================
//  Configuracion del ENTORNO
// ===========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'DEV'

// ===========================================
//  Configuracion del DB
// ===========================================

let urlDB;

if (process.env.NODE_ENV === 'DEV') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://gsobrado:1FtEIrZfocUtPdwO@cluster0-rfo7p.mongodb.net/cafe'
}

process.env.urlDB = urlDB;