import { DocumentHeader } from '@/components/documents/molecules/DocumentHeader'
import DocumentManagement from '@/components/documents/molecules/DocumentManagement'
import React from 'react'

export default function Documents() {
    return (
        <div>
            <DocumentHeader />

            <DocumentManagement />
        </div>
    )
}
