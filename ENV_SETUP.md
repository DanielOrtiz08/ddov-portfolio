# Configuración del archivo .env

Este documento explica cómo obtener y configurar las variables de entorno usadas por el componente de "Contáctame". En el repositorio público verás solo `.env.example`. Llena un archivo `.env` en tu entorno local o en el hosting con los valores reales.

## Variables principales

- `NEXT_PUBLIC_GITHUB_USERNAME`
  - Usuario de GitHub para enlaces públicos (opcional).

- `NEXT_PUBLIC_LINKEDIN_URL`
  - URL completa de tu perfil de LinkedIn (opcional).

## Correo electrónico (Resend)

Este proyecto puede enviar correos usando Resend. Regístrate en https://resend.com y crea una API key.

- `RESEND_API_KEY`
  - Valor: la API key que obtienes en Resend (empieza por `re_...`).
  - Dónde ponerla: en `.env` como `RESEND_API_KEY=re_xxx`.

- `RESEND_FROM_EMAIL`
  - Valor: dirección desde la que se enviarán los correos, p. ej. `noreply@tu_dominio.com`.
  - Nota: para entornos de prueba, usa el correo que Resend acepte o configura tu dominio en su dashboard.

- `RESEND_OWNER_EMAIL`
  - Valor: dirección que recibirá las notificaciones o copias (tu correo personal).

Consejos:
- Si usas la API de pruebas de Resend, solo los destinatarios autorizados podrán recibir correos; añade tus correos en el dashboard de Resend.
- Comprueba los logs de la API cuando pruebes localmente.

## Notificaciones por WhatsApp / Telegram / Webhook

El servicio de notificaciones se define con `WHATSAPP_SERVICE`. Opciones soportadas en el proyecto:
- `twilio` — envía WhatsApp reales usando Twilio
- `telegram` — envía un mensaje a un chat de Telegram (bot)
- `webhook` — reenvía la notificación a una URL de webhook (n8n, Make, endpoint propio)

Variables relacionadas:

- `WHATSAPP_SERVICE`
  - Valor: `twilio`, `telegram` o `webhook`.

- `WHATSAPP_PHONE`
  - Valor: tu número de teléfono (uso interno, p. ej. para mensajes de Twilio).

### Twilio (WhatsApp)

Regístrate en https://www.twilio.com, crea un proyecto y obtén las credenciales.

- `TWILIO_ACCOUNT_SID`
  - Valor: tu Account SID en Twilio.
- `TWILIO_AUTH_TOKEN`
  - Valor: tu Auth Token en Twilio.
- `TWILIO_WHATSAPP_FROM`
  - Valor: el número origen con prefijo `whatsapp:`, p. ej. `whatsapp:+1415XXXXXXX`.
- `TWILIO_WHATSAPP_CONTENT_SID` (opcional)
  - Valor: SID de la plantilla de WhatsApp si usas plantillas.
- `TWILIO_WHATSAPP_CONTENT_VARIABLES` (opcional)
  - Valor: variables para la plantilla en formato JSON.

Notas:
- Twilio puede requerir verificación del número o uso de sandbox para pruebas.
- Para producción, registra y verifica el número en Twilio.

### Telegram

Crea un bot en Telegram usando `@BotFather` y obtén el token.

- `TELEGRAM_BOT_TOKEN`
  - Valor: token del bot (formato `123456:ABC-DEF...`).
- `TELEGRAM_CHAT_ID`
  - Valor: ID del chat o usuario donde el bot enviará mensajes.

Cómo obtener `TELEGRAM_CHAT_ID`:
- Envía un mensaje al bot y lee los updates usando la API o usa servicios que devuelven tu chat id.

### Webhook

- `WHATSAPP_WEBHOOK_URL`
  - Valor: URL pública que recibirá POST con la notificación (JSON).

## Redis (anti-spam y caché)

El proyecto usa Redis para almacenar estado antispam. Se recomienda usar Redis en Azure para producción.

- `REDIS_URL`
  - Formato recomendado (Azure/Rediss): `rediss://:<PASSWORD>@<HOST>:<PORT>?ssl=true`
  - Ejemplo: `rediss://:mipassword@mi-redis.redis.cache.windows.net:6380?ssl=true`

Cómo crear Redis en Azure:
1. Entra en https://portal.azure.com
2. Busca "Azure Cache for Redis" y crea una instancia (elige SKU y zona según tus necesidades).
3. En la sección "Access keys" copia la `Primary key` y el `Host name`.
4. Construye `REDIS_URL` con la `Primary key` como contraseña.

Consejos de seguridad:
- No incluyas las credenciales directamente en repositorios públicos.
- Usa los secretos del proveedor (Azure Key Vault, Netlify/Vercel environment variables, Github Actions Secrets) en producción.

## Ejemplo mínimo de `.env` local

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores (ejemplo):

NEXT_PUBLIC_GITHUB_USERNAME=miusuario
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/miusuario

RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RESEND_FROM_EMAIL=noreply@midominio.com
RESEND_OWNER_EMAIL=miemail@dominio.com

WHATSAPP_SERVICE=twilio
WHATSAPP_PHONE=1234567890

TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+1415XXXXXXX

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
WHATSAPP_WEBHOOK_URL=

REDIS_URL=rediss://:TU_PRIMARY_KEY@TU_HOST:6380?ssl=true

## Despliegue en plataformas comunes

- Vercel / Netlify / Cloudflare Pages:
  - Añade las variables de entorno en la configuración del proyecto (Settings → Environment Variables).
  - Nunca subas `.env` al repositorio.

- Azure App Service:
  - En "Configuration" añade las variables de entorno.
  - Para Redis, puedes usar la cadena `REDIS_URL` como configuración de la aplicación.

## Pruebas locales

- Asegúrate de haber creado `.env` y reinicia el servidor.
- Para probar el endpoint `api/contact` puedes usar `curl` o Postman. Ejemplo:

```bash
curl -i -X POST 'http://localhost:3000/api/contact' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"mi@correo.com","subject":"Hola","message":"Mensaje de prueba"}'
```

- Si usas Redis, asegúrate de que la `REDIS_URL` sea accesible desde tu entorno.

## Seguridad y buenas prácticas

- Guarda las claves en el servicio de secretos de tu plataforma de hosting para entornos de producción.
- Usa variables `NEXT_PUBLIC_...` solo para valores que pueden estar expuestos en el cliente.
- Revisa límites y políticas de envío de tu proveedor de correo (Resend) y mensajería (Twilio/Telegram).
