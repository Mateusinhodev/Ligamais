import { createContext, useContext, useState } from "react";

const CompetitionFormContext = createContext();

const initialState = {
  coverImage: null,
  name: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
};

export function CompetitionFormProvider({ children }) {
  const [formData, setFormData] = useState(initialState);

  function updateFormData(fields) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function resetFormData() {
    setFormData(initialState);
  }

  return (
    <CompetitionFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </CompetitionFormContext.Provider>
  );
}

export function useCompetitionForm() {
  const context = useContext(CompetitionFormContext);
  if (!context) {
    throw new Error('useCompetitionForm deve ser usado dentro de um CompetitionFormProvider');
  }
  return context;
}