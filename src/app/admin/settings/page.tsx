import React from 'react'
import { Switch } from "@/components/ui/switch"
import SettingsSection from './components/SettingsSection'

function page() {
  return (
    <section className='flex flex-col gap-10 '>
  <main className='flex justify-between gap-10'>

  <SettingsSection title="User Access and Authentication"
        options={[
          "Enable user registration",
          "Enable two-factor authentication",
          "Require email verification",
        ]}
        />
  <SettingsSection title="Orders"
        options={[
          "Auto- confirm paid orders",
          "Enable scheduled deliveries",
          "Activate fraud detection system",
        ]}
        />
  </main>
  <main className='flex justify-between gap-10'>

  <SettingsSection title="Inventory and Product management"
        options={[
          "Auto-hide out of stock items",
          "Enable product review moderation",
          
        ]}
        />
  <SettingsSection title="Payment and Finance"
        options={[
          "Enable multi- currency support",
          "Enable loyalty points system",
       
        ]}
        />
  </main>
  <main className='flex justify-between gap-10'>

  <SettingsSection title="Notification and Communication"
        options={[
          "Enable push notifications for users",
          "Activate AI chatbot for customer support",
          "Send transactional emails and SMS alerts",
        ]}
        />
  <SettingsSection title="Security and Privacy"
        options={[
          "Ensure data encryption and GDPR compliance",
          "Enable security logs and anomaly detection",
          "Allow users to export or delete their data",
        ]}
        />
  </main>
    </section>
  )
}

export default page