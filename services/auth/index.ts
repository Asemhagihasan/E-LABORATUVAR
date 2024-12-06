import { SignInProps, SignUpProps } from "@/types";
import { supabase } from "../supabase";

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

  if (formData.role === "admin") {
    // add user to admin group
  } else if (formData.role === "user") {
    const { error: patientError } = await supabase.from("patients").insert({
      user_id: authUser?.user?.id,
      full_name: formData.fullName,
      birth_date: formData.birthDate,
      tc: formData.tc,
    });

    if (patientError) {
      await supabase.auth.admin.deleteUser(authUser?.user?.id!);
      throw new Error(patientError.message);
    }
  } else {
    await supabase.auth.admin.deleteUser(authUser?.user?.id!);
    throw new Error("Invalid role");
  }

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

export async function addPatient() {}
