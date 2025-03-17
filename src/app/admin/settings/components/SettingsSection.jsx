
import React from 'react'
import SettingsOption from './SettingsOption'

function SettingsSection({title, options}) {
  


  return (
     <main className='w-1/2 flex flex-col gap-2'>
         <h3 className="font-bold text-xl">{title}</h3>
         <figure className='flex flex-col  gap-8 rounded-xl border-[1.5px] border-[#EBEBEB] px-3 py-4'>
           {
            options.map((option, index)=>(
                <SettingsOption key={index} label={option}/>
            ))
                }
          
         </figure>
       </main>
  )
}

export default SettingsSection