import React,{useState, useEffect} from 'react'
import {Switch, Route, Link, useRouteMatch, BrowserRouter as Router} from 'react-router-dom'

import axios from 'axios'

import CreateProduct from './createProduct'
import Product from './product'

const ManageProduct = (props) => {
    let [products, setProduct] = useState([])
    let {path} = useRouteMatch()

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = async () => {
        let query = `
        query getProducts{
            getProducts{
                id
                banner
                name
                price
                description
            }
        }`
        try{
            var {data:{data}} = await axios.post('http://localhost:3001/graphql',{
                query
            },{
                headers:{
                    "Content-Type":'application/json'
                }
            })
        } catch(e){
            console.log(e)
        }
        let result = data.getProducts
        setProduct(result)
    }

    return (<Router>
        <Switch>
            <Route exact path={`${path}`}>
                <h1>상품 관리</h1>
                <Link to={`${path}/createProduct`}>Add</Link><br/>
                {products.map(product => (
                <Link key={product.id} to={`${path}/product/${product.id}`}>
                    <div>
                        <img width='100' src={`http://localhost:3001/uploads/${product.banner}`}/>
                        {product.name} &nbsp;
                        {product.price} &nbsp;
                        {product.description}
                    </div>
                </Link>))}
            </Route>
            <Route path={`${path}/createProduct`}>
                <CreateProduct/>
            </Route>
            <Route path={`${path}/product/:productId`}>
                <Product/>
            </Route>
        </Switch>
    </Router>)
}

export default ManageProduct