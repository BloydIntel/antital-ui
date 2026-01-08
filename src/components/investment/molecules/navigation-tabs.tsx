import React from 'react'

interface NavigationTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function NavigationTabs({ activeTab = 'overview', onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', width: '95px', disabled: false },
    { id: 'details', label: 'Details', width: '76px', disabled: false },
    { id: 'updates', label: 'Updates', width: '88px', disabled: false },
    { id: 'testimonials', label: 'What people are saying', width: '202px', disabled: true },
    { id: 'questions', label: 'Ask a question', width: '135px', disabled: false },
  ]

  return (
    <div
      className="flex flex-row items-center w-full overflow-x-auto"
      style={{
        maxWidth: '596px',
        minHeight: '37px',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange?.(tab.id)}
          disabled={tab.disabled}
          className="flex flex-row justify-center items-center px-3 py-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            width: tab.width,
            minWidth: tab.width,
            height: '37px',
            borderBottom: activeTab === tab.id ? '2px solid #7A6FF0' : 'none',
          }}
        >
          <span
            className={
              activeTab === tab.id
                ? 'text-[#2C2C2C] dark:text-[#2C2C2C]'
                : tab.disabled
                  ? 'text-[#858585] dark:text-[#858585]'
                  : 'text-[#505050] dark:text-[#505050]'
            }
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '21px',
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

