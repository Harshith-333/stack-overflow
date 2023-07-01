import React from 'react'

const WidgetTags = () => {
    const tags=['c','css','express','firebase','html','java','javascript','mern','mongodb','mysql','nxt.js','php','python','reactjs']
  return (
    <div className='widget-tags'>
        <h4>Watched Tags</h4>
        <div className='widget-tags-div'>
            {
                tags.map((tag)=>(
                        <p ke={tag}>{tag}</p>
                ))
            }

        </div>
    </div>
  )
}

export default WidgetTags