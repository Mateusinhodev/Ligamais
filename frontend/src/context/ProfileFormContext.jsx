import { createContext, useContext, useState } from "react";

const ProfileFormContext = createContext();

const initialState = {
  photo: null,
  fullName: '',
  nickname: '',
  birthDate: '',
  city: '',
  state: '',
  fieldPosition: '',
  futsalPosition: '',
  dominantFoot: 'right',
  preferredNumber: '',
};

export function ProfileFormProvider({ children }) {
  const [formData, setFormData] = useState(initialState);

  function updateFormData(fields) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function completeProfile(fields) {
    const completedProfile = { ...formData, ...fields };
    setFormData(completedProfile);
    return completedProfile;
  }

  function resetFormData() {
    setFormData(initialState);
  }

  return (
    <ProfileFormContext.Provider
      value={{
        formData,
        updateFormData,
        completeProfile,
        resetFormData,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
}

export function useProfileForm() {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error('useProfileForm deve ser usado dentro de um ProfileFormProvider');
  }
  return context;
}