export const validateEmail = (value: string): string | null => {
  if (!value.trim()) {
    return "Email is required";
  }
  if (!value.includes("@")) {
    return "Email must be valid";
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value.trim()) {
    return "Password is required";
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
};

