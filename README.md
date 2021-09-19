# Control de pedidos (Proyecto de Graduacion Vilma Aldana)

Proyecto para el control de pedidos y materiales utilizados en la fabricacion de un producto.

## Instalar Herramientas
### 1. IDE Visual studio code:
<br>1.1 Descargar el instalador en la pagina https://code.visualstudio.com/
<br>![image](https://user-images.githubusercontent.com/38637350/133938380-1abe685f-12b7-42fa-a4fa-53af0bc45887.png)

<br>1.2 Instalamos con la configuración por defecto.
<br>![image](https://user-images.githubusercontent.com/38637350/133938568-6f83486b-065d-43ef-ba18-2141658331d7.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938659-5e10eff7-31b3-4d37-8001-ee055db71db3.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938694-6f38d186-5f09-41e7-a51e-1a7c6e2bd977.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938712-a7b8e19c-0bd5-4e0d-a6dc-ba3291deeb01.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938730-0cfb5a48-c5b3-4a17-a817-ddc91e53f5a2.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938786-97fa63c0-eba9-43d7-922c-a303d67bf97b.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938794-455c94a1-f8ce-40a8-9708-2a1d988c218f.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133938818-d902d44b-b0bc-4b5a-8c1f-7456d7a2e876.png)

### 2. NodeJS 
<br>2.1 Descargar el instalador en la pagina https://nodejs.org/es/download/
<br>2.2 Instalamos con la configuración por defecto.
<br>![image](https://user-images.githubusercontent.com/38637350/133939167-857ead4b-74f7-4a8d-9a8f-fdb49e4fa1ce.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939175-5193ba5b-02f3-459d-8228-7ffb90e2d978.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939182-2c0304ab-d670-4eff-92c2-8a388616b91f.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939204-66720433-e199-4519-976c-0eea5da9c827.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939220-81efdc03-910d-4155-910a-a6d8b2326f2e.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939292-4c9b3391-6b90-4d55-b78d-2c55d41b1256.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939310-53bed1e0-9750-4bc3-b7da-855941c91b8d.png)
<br>![image](https://user-images.githubusercontent.com/38637350/133939335-a1becf87-c164-4458-a0f3-aeef153d813a.png)
### 3. Angular CLI
  Con ayuda de una consola DOS (es recomendable utlizar la terminal que nos proporciona el IDE Visual studio Code para mayor comodida) ejecutamos el comando <b>npm install -g @angular/cli</b>. Este paso demorara unos minutos.
  
<br>  ![image](https://user-images.githubusercontent.com/38637350/133940041-ef97e986-75c2-46ea-9f55-0b179d31a596.png)

 <br> <b>Nota:</b> Este paso se debe realizar despues de instalar nodeJS ya que necesitamos del gestor de paquetes <a href="https://docs.npmjs.com/about-npm">NPM</a> para realizar su instalación.
 
### 4. Gestor de base de datos MySQL
Para la base de datos por comodidad utilizaremos el stack Xampp, pero utilizaremos dos herramitas, mysql y apache.
<br>4.1 Descargar el instalador en la pagina https://www.apachefriends.org/es/index.html
<br>4.2 Instalamos con la configuración por defecto, seleccionando solo la base de datos y apache.
![image](https://user-images.githubusercontent.com/38637350/133939637-ae2e4336-70d5-4cc3-b7f5-6b35adbe0094.png)



## Levantar proyecto
### Gestor de base de datos MySQL
 1. Abrimos el panel de Xamp y hacemos clic en start a MySQL y Apache.
 <br> ![image](https://user-images.githubusercontent.com/38637350/133940203-df0c5101-fe9d-4ee0-b51f-5b9f87ffc638.png)
 2. Con ayuda de un navegador ingresamos a http://localhost/phpmyadmin/
 3. Procedemos a crear la base de datos, damos clic en new (nuevo).
 <br> ![image](https://user-images.githubusercontent.com/38637350/133940345-51df5790-1604-4e26-b477-5c76e2712308.png)
 <br> se mostrara la siguiente pantalla en donde ingresamos el nombre taller_charros y hacemos clic en create (crear)
 ![image](https://user-images.githubusercontent.com/38637350/133940373-a1c1988c-1a4b-449e-b193-0a947210232b.png)


### Backend
#### Herramientas utilizadas

Para el desarrollo del proyecto backend se utilizo nodejs y mysql 

#### Para levantar el proyecto debe realizar lo siguiente
#### node
 1. Abrimos el proyecto con ayuda de 
 2. Ejecutar el comnado npm install para descargar las librerias necesarias para la compilacion del proyecto.
    
 3. Ejecutar el comando node server.js para crear un servidor y poder consumir las apis.



## Frontend
### Herramientas utilizadas

Para el desarrollo del proyecto frontend se el framework angular 

#### Para levantar el proyecto debe realizar lo siguiente
 1. Ejecutar el comnado npm install para descargar las librerias necesarias para la compilacion del proyecto.
 2. Ejecutar el comando ng serve --o para levantar el proyecto. Abrira la url  http://localhost:4200/
