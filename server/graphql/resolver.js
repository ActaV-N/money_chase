import dotenv from 'dotenv'
dotenv.config()

// 데이터베이스 연결
import pgp from 'pg-promise'
const pg = pgp({
    schema:'money_chase'
})
const connection = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/myDB`
const db = pg(connection)

// GraphQl Resolver
const rootValue = {
    getProduct: async ({id}) => {
        try{
            let result = await db.one("SELECT * FROM product WHERE ID = $1",[id])
            return result;
        } catch(e){
            return e;
        }
    },
    getProducts:async () => {
        try{
            let result = await db.any("SELECT * FROM product")
            return result;
        } catch(e){
            return e;
        }
    },
    createProduct:async ({product}) => {
        try{
            const result = await db.one("INSERT INTO product(NAME, TYPE, PRICE, DETAIL, DESCRIPTION, BANNER, ATTACHMENT) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [product.name,product.type,product.price,product.detail,product.description, product.banner, product.attachment])
            return result
        } catch(e){
            return e
        }
    },
    updateProduct:async ({id, product}) => {
        try{
            const result = await db.one("UPDATE product SET NAME = $1, TYPE = $2, PRICE = $3, DETAIL = $4, DESCRIPTION = $5, BANNER = $6, ATTACHMENT = $7, UPLOAD_DATE = CURRENT_TIMESTAMP WHERE ID = $8 RETURNING *", 
            [product.name, product.type, product.price, product.detail, product.description, product.banner, product.attachment,id])
            return result
        } catch(e){
            return e
        }
    }
}

export default rootValue