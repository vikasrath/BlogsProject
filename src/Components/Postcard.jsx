
import React from 'react'
import detabaseservice from '../Appwrite/Database'

function Postcard({ title, Image }) {
  return (
    <div className='w-full p-4 bg-[#E3FEF7] rounded-xl'>
      <div className='w-full mb-4 flex justify-center'>
        {Image ? (
          <img src={detabaseservice.getFilePrview(Image)} alt={title} className='rounded-lg max-w-full h-auto' />
        ) : (
          "Image not found"
        )}
      </div>
      <h2 className='text-xl text-[#003C43]'>{title}</h2>
    </div>
  )
}

export default Postcard













// import React from 'react'
// import detabaseservice from '../Appwrite/Database'

// function Postcard({ title, Image }) {
//   return (
//     <div className='w-full p-4 bg-[#FFF5E0] rounded-xl'>
//       <div className='w-full justify-center mb-4'>
//         {Image ? 
//           (<img src={detabaseservice.getFilePrview(Image)} alt={title} className='rounded-lg' />)
//           : "image not found"} 
//       </div>
//       <h2 className='text-xl text-[#141E46]'>{title}</h2>
//     </div>
//   )
// }

// export default Postcard
