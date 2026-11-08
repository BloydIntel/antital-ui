"use client";

import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

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
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] space-y-5">
            <h2 className="font-bold text-[16px] text-[#11110F]">Investigation Notes</h2>

            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`p-4 rounded-xl border ${note.isSystemAlert ? "bg-[#FEF8EC] border-[#FCE9C4]" : "bg-[#FAFAFA] border-[#EAEAEA]"
                            } space-y-2`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#30534C] text-white flex items-center justify-center text-xs font-bold">
                                    {note.author[0]}
                                </div>
                                <span className="text-[13px] font-bold text-[#11110F]">
                                    {note.author} <span className="text-[#858585] font-normal">({note.role})</span>
                                </span>
                            </div>
                            <span className="text-[11px] text-[#858585]">{note.timestamp}</span>
                        </div>
                        <p className={`text-[13px] leading-relaxed ${note.isSystemAlert ? "text-[#B78B32]" : "text-[#505050]"}`}>
                            {note.content}
                        </p>
                    </div>
                ))}
            </div>

            <div className="space-y-3 pt-2">
                <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => onNoteChange(e.target.value)}
                    placeholder="Add your review note..."
                    className="w-full resize-none rounded-lg border border-[#EAEAEA] p-3 text-[14px] text-[#11110F] placeholder-[#858585] focus:outline-none focus:border-[#11110F]"
                />
                <div className="flex justify-end">
                    <OnboardingButton
                        label="Save Note"
                        onClick={onSaveNote}
                        className="my-0 bg-[#30534C] text-white hover:bg-[#25423C]"
                    />
                </div>
            </div>
        </div>
    );
}