//RETURN ALL PRODUCTS: https://fakestoreapi.com/products
//RETURN A SINGLE PRODUCT: https://fakestoreapi.com/products/1
const GetProduct = async function(product) {
    if (!product) {
        console.error("Debes especificar la ruta del producto (ejemplo: 'products' o 'products/1').");
        return;
    }
    
    try {
        const response = await fetch(`https://fakestoreapi.com/${product.trim()}`);
        const data = await response.json();

        if (Array.isArray(data)) {
            console.log("Productos obtenidos:");
            data.forEach(item => console.log(item));
        } else {
            console.log("Producto obtenido:");
            console.log(data);
        }  
    } catch (error) {
        console.error("Error al obtener producto:", error);
    } finally {
        console.log("Proceso terminado");
    }   
}  

//CREATE A PRODUCT: https://fakestoreapi.com/products
const AddProduct = async function(title, price, category) {
    if (!title || !price || !category) {
        console.error("Debes especificar título, precio y categoría.");
        return;
    }
    
    try {
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, price: price, category: category })
        };
        
        const response = await fetch("https://fakestoreapi.com/products", option);

        if(response.status === 201) {
            const data = await response.json();
            console.log(`Producto agregado: ID ${data.id}`);
        } else {
            console.log("Producto no agregado");
        }           
    } catch (error) {
        console.error("Ocurrio un error al intentar crear un producto. Error:", error);
    } finally {
        console.log("Proceso terminado");
    }   
}  

//DELETE A PRODUCT: https://fakestoreapi.com/products/1
const DeleteProduct = async function(product) {
    if (!product) {
        console.error("Debes especificar la ruta del producto a eliminar (ejemplo: 'products/1').");
        return;
    }

    try {
        const option = {
            method: 'DELETE'
        };

        const reponse = await fetch(`https://fakestoreapi.com/${product.trim()}`, option);

        if(reponse.status === 200) {
            console.log("Producto eliminado");
        }else {
            console.log("Producto no existe");
        }
    } catch (error) {
        console.error("Ocurrio un error al intentar eliminar el producto. Error:", error);
    } finally {
        console.log("Proceso terminado");
    }   
}  

const args = process.argv.slice(2);

if (!args[0]) {
    console.log("Debes especificar una operación: GET, POST o DELETE");
} else {
    switch (args[0].toUpperCase()) {
        case "GET":
            await GetProduct(args[1]);
            break;
        case "POST":
            await AddProduct(args[1], args[2], args[3]);        
            break;   
        case "DELETE":
            await DeleteProduct(args[1]);
            break;
        default:
            console.log("Operación no soportada");
            break;
    }
}