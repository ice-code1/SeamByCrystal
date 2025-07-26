import React, { useEffect, useState } from 'react'
import { client } from '../sanity/sanity' // adjust if your path differs

const Gallery = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const query = `*[_type == "gallery"]{title, image{asset->{url}}}`
    client.fetch(query).then((data) => setImages(data))
  }, [])

  return (
    <div>
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {images.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <img src={item.image.asset.url} alt={item.title} width={250} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
