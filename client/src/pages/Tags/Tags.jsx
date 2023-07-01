import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {
    const tagsList=[{
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design.this is a programming language that is used in web development both in front and backend design.this is a programming language that is used in web development both in front and backend design."
    },
    {
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    },{
        id:1,
        tagName:"javascript",
        tagDesc:"this is a programming language that is used in web development both in front and backend design."
    }
]
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a key word or lable that cataegorixe your questions with other similar questions</p>
            <p className='tags-p'>using the right tags make it easier for others to find and answer your questions.</p>
            <div className="tags-list-container">
                {
                    tagsList.map((tag)=>(
                        <TagsList tag={tag} key={tagsList.id}/>
                    ))
                }
            </div>
        </div>

        
    </div>
  )
}

export default Tags