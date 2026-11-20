# 🎄 IT'S XMAS TIME!

> **Proyecto Escolar • Equipo EQ4A • Sprint 1 (SPR1)**  
> **Metodología:** Scrumban  
> **Dispositivo objetivo:** iPad en orientación horizontal (`1194 × 834 px`)  
> **Stack UI planificado:** React + Componentes reutilizables con Auto Layout  

---

## 🎨 Diseño en Figma

* **Archivo Figma:** [EQ4A_SPR1_Diseño](https://www.figma.com/design/WvklCgfvXYpLksJpRidsQs/EQ4A_SPR1_Dise%C3%B1o)
* **File Key:** `WvklCgfvXYpLksJpRidsQs`
* **Configuración del Proyecto:** [project.config.json](file:///Users/alan20111/Documents/Proyecto%20Navidad/project.config.json)

---

## 🎯 Objetivo del Sprint (SPR1)

Crear un módulo interactivo para que el usuario elija un espacio navideño y lo decore dinámicamente con adornos temáticos mediante arrastrar y soltar (*drag and drop*).

### Historias de Usuario

* **US1:** *YO como usuario QUIERO seleccionar el objeto PARA empezar a decorarlo (chimenea, árbol o casa).*
* **US3:** *YO como usuario QUIERO colocar adornos navideños sobre el objeto seleccionado PARA personalizar el diseño a mi gusto (esferas, luces, decoraciones, colgantes y objetos acordes al espacio).*

---

## 📋 Criterios de Aceptación y Evidencias (Trello)

### Página 1: US1 - Selección del objeto

| Frame | Vista Previa | Criterio de Aceptación Cumplido |
| :--- | :---: | :--- |
| **01_Seleccion** | [Ver PNG](exports/01_Seleccion.png) | **CA1:** Al entrar se muestran los 3 espacios (Chimenea, Árbol y Casa) en tarjetas grandes con ilustraciones y estado seleccionado resaltado. |
| **02_Confirmacion** | [Ver PNG](exports/02_Confirmacion.png) | **CA2:** Modal sobre la pantalla anterior solicitando confirmación con vista previa del espacio y botones `Cancelar` y `Confirmar`. |
| **03_Escenario_vacio** | [Ver PNG](exports/03_Escenario_vacio.png) | **CA3:** Al confirmar se carga el escenario elegido a pantalla completa (1194 × 834) listo para decorar. |

*Prototipo interactivo configurado con Smart Animate (0.3s): Tarjeta → Modal; Cancelar → Regresa; Confirmar → Escenario vacío.*

---

### Página 2: US3 - Catálogo y arrastrar y soltar

| Frame | Vista Previa | Criterio de Aceptación Cumplido |
| :--- | :---: | :--- |
| **04_Catalogo** | [Ver PNG](exports/04_Catalogo.png) | Escenario a la izquierda y panel lateral derecho con el catálogo filtrado por tags para el Árbol en cuadrícula táctil. |
| **05_Arrastrando** | [Ver PNG](exports/05_Arrastrando.png) | Adorno en movimiento hacia el escenario con sombra proyectada y zona de soltado (*drop zone*) iluminada en el árbol. |
| **06_Adorno_colocado** | [Ver PNG](exports/06_Adorno_colocado.png) | Adorno colocado con manejadores activos y barra de herramientas contextual (`Mover` y `🗑️ Eliminar`). |
| **07_Confirmar_diseno** | [Ver PNG](exports/07_Confirmar_diseno.png) | Botón "Terminar" que despliega diálogo modal con opciones "Seguir editando" y "Confirmar diseño". |

*Prototipo interactivo configurado con Smart Animate: Catálogo → Arrastrando → Colocado → Confirmar diseño; "Seguir editando" regresa al frame 06.*

---

## 🎨 Design Tokens & Estilo

* **Paleta de Color Navideña:**
  * Rojo festivo: `#C0392B`
  * Verde pino: `#1E7B4F`
  * Dorado acento: `#D4A017`
  * Fondo crema cálido: `#FFF8EE`
  * Texto principal: `#222222`
  * Borde suave: `#EADBCE`
  * Superficies: `#FFFFFF`
* **Tipografía:** `Poppins` (Títulos) e `Inter` (Cuerpo / UI)
* **Touch Targets (iPad):** Botones con altura mínima de `44 px` (diseñados a `48-50 px`) y esquinas redondeadas de `12 px`.
* **Componentes del Sistema:**
  * `TarjetaEspacio` (variantes: `Selected=False`, `Selected=True`)
  * `BotonPrimario`
  * `BotonSecundario`
  * `Modal`
  * `ItemAdorno` (variantes: `State=normal`, `State=arrastrando`, `State=colocado`)

---

## 📦 Estructura del Repositorio

```text
├── Alan Daniel.md            # Información del autor
├── README.md                 # Documentación y evidencias del sprint
├── project.config.json       # Configuración del proyecto y vinculación con Figma
└── exports/                  # Capturas PNG exportadas a escala 1x
    ├── 01_Seleccion.png
    ├── 02_Confirmacion.png
    ├── 03_Escenario_vacio.png
    ├── 04_Catalogo.png
    ├── 05_Arrastrando.png
    ├── 06_Adorno_colocado.png
    └── 07_Confirmar_diseno.png
```
