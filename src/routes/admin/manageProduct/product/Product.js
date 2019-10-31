import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const Product = (props) => {
    let [product, setProduct] = useState({})

    let {productId} = useParams()
    useEffect(()=>{
        getProduct(productId)
    },[])

    const getProduct = async (id) => {
        let query = `
            query getProduct($id:ID!){
                getProduct(id:$id){
                    id
                    banner
                    name
                    type
                    price
                    detail
                    description
                    attachment
                }
            }
        `
        let {data:{data}} = await axios.post('http://localhost:3001/graphql',{
            query,
            variables:{
                "id":id
            }
        })

        setProduct(data.getProduct)
    }

    const _handleChange = async (e)=>{
        e.persist()
        if(e.target.type == 'file'){
            const formData = new FormData()
            formData.append('file',e.target.files[0])

            let {data} = await axios.post('http://localhost:3001/upload',formData)
            setProduct({
                ...product,
                [e.target.name]:data.file
            })
        }else{
            setProduct({
                ...product,
                [e.target.name]:e.target.value
            })
        }
    }

    const _handleSubmit = async ()=> {
        let query = `
            mutation updateProduct($id:ID!,$product:ProductInput!){
                updateProduct(id:$id, product:$product){
                    id
                    name
                    price
                }
            }
        `

        console.log(product)
        let {data:{data}} = await axios.post('http://localhost:3001/graphql',{
            query,
            variables:{
                "id":product.id,
                "product":{
                    "name":product.name,
                    "type":product.type,
                    "price":parseInt(product.price),
                    "detail":product.detail,
                    "description":product.description,
                    "banner":product.banner,
                    "attachment":product.attachment
                }
            }
        })

        console.log(data)
    }

    return (
        <div>
            <img src={`http://localhost:3001/uploads/${product.banner}`} width='100'/>
            <input onChange={_handleChange} type='file' name='banner'/>
            <input onChange={_handleChange} type='text' value={product.name} name='name' placeholder='name'/>
            <input onChange={_handleChange} type='text'value={product.type} name='type' placeholder='type'/>
            <input onChange={_handleChange} type='text'value={product.price} name='price' placeholder='price'/>
            <input onChange={_handleChange} type='text'value={product.description} name='description' placeholder='description'/>
            <input onChange={_handleChange} type='text'value={product.detail} name='detail' placeholder='detail'/>
            <input onClick={_handleSubmit} type='button' value='수정'/>
        </div>
    )
}

export default Product