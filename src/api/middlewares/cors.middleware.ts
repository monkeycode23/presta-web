

export function corsMiddelware(app:any) {
    
    // Manejo de CORS
/*  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
}) */


/*   const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://localhost:4000'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true // solo si usás cookies/autenticación
  })); */
// Rutas de API
}



