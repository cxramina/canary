import React from 'react'

function Root() {
  return (
    <div className="grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
      <div className="h-9 w-9 col-start-1 row-span-2 rounded-md bg-tertiary-background relative">
        <div className='absolute -inset-4 w-full h-full bg-[url("../images/user-avatar.svg")] bg-cover rounded-md overflow-hidden' />
      </div>
      <p className="col-start-2 row-start-1 text-xs text-primary">Steven M.</p>
      <p className="col-start-2 row-start-2 text-xs font-light">Admin</p>
    </div>
  )
}

export { Root }
