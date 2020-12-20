import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [ keyword, setKeyword ] = useState('')
    console.log(keyword)
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Control type="text" name='q' placeholder='search products...' className='mr-sm-2 ml-sm-5' onChange={(e) => setKeyword(e.target.value)}></Form.Control>
                <Button type='submit' variant='danger' className='p-2'>Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox
