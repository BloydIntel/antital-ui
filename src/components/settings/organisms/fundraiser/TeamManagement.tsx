'use client';

import React, { useState, useMemo } from 'react';
import { MoreVertical, Mail, Plus, Shield } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar';

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    status: 'Active' | 'Pending';
    initials: string;
}

export interface PendingInvite {
    id: string;
    email: string;
    sentAt: string;
}

const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'm1', name: 'Anjola Olorun', email: 'anjola@skyhightech.com', role: 'Admin', status: 'Active', initials: 'AO' },
    { id: 'm2', name: 'Oluwafemi Soyebo', email: 'femi@skyhightech.com', role: 'Editor', status: 'Active', initials: 'OS' },
    { id: 'm3', name: 'Sarah Smith', email: 'sarah@skyhightech.com', role: 'Viewer', status: 'Active', initials: 'AO' }, // Initials matching mockup context
    { id: 'm4', name: 'Emily Wilson', email: 'emily@skyhightech.com', role: 'Viewer', status: 'Pending', initials: 'AO' }
];

const MOCK_PENDING_INVITES: PendingInvite[] = [
    { id: 'i1', email: 'david@skyhightech.com', sentAt: 'Sent 2 days ago' }
];


export function TeamManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [members] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
    const [invites, setInvites] = useState<PendingInvite[]>(MOCK_PENDING_INVITES);

    const filteredMembers = useMemo(() => {
        return members.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, members]);

    const handleInviteMember = () => {
        console.log('Open invite member modal wrapper...');
    };

    const handleConfigureRole = (role: string) => {
        console.log(`Configuring access tokens permissions for role: ${role}`);
    };

    const handleRevokeInvite = (id: string) => {
        setInvites(prev => prev.filter(invite => invite.id !== id));
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Context Heading Header Module Canvas */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                        Team Management
                    </h2>
                    <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                        Manage your team members and their access levels
                    </p>
                </div>
                <OnboardingButton
                    label="Invite Member"
                    className="lg:w-fit h-10 rounded-md flex-row-reverse"
                    onClick={handleInviteMember}
                    icon={<Plus className="w-4 h-4 text-white" />}
                />


            </div>

            {/* Layout Main Framework Matrix Structure */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Left Side Sheet: Active Members Workspace Table Card */}
                <div className="lg:col-span-8 bg-white rounded-xl p-4 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                            Active Members
                        </h3>

                        <SearchInputBar
                            placeholder="Search documents"
                            value={searchQuery}
                            onChange={setSearchQuery}
                            containerClassName='max-w-[329px]'
                            iconClassName='text-[#323232]'
                        />
                    </div>

                    {/* Team Workspace Directory Rows List */}
                    <div className="min-h-[260px] space-y-4.5">
                        {filteredMembers.length === 0 ? (
                            <div className="text-center py-12 text-[#999999] text-sm">No members found matching search query.</div>
                        ) : (
                            filteredMembers.map((member) => (
                                <div key={member.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 bg-[#EFF6FF]">
                                            <AvatarFallback className="text-[16px] font-bold text-[#1B1B1B]">{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-sm text-[#505050]" style={TYPOGRAPHY.body}>{member.name}</h4>
                                            <p className="text-xs text-[#A8A8A8] mt-0.5">{member.email}</p>
                                        </div>
                                    </div>

                                    {/* Action Status Markers & Context Config Buttons */}
                                    <div className="flex items-center gap-6 text-right">
                                        <div>
                                            <span className="block text-sm font-medium text-[#595959]">{member.role}</span>
                                            <span className={`text-xs block mt-0.5 ${member.status === 'Active' ? 'text-[#45B424]' : 'text-[#DCA73B]'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </div>
                                        <button className="p-1.5 rounded-lg text-[#CCCCCC] hover:text-[#717171] hover:bg-[#F9FAFB] transition-all cursor-pointer">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Side Sheet Component Matrix Stack Panel Column */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Dark Card Widget Element: Role Matrix Custom Configuration Panel */}
                    <div className="bg-[#021310] text-white rounded-xl py-6 px-4 space-y-4">

                        <Shield className="w-6 h-6 text-[#B9C65B]" />

                        <div className="space-y-2">
                            <h3 className="text-[18px] text-[#F4F5F7] tracking-tight" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>Role Permissions</h3>
                            <p className="text-[14px] text-[#858585] leading-normal">
                                Control what your team members can see and do on the platform.
                            </p>
                        </div>

                        {/* Interactive Permissions Configure Row Loops */}
                        <div className="space-y-2 pt-2">
                            {['Admin', 'Editor', 'Viewer'].map((role) => (
                                <div key={role} className="flex items-center justify-between p-4 bg-[#162626] border border-[#2F3C3C] rounded-lg hover:bg-[#162626]/6 transition-all">
                                    <span className="text-[12px] font-medium text-[#F4F5F7]">{role}</span>
                                    <button
                                        onClick={() => handleConfigureRole(role)}
                                        className="text-xs text-[#B9C65B] hover:text-[#A4B04E] transition-colors cursor-pointer"
                                    >
                                        Configure
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Invites Registry Block Card Section */}
                    <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
                        <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                            Pending Invites
                        </h3>
                        <div className="space-y-2">
                            {invites.length === 0 ? (
                                <p className="text-xs text-[#999999] py-2">No pending invitations outstanding.</p>
                            ) : (
                                invites.map((invite) => (
                                    <div key={invite.id} className="flex items-center justify-between p-3 gap-2 bg-[#F4F5F7] rounded-lg border border-transparent">
                                        <div className="flex items-center gap-3 min-w-0">

                                            <Mail className="w-5 h-5 text-[#A8A8A8]" />

                                            <div className="min-w-0">
                                                <span className="block text-[14px] font-medium text-[#595959] truncate">{invite.email}</span>
                                                <span className="text-[12px] text-[#A8A8A8] block mt-0.5">{invite.sentAt}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRevokeInvite(invite.id)}
                                            className="text-[14px] font-medium text-[#D4001A] hover:text-red-700 px-2 py-1 transition-colors cursor-pointer shrink-0"
                                        >
                                            Revoke
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}