# Imagen de desarrollo/pruebas para el frontend de WebCIS.
# No es para producción: sirve el dev server de Vite y corre Vitest/Playwright.
#
# Se usa la imagen oficial de Playwright (incluye Chromium/Firefox/WebKit ya
# instalados) en la MISMA versión que @playwright/test en package-lock.json,
# para evitar el mismatch de binarios que rompe `npx playwright install`.
# Si actualizan @playwright/test, actualizar este tag a la misma versión.
FROM mcr.microsoft.com/playwright:v1.56.1-noble

WORKDIR /app

# Copiar solo los manifiestos primero para cachear `npm ci` entre builds.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# 5173: dev server (vite). 4173: preview (vite preview / base para test:e2e en CI).
EXPOSE 5173 4173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
