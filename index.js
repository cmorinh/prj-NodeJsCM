//RETURN ALL PRODUCTS: https://fakestoreapi.com/products
//RETURN A SINGLE PRODUCT: https://fakestoreapi.com/products/1
const GetProduct = async function(product) {
    try
    {
        const reponse = await fetch(`https://fakestoreapi.com/${product.trim()}`);
        const data = await reponse.json();

        if(product.includes("/")) {
            console.log("Producto obtenido: ");
            console.log(data);
        }else {
            console.log("Productos obtenidos: ");
            data.forEach(item => {
                console.log(item);
            });
        }    
    }  
    catch (error)
    {
        console.error("Producto no existe");
    }
    finally        
    {
        console.log("Proceso terminado");
    }   
}  

//CREATE A PRODUCT: https://fakestoreapi.com/products
const AddProduct = async function(title, price, category) {
    try
    {
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
    }    
    catch (error)
    {
        console.error("Ocurrio un error, por favor verifique los datos ingresado. Error:", error);
    }
    finally        
    {
        console.log("Proceso terminado");
    }   
}  

//DELETE A PRODUCT: https://fakestoreapi.com/products/1
const DeleteProduct = async function(product) {
    try
    {
        const reponse = await fetch(`https://fakestoreapi.com/${product.trim()}`);

        if(reponse.status === 200) {
            console.log("Producto eliminado");
        }else {
            console.log("Producto no existe");
        }
    }  
    catch (error)
    {
        console.error("Ocurrio un error, por favor verifique los datos ingresado. Error:", error);
    }
    finally        
    {
        console.log("Proceso terminado");
    }   
}  

const args = process.argv.slice(2);

switch (args[0].toUpperCase()) {
    case "GET":
        GetProduct(args[1]);
        break;
    case "POST":
        AddProduct(args[1], args[2], args[3]);        
        break;   
    case "DELETE":
        DeleteProduct(args[1]);
        break;
    default:
        console.log("Operación no soportada");
        break;
}