import {Menu, Transition} from '@headlessui/react'

function MixtapeDropdown({button, changePage}) {
    return (
        <>
            <div className="relative text-left z-50">
                <Menu>
                    {({open}) => (
                        <>
                            <Menu.Button className="h-auto">
                                {button}
                            </Menu.Button>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute
                                    opacity-80
                                    left-0 w-56 mt-2 origin-top-right bg-gray-900 border border-gray-700
                                    divide-y divide-gray-700 rounded-md shadow-lg outline-none"
                                >
                                    <div className="px-4 py-3">
                                        <p className="text-sm leading-5">Current mixtape</p>
                                        <p className="text-sm font-medium leading-5 truncate">
                                            December 2020
                                        </p>
                                    </div>

                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#account-settings"
                                                    className={`${
                                                        active
                                                            && "bg-gray-800"
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Account settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>

                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    onClick={() => changePage('MIXTAPE')}
                                                    className={`${
                                                        active
                                                        && "bg-gray-800"
                                                    } flex justify-start items-center w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    <svg
                                                        className="text-gray-white h-6 w-6 mr-1"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    New Mixtape
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </>
    )
}

export default MixtapeDropdown