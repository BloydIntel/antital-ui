"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { mapApiUserTypeToStoreUserType } from "@/lib/user-type";
import { useUserStore } from "@/store/userStore";

/** Keeps persisted userType aligned with the API profile on session restore. */
export function SyncUserProfile() {
  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    const { updateProfile, setUserId } = useUserStore.getState();
    updateProfile({
      emailAddress: user.email,
      userType: mapApiUserTypeToStoreUserType(user.userType),
      isEmailVerified: user.isEmailVerified,
    });
    setUserId(String(user.id));
  }, [user]);

  return null;
}
