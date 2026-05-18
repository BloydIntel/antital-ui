'use client'

import React from 'react'
import { TYPOGRAPHY } from '@/constants/styles'
import { ArrowLeft, FileText, Printer, Download } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { invoiceData, InvoiceData } from '@/data/transactionsMockData'

interface SummaryRow {
    label: string;
    value: string;
    border?: boolean;
}

export default function TransactionInvoice() {
    const router = useRouter()
    const params = useParams()

    const currentInvoiceId = params?.id as string

    const currentInvoice: InvoiceData | undefined = invoiceData.find(
        (inv) => inv.invoiceId === currentInvoiceId
    )

    const handlePrint = (): void => {
        window.print()
    }

    if (!currentInvoice) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
                <h3 className="text-[18px] font-medium text-red-600 mb-2" style={TYPOGRAPHY.heading}>Invoice Not Found</h3>
                <p className="text-[14px] text-[#717171] mb-4">The invoice sequence reference ID does not exist.</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-[#042E27] text-white rounded-lg text-[14px]"
                >
                    Go Back
                </button>
            </div>
        )
    }

    const { invoiceId, invoiceDate, paymentDate, paymentMethod, billTo, transactionDetails, breakdown } = currentInvoice

    const summaryRows: SummaryRow[] = [
        { label: "Description:", value: breakdown.description },
        { label: "Company:", value: breakdown.company },
        { label: "Sector:", value: breakdown.sector },
        { label: "Units:", value: breakdown.units.toString() },
        { label: "Price per Unit:", value: `₦${breakdown.pricePerUnit.toLocaleString()}`, border: true }
    ]

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8">
            {/* Breadcrumb Header Navigation */}
            <div
                className="mx-auto flex items-center gap-2 mb-12 text-[18px] text-[#717171]"
                style={TYPOGRAPHY.body}
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-black transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />

                </button>
                <span>Transaction History</span>
                <span>&gt;</span>
                <span>Transaction Invoice</span>
                <span>&gt;</span>
                <span className="text-black font-medium">{breakdown.company}</span>
            </div>

            {/* Main Document Frame */}
            <div className="max-w-[692px] mx-auto bg-white border border-[#EAEAEA] rounded-xl p-6 md:p-12 shadow-sm print:border-0 print:shadow-none">

                {/* Document Header Metadata */}
                <div className="mb-8">

                    <div className='flex items-center gap-2 mb-2'>
                        <FileText className="w-5 h-5 text-[#505050] mt-0.5" />
                        <p className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>Transaction Invoice</p>

                    </div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Transaction ID: {invoiceId}</p>
                </div>

                {/* Brand Header Line Block */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 border-b border-[#F0F0F0] pb-8 mb-8">
                    <div>
                        <h1 className="text-[32px] font-bold text-[#042E27] tracking-tight leading-none">antital</h1>
                        <p className="text-[14px] text-[#505050] mt-2 font-medium">Investment Platform</p>
                        <p className="text-[14px] text-[#717171] mt-0.5">Lagos, Nigeria</p>
                    </div>
                    <div className="space-y-1.5 text-left sm:text-right text-[14px]">
                        <p className="text-[#717171]">Invoice Date: <span className="text-black font-semibold">{invoiceDate}</span></p>
                        <p className="text-[#717171]">Payment Date: <span className="text-black font-semibold">{paymentDate}</span></p>
                        <p className="text-[#717171]">Payment Method: <span className="text-black font-semibold">{paymentMethod}</span></p>
                    </div>
                </div>

                {/* Client & Metadata Grid Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 className="text-[14px] font-semibold text-black mb-3" style={TYPOGRAPHY.heading}>Bill To:</h4>
                        <div className="space-y-1 text-[14px] text-[#505050]">
                            <p className="font-semibold text-black">{billTo.name}</p>
                            <p>{billTo.email}</p>
                            <p>{billTo.phone}</p>
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <h4 className="text-[14px] font-semibold text-black mb-3" style={TYPOGRAPHY.heading}>Transaction Details:</h4>
                        <div className="space-y-1.5 text-[14px] text-[#505050] flex flex-col sm:items-end">
                            <p className="text-[#717171]">Type: <span className="text-black font-medium">{transactionDetails.type}</span></p>
                            <div className="flex items-center gap-2">
                                <span className="text-[#717171]">Status:</span>
                                <span className="px-2 py-0.5 text-[12px] font-semibold text-white bg-[#22C55E] rounded-md">
                                    {transactionDetails.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic DRY Gray Breakdown Panel */}
                <div className="bg-[#F4F5F7] rounded-xl p-6 mb-8 text-[14px]">
                    <h3 className="font-semibold text-black mb-4 border-b border-[#E6EAE9] pb-3" style={TYPOGRAPHY.heading}>Transaction Breakdown</h3>

                    <div className="space-y-4">
                        {summaryRows.map((row, index) => (
                            <div key={index} className={`flex justify-between ${row.border ? 'border-b border-[#E6EAE9] pb-4' : ''}`}>
                                <span className="text-[#505050]">{row.label}</span>
                                <span className="text-black font-medium">{row.value}</span>
                            </div>
                        ))}

                        {/* Calculations Blocks */}
                        <div className="flex justify-between pt-1">
                            <span className="text-black font-semibold">Subtotal</span>
                            <span className="text-black font-semibold">₦{breakdown.subtotal.toLocaleString()}.00</span>
                        </div>

                        <div className="flex justify-between border-b border-[#E6EAE9] pb-4">
                            <span className="text-[#505050]">Fees: ({breakdown.feePercentage}%)</span>
                            <span className="text-black font-medium">₦{breakdown.fees.toLocaleString()}.00</span>
                        </div>

                        <div className="flex justify-between pt-2 items-center">
                            <span className="text-black font-bold text-[15px]">Total Amount:</span>
                            <span className="text-black font-bold text-[16px]">NGN{breakdown.totalAmount.toLocaleString()}.00</span>
                        </div>
                    </div>
                </div>

                {/* Footer legal disclaimer */}
                <div className="text-center text-[12px] text-[#8C8C8C] space-y-1 mt-12 border-t border-[#F0F0F0] pt-6">
                    <p>This is a computer-generated invoice and requires no signature.</p>
                    <p>For questions about this invoice, contact <span className="text-black font-medium">support@antital.com</span></p>
                </div>
            </div>

            {/* Action floating buttons group */}
            <div className="max-w-[800px] mx-auto flex items-center justify-center gap-3 mt-6 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EAEAEA] text-[#1A1C1E] rounded-lg font-medium text-[14px] hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.heading}
                >
                    <Printer className="w-4 h-4" />
                    Print Invoice
                </button>
                <button
                    onClick={() => console.log("Init PDF generator payload")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EAEAEA] text-[#1A1C1E] rounded-lg font-medium text-[14px] hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.heading}
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>
        </div>
    )
}