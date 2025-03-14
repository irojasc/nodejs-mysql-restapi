import { API_KEY_TOKEN } from "../config.js";
import { pool } from "../db.js";
import axios from "axios";
import { decode } from "../bcrypt.js";

// export const getProducts = async (req, res) => 
// {
//     res.send("Obteniendo libros...");
// }

const cmbApi = axios.create({baseURL: 'https://api.callmebot.com/whatsapp.php?phone=51935017677&apikey=9817632&text='})


export const getProductsbyPattern = async (req, res) => 
{
    try{
        const [result] = await pool.query(`select concat(it.code,"_",p.id) as code, p.title as title, p.autor as autor, p.publisher as editorial, wp.pvNew as pv, if((select sum(wp.qtyNew) from genesisDB.ware_product as wp inner join genesisDB.product pe on wp.idProduct = pe.id where wp.idProduct = p.id and wp.isEnabled = True)>0, true, false) as isAvailable from genesisDB.ware_product wp inner join genesisDB.product p on wp.idProduct = p.id inner join genesisDB.item it on p.idItem = it.id where idWare = 4 and isEnabled = True and concat(p.title, " ", p.autor) like '%${req.params.pattern}%' order by isAvailable desc;`);
        const {data} = await cmbApi.get(`Alguien buscando: ${req.params.pattern.toUpperCase()}`)
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

export const getLastProductsByCtgy = async (req, res) => {

    // const queryObj = req.query

    // console.log(queryObj)

    try{
        // if (!!queryObj.samples && !!queryObj.category.toUpperCase() && !!Object.keys(queryObj).length && (Object.values(queryObj).reduce((acc, cur)=>( !!acc && !!cur), true))){
            const [result] = await pool.query(`select concat(it.code,"_",pr.id) as code, 
                                                pr.title as title, 
                                                pr.autor as autor, 
                                                pr.publisher as editorial,
                                                wp.pvNew as pv,
                                                if((select sum(qtyNew) from ware_product w_ where w_.idProduct = pr.id and w_.isEnabled = true) > 0, true, false) as isAvailable
                                                from product pr
                                                inner join item it on pr.idItem = it.id
                                                inner join ware_product wp
                                                on pr.id = wp.idProduct and wp.idWare = 4 and wp.isEnabled = true
                                                where atWebProm = true 
                                                order by pr.creationDate desc 
                                                limit 12;`);
                return res.status(200).json({
                    status: "Success",
                    data: result,
                    message: "Query Parameters is Ok"
            })
    } catch (error){
        return res.status(500).json({
            status: "Error",
            message: "Something wrong happens"
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

    export const isUserRegistered = async (req, res) => {
    try{
        const [result] = await pool.query(`select pw from genesisDB.user where user = '${req.body.user}' and enabled = true;`);
        const validPass = await decode(req.body.pwd, result[0].pw)

        if (!validPass) return res.json( {
            result: false,
            message: "Invalid Credentials"})
        
        res.json({
            result: true,
            message: "user authorized"
        }
    )

    // res.json(result);
} catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


// select concat(it.code,"_",pr.id) as code, 
// 		pr.title as title, 
// 		pr.autor as autor, 
//         pr.publisher as editorial,
//         wp.pvNew as pv,
//         if((select sum(qtyNew) from ware_product w_ where w_.idProduct = pr.id and w_.isEnabled = true) > 0, true, false) as isAvailable
// from product pr
// inner join item it on pr.idItem = it.id
// inner join ware_product wp
// on pr.id = wp.idProduct and wp.idWare = 4 and wp.isEnabled = true
// where atWebProm = true 
// order by pr.creationDate desc 
// limit 12;


        // const [result] = await pool.query(`select concat(it.code,"_",pr.id) as code, 
        //     title as title, autor as autor, publisher as editorial, 
        //     (select wpr.pvNew from genesisDB.ware_product wpr where idWare = 4 and idProduct = pr.id) as pv, 
        //     if((select sum(wpr.qtyNew) from genesisDB.ware_product wpr where idProduct = pr.id) > 0, true, false) as 
        //     isAvailable 
        //     from genesisDB.product pr 
        //     inner join genesisDB.product_mixedctgy pmc on pr.id = pmc.idProduct 
        //     inner join genesisDB.category_mixed cm on pmc.idMixedCtgy = cm.id 
        //     inner join genesisDB.ware_product wp on pr.id = wp.idProduct 
        //     inner join genesisDB.item it on pr.idItem = it.id 
        //     where wp.idWare = 4 and 
        //     wp.isEnabled = True and idLanguage = (select id from genesisDB.language where language = "ESPAÑOL") and 
        //     pr.idItem = (select id from genesisDB.item where item = "LIBRO") and 
        //     (cm.ctgy_one = (select cat.id from genesisDB.category cat where cat.ctgy = "${queryObj.category.toUpperCase()}") and 
        //     cm.ctgy_two = (select cat.id from genesisDB.category cat where cat.ctgy = "HISTORIA")) or 
        //     (cm.ctgy_one = (select cat.id from genesisDB.category cat where cat.ctgy = "${queryObj.category.toUpperCase()}") and 
        //     cm.ctgy_two = (select cat.id from genesisDB.category cat where cat.ctgy = "ARQUEOLOGIA")) or 
        //     (cm.ctgy_one = (select cat.id from genesisDB.category cat where cat.ctgy = "${queryObj.category.toUpperCase()}") and 
        //     cm.ctgy_two = (select cat.id from genesisDB.category cat where cat.ctgy = "FILOSOFIA") and cm.ctgy_three = 
        //     (select cat.id from genesisDB.category cat where cat.ctgy = "ANDINA")) group by pr.id order by pr.creationDate desc, pr.id desc 
        //     limit ${queryObj.samples};`);