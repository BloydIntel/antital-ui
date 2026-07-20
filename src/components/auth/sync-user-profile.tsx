"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { mapApiUserTypeToStoreUserType } from "@/lib/user-type";
import { useUserStore } from "@/store/userStore";

/** Keeps persisted userType aligned with the API profile on session restore. */
export function SyncUserProfile() {
  const { data: user } = useCurrentUser();
  const updateProfile = useUserStore((state) => state.updateProfile);

  useEffect(() => {
    if (!user) return;

    updateProfile({
      emailAddress: user.email,
      userType: mapApiUserTypeToStoreUserType(user.userType),
    });
    useUserStore.getState().setUserId(String(user.id));
  }, [user, updateProfile]);

  return null;
}
