import React from 'react'
import { Switch } from "@/components/ui/switch"
function SettingsOption({label}) {
  return (
    <div className='flex justify-between'>
    <p className='font-medium text-lg text-[#1E1E1EB3]  '>{label}</p>
    <Switch />
    

  </div>
  )
}

export default SettingsOption