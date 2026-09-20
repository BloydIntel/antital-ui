"use client";

import { AdminNote } from "@/types/position-detail";

interface AdminNoteCardProps {
    note: AdminNote;
}

export function AdminNoteCard({ note }: AdminNoteCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 space-y-3">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4 -mx-4">Admin Note</h2>

            <div className="bg-[#FCFCFC] border border-[#00000014] rounded-lg my-4 p-4 space-y-1">
                <div className="flex items-center justify-between text-[14px]">
                    <span className="font-medium text-[#2C2C2C]">{note.author}</span>
                    <span className="text-[#A8A8A8]">{note.date}</span>
                </div>
                <p className="text-[14px] text-[#858585] leading-relaxed">{note.content}</p>
            </div>
        </div>
    );
}