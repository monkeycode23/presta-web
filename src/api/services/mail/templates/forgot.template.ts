export const forgotTemplate=(username:string,code:number,verificationLink:string)=>  `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a ArenaGame</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: #1a73e8;
    }
    p {
      line-height: 1.6;
    }
    .code {
      display: inline-block;
      background-color: #f0f0f0;
      border-radius: 6px;
      padding: 12px 20px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 20px 0;
      font-size: 16px;
      color: #ffffff;
      background-color: #1a73e8;
      border-radius: 6px;
      text-decoration: none;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      text-align: center;
      margin-top: 20px;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 15px;
      }
      .code {
        font-size: 20px;
        padding: 10px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Password Petition</h1>
    <p>Hola <strong>${username}</strong>,</p>
    <p>Has solicitado un cambio de contraseña. Usa el siguiente código de verificación:</p>

    <div class="code">${code}</div>

    
    <p>Si no solicitaste este cambio de contraseña, ponte en contacto con nosotros inmediatamente.</p>

    <div class="footer">
      &copy; 2025 ArenaGame. Todos los derechos reservados.
    </div>
  </div>
</body>
</html>
`