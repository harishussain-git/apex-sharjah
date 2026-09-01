import PreLoader from '@/components/layout/PreLoader'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* except SiteHeader.jsx and SiteFooter.jsx, all other components are lazy loaded to improve performance and reduce initial load time. The PreLoader component is displayed while the other components are being loaded. */}
      <PreLoader />
    </div>
  )
}

export default page