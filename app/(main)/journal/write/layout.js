import Link from 'next/link';
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';

 const Writelayout = ({children}) => {
  return (
    <div className="container mx-auto">
        <div>
            <Link href="/dashboard"
            className="text-sm text-orange-600 hover:text-orange-900 cursor-pointer">
                ← Back to Dashboard
                </Link>

        </div>
        <Suspense fallback={<BarLoader color='orange' width={"100%"}/>}>
        {children}
        </Suspense>
        </div>
  )
}

export default Writelayout;
