// src/components/Training.jsx

import React, { useEffect, useState } from 'react'
import { client } from '../sanity/sanity'

const Training = () => {
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const query = `*[_type == "training"]{title, description, image{asset->{url}}}`
    client.fetch(query).then((data) => setTrainings(data))
  }, [])

  return (
    <div>
      <h1>Training Programs</h1>
      <div className="training-grid">
        {trainings.map((item, index) => (
          <div key={index} className="training-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.image && (
              <img src={item.image.asset.url} alt={item.title} width={250} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Training
