import React,{useState} from 'react'
import axios from 'axios'

const CreateProduct = () => {
    let [queryData, setQueryData] = useState({})
    
    const _handleChange = async (e)=>{
        e.persist()
        // console.log(e.target.type)
        if(e.target.type == 'file'){
            const formData = new FormData()
            formData.append('file',e.target.files[0])
            
            let {data} = await axios.post('http://localhost:3001/upload',formData)
            setQueryData({
                ...queryData,
                [e.target.name]:data.file
            })
        } else{
            var value = e.target.value
            if(e.target.name == "price"){
                value = parseInt(e.target.value)
            } 
            setQueryData({
                ...queryData,
                [e.target.name]:value
            })
        }
    }

    const _handleSubmit = async() => {
        let query = `
            mutation createProduct($product:ProductInput!){
                createProduct(product:$product){
                    id
                    name
                    price
                }
            }
        `

        let {data} = await axios.post('http://localhost:3001/graphql',{
            query,
            variables:{
                "product":{
                    ...queryData
                }
            }
        })
    }

    return (
        <>
            <img src={`http://localhost:3001/uploads/${queryData.banner}`} alt='None' width='300'/><br/>
            <input
                type='file'
                name='banner'
                onChange={_handleChange}
            /><br/>
            <input
                type='text'
                name='name'
                placeholder='name'
                value={queryData.name}
                onChange={_handleChange}
            /><br/>
            <input
                type='text'
                name='type'
                placeholder='type'
                value={queryData.type}
                onChange={_handleChange}

            /><br/>
            <input
                type='text'
                name='price'
                placeholder='price'
                value={queryData.price}
                onChange={_handleChange}

            /><br/>
            <input
                type='text'
                name='description'
                placeholder='description'
                value={queryData.description}
                onChange={_handleChange}

            /><br/>
            <input
                type='name'
                name='detail'
                placeholder='detail'
                value={queryData.detail}
                onChange={_handleChange}

            /><br/>
            <input
                type='file'
                name='attachment'
                onChange={_handleChange}

            /><br/>
            <button onClick={_handleSubmit}>저장</button>
        </>
    )
}

export default CreateProduct