# PDFBuilderAPI - Manual de uso de la API

## Convertir imágenes a PDF

**Endpoint:** `/api/pdf/builder/image/to/pdf`  
**Método HTTP:** `POST`  
**Header:** `Content-Type: application/json`

### Parámetros del cuerpo (JSON)

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `imagesPath` | Array[string] | Sí | Rutas absolutas de las imágenes a convertir |
| `outputPathPdf` | String | Sí | Ruta completa del archivo PDF de salida |

### Descripción
Convierte múltiples imágenes a un único archivo PDF. Las imágenes se procesan en el orden del array.

**Formatos de imagen soportados:** `.jpg`, `.jpeg`, `.png`

### ⚠️ IMPORTANTE
1. **Rutas absolutas:** Todas las rutas deben ser absolutas
2. **Extensión PDF:** La ruta de salida debe terminar en `Nombre-Del-Archivo.pdf`
3. **Formato del SO:** Usa el formato de rutas correcto para tu sistema operativo
4. **Permisos:** Asegúrate de tener permisos de lectura/escritura en la ruta de salida

### Ejemplos de solicitud por sistema operativo

#### Para Windows:
```json
{
    "imagesPath": [
        "C:\\Users\\Usuario\\Pictures\\imagen1.jpg",
        "C:\\Users\\Usuario\\Pictures\\imagen2.png"
    ],
    "outputPathPdf": "C:\\Users\\Usuario\\Documents\\documento.pdf"
}
```

#### Para Linux:
```json
{
    "imagesPath": [
        "/home/usuario/Pictures/imagen1.jpg",
        "/home/usuario/Pictures/imagen2.png"
    ],
    "outputPathPdf": "/home/usuario/Documents/documento.pdf"
}
```

#### Para macOS:
```json
{
    "imagesPath": [
        "/Users/Usuario/Pictures/imagen1.jpg",
        "/Users/Usuario/Pictures/imagen2.png"
    ],
    "outputPathPdf": "/Users/Usuario/Documents/documento.pdf"
}
```

**Respuesta:**
```json
{
    "status" : "200",
    "sucess" : true,
    "message" : "Url de la imagen convertida a PDF"
}
```
```json
{
    "status" : "400",
    "sucess" : false,
    "message" : "Mensaje de error"
}
```
