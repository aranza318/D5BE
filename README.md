# D5BE
El proyecto se divide en las siguientes partes:
A. Una carpeta de src que contiene:
   1.Carpeta dao quien a su vez contiene una carpeta fs(donde reside todo lo referido a file sistem), 
   una carpeta models (dentro están todos los modelos usados en el proyecto: user, product, cart y message)
   y también aquí están los managers de carrito, usuarios, productos y mensajes.
   2.Carpeta public quien aloja a una carpeta css (donde vive el archivo styles que le da los estilos),
   una carpeta images (contiene la imagen del logo del cliente), carpeta js (donde se encuentra el login), 
   también tendremos aquí a cart.js, chat.js, realTimesProducts.js y register.js.
   3.Carpeta routes donde se alojan todas las rutas tanto de sesión, como de views, productos y carrito.
B. Una carpeta de views que está compuesta por:
    1. Carpeta layouts que abarca al main.handlebars que contiene las vistas generales de la página.
     2. Tambien encontraremos aquí los diferente handlebars para las vista de cada una de las paginas del sitio.
C. Un archivo app.js: que es donde confluyen todas las rutas para que la aplicación cobre vida.
D. Un archivo utils.js: quien aloja al __dirname.
