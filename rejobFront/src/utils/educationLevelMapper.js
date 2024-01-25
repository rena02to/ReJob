export const educationLevelMapper = (educationLevel) => {
    const educationLevelMap = {
      ENSINO_FUNDAMENTAL_COMPLETO: 'Ensino Fundamental Completo',
      ENSINO_FUNDAMENTAL_INCOMPLETO: 'Ensino Fundamental Incompleto',
      ENSINO_MEDIO_COMPLETO: 'Ensino Médio Completo',
      ENSINO_MEDIO_INCOMPLETO: 'Ensino Médio Incompleto',
      EDUCACAO_SUPERIOR_COMPLETA: 'Educação Superior Completa',
      EDUCACAO_SUPERIOR_INCOMPLETA: 'Educação Superior Incompleta',
      POS_GRADUACAO_COMPLETA: 'Pós-graduação Completa',
      POS_GRADUACAO_INCOMPLETA: 'Pós-graduação Incompleta',
      MESTRADO_COMPLETO: 'Mestrado Completo',
      MESTRADO_INCOMPLETO: 'Mestrado Incompleto',
      DOUTORADO_COMPLETO: 'Doutorado Completo',
      DOUTORADO_INCOMPLETO: 'Doutorado Incompleto',
      OUTRO: 'Outro',
    };
  
    return educationLevelMap[educationLevel] || 'Desconhecido';
  };
  