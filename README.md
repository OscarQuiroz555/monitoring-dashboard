# ⚡ Monitoring Dashboard

Un **dashboard moderno y responsivo** para monitoreo energético en
tiempo real (corriente, voltaje, temperatura, consumo y más).\
Construido con **React + Vite + TailwindCSS + ApexCharts**, integrando
Firebase como backend de datos.

------------------------------------------------------------------------

## 🚀 Tecnologías principales

-   [React](https://react.dev/) + [Vite](https://vitejs.dev/) → Frontend
    rápido y modular\
-   [TailwindCSS](https://tailwindcss.com/) → Estilos modernos y
    responsivos\
-   [ApexCharts](https://apexcharts.com/) → Gráficas interactivas y
    profesionales\
-   [Firebase](https://firebase.google.com/) → Almacenamiento en tiempo
    real (datos energéticos)

------------------------------------------------------------------------

## 📂 Estructura del proyecto

    src/
    ├── assets/        # imágenes y recursos estáticos
    ├── components/    # Navbar, Footer, Cards, ScrollButton, ChartCard
    ├── hooks/         # useFirebase, useFavicon, etc.
    ├── pages/         # Dashboard.jsx, Corriente.jsx, Costos.jsx, Reportes.jsx
    ├── services/      # firebase.js, cálculos de métricas y costos
    ├── styles/        # diseños extras (global.css, temas)
    ├── utils/         # helpers (formatear fechas, cálculos estadísticos)
    ├── App.jsx        # enrutador principal
    ├── main.jsx       # punto de entrada
    └── globals.css    # Tailwind base

------------------------------------------------------------------------

## 🖥️ Funcionalidades actuales

-   Visualización de datos simulados de corriente en tiempo real\
-   KPIs del día (actual, media, máximo, mínimo) en tarjetas compactas\
-   Gráfica interactiva con zoom, pan y reset\
-   Sección dedicada para consulta por **rangos de fechas**\
-   UI responsiva para desktop y móvil

------------------------------------------------------------------------

## 📌 Próximos pasos

-   Conectar con datos **reales desde Firebase**\
-   Añadir gráficas de **voltaje, temperatura y costos**\
-   Implementar **autenticación** para distintos usuarios (admin,
    estudiante, visitante)\
-   Exportar reportes en PDF / Excel

------------------------------------------------------------------------

## ⚙️ Instalación y uso

``` bash
# Clonar el repositorio
git clone https://github.com/tuusuario/monitoring-dashboard.git
cd monitoring-dashboard

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Generar build de producción
npm run build
```

------------------------------------------------------------------------

## 📄 Licencia

Este proyecto está bajo la licencia MIT -- libre para usar y mejorar.
