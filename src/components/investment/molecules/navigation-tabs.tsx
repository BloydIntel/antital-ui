import React from 'react'

interface NavigationTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function NavigationTabs({ activeTab = 'overview', onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', width: '95px' },
    { id: 'details', label: 'Details', width: '76px' },
    { id: 'updates', label: 'Updates', width: '88px' },
    { id: 'testimonials', label: 'What people are saying', width: '202px' },
    { id: 'questions', label: 'Ask a question', width: '135px' },
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
          onClick={() => onTabChange?.(tab.id)}
          className="flex flex-row justify-center items-center px-3 py-2 flex-shrink-0"
          style={{
            width: tab.width,
            minWidth: tab.width,
            height: '37px',
            borderBottom: activeTab === tab.id ? '2px solid #7A6FF0' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '21px',
              color: activeTab === tab.id ? '#2C2C2C' : '#505050',
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

