import { createContext, useContext, useState } from "react";

const CompetitionFormContext = createContext();

const initialState = {
  // Step 1 - Geral
  coverImage: null,
  name: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  // Step 2 - Configuração
  format: '',
  teamsCount: '',
  scheduleMode: 'rounds', // 'rounds' | 'period'
  roundsCount: '',
  matchDays: [],
  matchTime: '',
  // matchInterval: '',
  // Step 3 - Equipes
  teams: [
    { id: '1', name: '', color: '' },
    { id: '2', name: '', color: '' },
  ],
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