const theme = {
  // Paleta de cores
  colors: {
    // Cor principal da aplicação
    primary: "#2E9E44",
    primaryDark: "#1F7A33",

    // Cores de feedback
    success: "#6CCF63",
    error: "#D93A34",
    warning: "#D9A520",
    info: "#2F66D5",

    // Fundos
    background: "#F7F7F7", // Fundo padrão das telas
    surface: "#FFFFFF", // Cards, modais e componentes

    // Textos
    text: "#1A1A1A", // Texto principal
    textSecondary: "#666666", // Texto secundário
    white: "#FFFFFF", // Texto sobre fundos escuros

    // Bordas e divisores
    border: "#E5E5E5",
  },

  // Tipografia
  fonts: {
    // Fontes de destaque (títulos, placares, botões)
    heading: "Rajdhani_700Bold",
    title: "Rajdhani_600SemiBold",
    button: "Rajdhani_600SemiBold",

    // Fontes para leitura
    body: "Montserrat_400Regular",
    medium: "Montserrat_500Medium",
    semiBold: "Montserrat_600SemiBold",
  },

  // Tamanhos de fonte
  fontSize: {
    xs: 12, // Pequeno (captions)
    sm: 14, // Labels
    md: 16, // Texto padrão
    lg: 18, // Subtítulos
    xl: 22, // Títulos
    xxl: 28, // Títulos principais
  },

  // Arredondamento dos componentes
  radius: {
    sm: 8, // Chips e pequenos componentes
    md: 12, // Inputs e botões
    lg: 16, // Cards
    pill: 999, // Botões e badges arredondados
  },

  // Espaçamentos
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export default theme;