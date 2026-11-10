"use client";

import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";

interface Note {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    content: string;
    isSystemAlert?: boolean;
}

interface InvestigationNotesProps {
    notes: Note[];
    newNote: string;
    onNoteChange: (val: string) => void;
    onSaveNote: () => void;
}

export function InvestigationNotes({ notes, newNote, onNoteChange, onSaveNote }: InvestigationNotesProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">
            <h2 className="text-[16px] text-[#11110F] border-b border-[#EAEAEA] p-4" style={{ ...TYPOGRAPHY.body, fontWeight: '500' }}>Investigation Notes</h2>

            <div className="p-4 space-y-4">
                <div className="space-y-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className={`flex items-start gap-4 space-y-2`}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#365852] text-white flex items-center justify-center text-[16px] font-medium shrink-0">
                                {note.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex items-center gap-2">

                                        <span className="text-[14px] font-medium text-[#11110F]">
                                            {note.author} ({note.role})
                                        </span>
                                    </div>
                                    <span className="text-[12px] text-[#858585]">{note.timestamp}</span>
                                </div>
                                <div className={`flex flex-col border ${note.isSystemAlert ? "bg-[#FFF5F6] border-[#FFC2C9] rounded-md" : "bg-white border-[#EAEAEA] rounded-xl"
                                    } p-4`}>

                                    <p className={`text-[14px] leading-relaxed ${note.isSystemAlert ? "text-[#D4001A]" : "text-[#858585]"}`}>
                                        {note.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-2 border-t border-[#EAEAEA]">
                    <div className="pt-3 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#EAEAEA] text-[#A8A8A8] flex items-center justify-center text-[16px] font-medium shrink-0">
                            ME
                        </div>
                        <textarea
                            rows={3}
                            value={newNote}
                            onChange={(e) => onNoteChange(e.target.value)}
                            placeholder="Add your review note..."
                            className="w-full resize-none rounded-lg bg-[#F4F5F7] border border-[#EAEAEA] p-3 text-[14px] text-[#858585] placeholder-[#858585] focus:outline-none focus:border-[#11110F]"
                        />
                    </div>
                    <div className="flex justify-end">
                        <OnboardingButton
                            label="Save Note"
                            onClick={onSaveNote}
                            className="my-0 w-fit"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}