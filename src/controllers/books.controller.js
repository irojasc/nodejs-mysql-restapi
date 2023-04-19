import { pool } from "../db.js";

export const getBooks = async (req, res) => 
{
    res.send("Obteniendo libros...");
}


export const getBooksbyPattern = async (req, res) => 
{
    try{
        const [result] = await pool.query(`select name as title, autor, editorial, pv, if((cant_SNTG + cant_STC + cant_ALYZ)>0, true, false) as isAvailable from genesisDB.books inner join genesisDB.ware_books on genesisDB.books.cod = genesisDB.ware_books.cod_book where genesisDB.books.cod like '%GN%' and concat(name, " ", autor) like '%${req.params.pattern}%';`);
        
        if(result.length <= 0) return res.status(404).json({
            message: "no book matched"
        })
        res.json(result);
    } catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createBook = (req, res)=>{
    res.send("Ingresando nuevo libro");
}

export const updateBook = (req, res) => 
{
    res.send("Editando libro");
}

export const deleteBook = (req, res) => 
{
    res.send("Eliminando libro");
}