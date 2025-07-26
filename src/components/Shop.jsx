// src/components/Shop.jsx

import React, { useEffect, useState } from 'react'
import { client } from '../sanity/sanity'

const Shop = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const query = `*[_type == "shop"]{name, price, description, image{asset->{url}}}`
    client.fetch(query).then((data) => setProducts(data))
  }, [])

  return (
    <div>
      <h1>Shop Items</h1>
      <div className="shop-grid">
        {products.map((item, index) => (
          <div key={index} className="shop-card">
            <h3>{item.name}</h3>
            <p>₦{item.price}</p>
            {item.image && (
              <img src={item.image.asset.url} alt={item.name} width={250} />
            )}
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
