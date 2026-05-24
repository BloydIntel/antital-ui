'use client'

import React from 'react'
import { TYPOGRAPHY } from '@/constants/styles'
import { ArrowLeft, FileText, Printer, Download } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { invoiceData, InvoiceData } from '@/data/transactionsMockData'
import Image from 'next/image'
import { StatusButton } from '@/components/balance-funding/atoms/StatusButton'

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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 border-b border-[#EAEAEA] pb-6 mb-8">
                    <div>
                        <Image
                            src="/icons/antital.svg"
                            alt="Antital Logo"
                            width={153}
                            height={44}
                        />
                        <p className="text-[16px] text-[#858585] mt-2" style={TYPOGRAPHY.body}>Investment Platform</p>
                        <p className="text-[16px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>Lagos, Nigeria</p>
                    </div>
                    <div className="space-y-1.5 text-left sm:text-right text-[16px]" style={TYPOGRAPHY.body}>
                        <p className="text-[#858585]">Invoice Date: <span className="text-[#1F1F1F] font-medium">{invoiceDate}</span></p>
                        <p className="text-[#858585]">Payment Date: <span className="text-[#1F1F1F] font-medium">{paymentDate}</span></p>
                        <p className="text-[#858585]">Payment Method: <span className="text-[#1F1F1F] font-medium">{paymentMethod}</span></p>
                    </div>
                </div>

                {/* Client & Metadata Grid Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 className="text-[18px] font-medium text-[#1F1F1F] mb-4" style={TYPOGRAPHY.body}>Bill To:</h4>
                        <div className="space-y-1 text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            <p className="text-[#1F1F1F]">{billTo.name}</p>
                            <p>{billTo.email}</p>
                            <p>{billTo.phone}</p>
                        </div>
                    </div>

                    <div className="sm:text-right">
                        <h4 className="text-[18px] font-medium text-[#1F1F1F] mb-4" style={TYPOGRAPHY.body}>Transaction Details:</h4>
                        <div className="space-y-1.5 text-[16px] text-[#505050] inline-flex flex-col sm:items-start text-left">

                            <div className="grid grid-cols-[65px_1fr] items-center">
                                <span className="text-[#858585]">Type:</span>
                                <span className="text-[#858585]">{transactionDetails.type}</span>
                            </div>

                            <div className="grid grid-cols-[65px_1fr] items-center">
                                <span className="text-[#858585]">Status:</span>
                                <div>
                                    <StatusButton status={transactionDetails.status} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Dynamic DRY Gray Breakdown Panel */}
                <div className="bg-[#EAEAEA] rounded-xl p-4 mb-4 text-[16px]">
                    <h3 className=" text-[#1F1F1F] mb-4 font-medium" style={TYPOGRAPHY.body}>Transaction Breakdown</h3>

                    <div className="space-y-4" style={TYPOGRAPHY.body}>
                        {summaryRows.map((row, index) => (
                            <div
                                key={index}
                                className={`flex justify-between ${row.border ? 'pb-4 mb-4' : ''}`}
                                style={
                                    row.border
                                        ? {
                                            ...TYPOGRAPHY.body,
                                            backgroundImage: `linear-gradient(to right, #1011114D 50%, rgba(255,255,255,0) 0%)`,
                                            backgroundPosition: 'bottom', // Shifted to bottom to act as a bottom divider
                                            backgroundSize: '12px 1px',   // 12px controls the dash lengths beautifully
                                            backgroundRepeat: 'repeat-x',
                                        }
                                        : TYPOGRAPHY.body
                                }
                            >
                                <span className="text-[#505050] font-medium">{row.label}</span>
                                <span className="text-[#1F1F1F] font-medium">{row.value}</span>
                            </div>
                        ))}

                        {/* Calculations Blocks */}
                        <div className="flex justify-between pt-1" style={TYPOGRAPHY.body}>
                            <span className="text-[#1F1F1F] font-medium" >Subtotal</span>
                            <span className="text-[#1F1F1F] font-medium">₦{breakdown.subtotal.toLocaleString()}.00</span>
                        </div>

                        <div
                            className="flex justify-between pb-4"
                            style={{
                                ...TYPOGRAPHY.body,
                                backgroundImage: `linear-gradient(to right, #1011114D 50%, rgba(255,255,255,0) 0%)`,
                                backgroundPosition: 'bottom', // Shifted to bottom to act as a bottom divider
                                backgroundSize: '12px 1px',   // 12px controls the dash lengths beautifully
                                backgroundRepeat: 'repeat-x',
                            }}>
                            <span className="text-[#1F1F1F] font-medium">Fees:</span>
                            <span className="text-[#1F1F1F]">
                                <span className="mr-4">({breakdown.feePercentage}%)</span>
                                ₦{breakdown.fees.toLocaleString()}.00</span>
                        </div>

                        <div className="flex justify-between pt-2 items-center" style={TYPOGRAPHY.body}>
                            <span className="text-[#1F1F1F] font-medium">Total Amount:</span>
                            <span className="text-[#1F1F1F] font-medium">₦{breakdown.totalAmount.toLocaleString()}.00</span>
                        </div>
                    </div>
                </div>

                {/* Footer legal disclaimer */}
                <div className="text-center text-[16px] text-[#858585] space-y-1 mt-8">
                    <p>This is a computer-generated invoice and requires no signature.</p>
                    <p>For questions about this invoice, contact support@antital.com</p>
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