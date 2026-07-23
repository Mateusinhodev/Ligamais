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
  const [profile, setProfile] = useState(null);

  function updateFormData(fields) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function completeProfile(fields) {
    const completedProfile = { ...formData, ...fields };

    setFormData(completedProfile);
    setProfile(completedProfile);

    return completedProfile;
  }

  function startProfileEdit() {
    setFormData(profile ?? initialState);
  }

  function resetFormData() {
    setFormData(initialState);
  }

  function clearProfile() {
    setProfile(null);
    setFormData(initialState);
  }

  return (
    <ProfileFormContext.Provider
      value={{
        formData,
        profile,
        updateFormData,
        completeProfile,
        startProfileEdit,
        resetFormData,
        clearProfile,
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
