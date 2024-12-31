import { SignInProps, SignUpProps } from "@/types";
import { adminSupabase, supabase } from "../supabase";

export async function signUp(formData: SignUpProps) {
  const { data: authUser, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        role: formData.role || "user",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  const { error: userError } = await supabase.from("profiles").insert({
    user_id: authUser?.user?.id,
    fullName: formData.fullName,
    birthDate: formData.birthDate,
    nationalId: formData.nationalId,
    email: formData.email,
    role: formData.role || "user",
  });
  if (userError) await supabase.auth.admin.deleteUser(authUser?.user?.id!);

  return authUser;
}

export async function login({ email, password }: SignInProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (!session || sessionError) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function getCurrentUserProfile(userId: string) {
  const user = await getCurrentUser();
  if (user?.id !== userId) return null;

  const { error, data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getPreviousResultsForUser(userId: string) {
  if (!userId) return null;

  const { error, data } = await supabase
    .from("previousresults")
    .select("*")
    .eq("patient_id", userId);

  if (error) throw new Error(error.message);

  return data;
}

export const getProfilesByRole = async (roleName: string) => {
  const { error, data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", roleName);

  if (error) throw new Error(error.message);

  const currentUser = await getCurrentUser();
  const filteredDoctors = profiles.filter(
    (profile) => profile.user_id !== currentUser?.id
  );
  return filteredDoctors;
};

export async function updateCurrentUser(formData: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (formData.newPassword) {
    const { error } = await supabase.auth.updateUser({
      email: formData.email,
      password: formData.newPassword,
    });
    if (error) throw new Error(`Auth update failed: ${error.message}`);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      user_id: formData.userId,
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      avatar: formData.avatar,
    })
    .eq("user_id", formData.userId);

  if (error) throw new Error(`Profile update failed: ${error.message}`);

  return data;
}

export async function creatNewDoctor(formData: any) {
  const { data: authUser, error } = await adminSupabase.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      role: "admin", // Custom metadata for the user
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  const { error: userError } = await supabase.from("profiles").insert({
    user_id: authUser?.user?.id,
    fullName: formData.fullName,
    gender: formData.gender,
    birthDate: formData.birthDate,
    nationalId: formData.nationalId,
    phone: formData.phone,
    email: formData.email,
    role: "admin",
  });
  if (userError) await supabase.auth.admin.deleteUser(authUser?.user?.id!);

  return authUser;
}

export const getAnalysisTypes = async () => {
  const { error, data } = await supabase.from("analyses").select("id, type");

  if (error) throw new Error(error.message);

  return data;
};

export const checkNationalIdExists = async (
  nationalId: string
): Promise<boolean> => {
  try {
    const { error, data } = await supabase
      .from("profiles")
      .select("nationalId")
      .eq("nationalId", nationalId)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);

    // if data exists => the nationalId exists
    return !!data;
  } catch (err) {
    throw new Error("Unable to verify National ID. Please try again later.");
  }
};
