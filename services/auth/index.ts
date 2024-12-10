import { SignInProps, SignUpProps } from "@/types";
import { supabase } from "../supabase";
import { genders } from "@/constants";

export async function signUp(formData: SignUpProps) {
  const { data: authUser, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        role: formData?.role || "user",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  const { error: userError } = await supabase.from("profiles").insert({
    user_id: authUser?.user?.id,
    full_name: formData.fullName,
    birth_date: formData.birthDate,
    tc: formData.tc,
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
      full_name: formData.fullName,
      birth_date: formData.birthDate,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
    })
    .eq("user_id", formData.userId);

  if (error) throw new Error(`Profile update failed: ${error.message}`);

  return data;
}
