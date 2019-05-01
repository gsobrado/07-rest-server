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
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;

// ===========================================
//  Configuracion del Vencimiento token
// ===========================================

process.env.VENCIMIENTO_TOKEN = 60 * 60 * 24 * 30;

// ===========================================
//  Configuracion del Seed Token
// ===========================================

process.env.SEED_TOKEN = process.env.SEED || 'este-es-el-seed-desarrollo';