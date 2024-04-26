import { pool } from "../db.js";

export const getProducts = async (req, res) => 
{
    res.send("Obteniendo libros...");
}


export const getProductsbyPattern = async (req, res) => 
{
    try{
        const [result] = await pool.query(`select concat(it.code,"_",p.id) as code, p.title as title, p.autor as autor, p.publisher as editorial, wp.pvNew as pv, if((select sum(wp.qtyNew) from genesisDB.ware_product as wp inner join genesisDB.product pe on wp.idProduct = pe.id where wp.idProduct = p.id and wp.isEnabled = True)>0, true, false) as isAvailable from genesisDB.ware_product wp inner join genesisDB.product p on wp.idProduct = p.id inner join genesisDB.item it on p.idItem = it.id where idWare = 4 and isEnabled = True and concat(p.title, " ", p.autor) like '%${req.params.pattern}%';`);
        
        // if(result.length <= 0) return res.status(404).json({
        //     message: "no book matched"
        // })
        res.json(result);
    } catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createProduct = (req, res)=>{
    res.send("Ingresando nuevo libro");
}

export const updateProduct = (req, res) => 
{
    res.send("Editando libro");
}

export const deleteProduct = (req, res) => 
{
    res.send("Eliminando libro");
}