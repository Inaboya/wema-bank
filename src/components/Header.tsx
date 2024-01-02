import Notifications from './Notifications'
import UserMenu from './UserMenu'

interface SideBarOptions {
  sidebarOpen: boolean
  setSidebarOpen: (x: boolean) => void
}

function Header({ sidebarOpen, setSidebarOpen }: SideBarOptions) {
  return (
    <div className='bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-slate-700 z-30 w-full h-[70px] sticky top-0'>
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between gap-4">
        <button
            type="button"
            className="text-slate-500 hover:text-slate-600 hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={(e) => {
              e.stopPropagation()
              setSidebarOpen(!sidebarOpen)
            }}
          >
            {!sidebarOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M11.3425 12.9008L16.3037 7.93963L14.8855 6.52344L8.50712 12.9008L14.8855 19.2792L16.3027 17.861L11.3415 12.8998L11.3425 12.9008Z"
                  fill="#039BF0"
                />
              </svg>
            )}
          </button>

          <h3 className="text-[#1A1619] text-[24px] font-bold">Verifiers</h3>

          <div className="flex items-center space-x-3">
            <Notifications align="right" />
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header