import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
   
    const { product } = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for (let i=0; i< pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination>
            {pages.map(page => 
              <Pagination.Item
              key={page}
              activ={product.page === page}
              onClick={() => product.setPage(page)}
              >
                  {page}
              </Pagination.Item>  
                )}
        </Pagination>
    )
})

export default Pages;