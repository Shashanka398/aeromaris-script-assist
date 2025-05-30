import { DefaultMantineColor, MantineThemeOverride, PasswordInput } from '@mantine/core';


const baseTheme: MantineThemeOverride = {
  colorScheme: "light",
  primaryShade: 6,
  fontFamily: 'Outfit,sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  fontSizes: { 
    xs: '1rem', 
    sm: '1rem', 
    md: '1.25rem', 
    lg: '1.5rem', 
    xl: '1.8rem' 
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem'
  },
  shadows: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem'
  },
  headings: {
    fontFamily: 'Outfit,sans-serif;',
    sizes: {
      h1: {
        fontSize: '2.1rem',
        fontWeight: '700',
      },
      h2: {
        fontSize: '1.9rem',
        fontWeight: '2.5rem'
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: '2.5rem'
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: '500'
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: '500'
      }
    }
  },
  components: {
    TextInput: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#868e96',
        },
        input: {
          borderRadius: '1rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    PasswordInput:{
styles: {
        label: {
          fontSize: '1rem',
          color: '#868e96',
        },
        input: {
          borderRadius: '1rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    Select: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    BackgroundImage: {
      styles: {
        root: {
          img: {
            filter: "blur(12px)"
          }
        }
      }
    },
    header: {
      styles: {
        root: {
          backgroundColor: '#FFFFFF',
        }
      }
    }
  }
};


export const lightTheme: MantineThemeOverride = {
  ...baseTheme,
  colorScheme: 'light',
  primaryColor: "primary",
  colors: {
    primary: [
      '#CCE0FF', 
      '#BAD0F3', 
      '#9BACD9', 
      '#5E77BC', 
      '#4963AE', 
      '#2F4070', 
      '#232F53', 
      '#1B2541', 
      '#001A41',
      '#001232',
    ],
    secondary: [
      '#DCDDEC', 
      '#D2D4E7', 
      '#C6C8E1', 
      '#ACAFD3', 
      '#7F83B8', 
      '#646AAD', 
      '#4C518F', 
      '#393D6B', 
      '#0C1f56', 
      '#06102B',
    ],
    success: [
      '#ECFDF5', 
      '#D1FAE5', 
      '#A7F3D0', 
      '#6EE7B7', 
      '#34D399', 
      '#10B981', 
      '#059669', 
      '#047857', 
      '#065F46', 
      '#064E3B',
    ],
    warning: [
      '#FFFBEB', 
      '#FEF3C7', 
      '#FDE68A', 
      '#FCD34D', 
      '#FBBF24', 
      '#F59E0B', 
      '#D97706', 
      '#B45309', 
      '#92400E', 
      '#78350F',
    ],
    error: [
      '#FEF2F2', 
      '#FEE2E2', 
      '#FECACA', 
      '#FCA5A5', 
      '#F87171', 
      '#EF4444', 
      '#DC2626', 
      '#B91C1C', 
      '#991B1B', 
      '#7F1D1D',
    ],
    neutral: [
      '#FBFBFC', 
      '#EEEFF2', 
      '#DADBE2', 
      '#CBD5E1', 
      '#8D90A7', 
      '#6F728F', 
      '#454966', 
      '#383A4B', 
      '#313038', 
      '#21222C',
    ],
    brand: [
      '#e0f2ff',
      '#b8e0ff',
      '#8cccff',
      '#5eb8ff',
      '#36a3ff',
      '#1a8eff',
      '#007aff', 
      '#0061cc',
      '#00499a',
      '#003169',
    ],
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },
};

// Dark theme
export const darkTheme: MantineThemeOverride = {
  ...baseTheme,
  colorScheme: 'dark',
  primaryColor: "primary",
  colors: lightTheme.colors,
  components: {
    ...baseTheme.components,
    TextInput: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#1d1e30',
        }
      }
    },
    PasswordInput:{
styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#1d1e30',
        }
      }
    },
    Select: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#1d1e30',
        }
      }
    },
    header: {
      styles: {
        root: {
          backgroundColor: '#1d1e30',
        }
      }
    }
  },
};

// Default theme export (matching original)
export const theme: MantineThemeOverride = {
  colorScheme: "light",
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: 'Outfit,sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  fontSizes: { // 16px
    xs: '1rem', // 12px
    sm: '1rem', // 14px
    md: '1.25rem', // 16px
    lg: '1.5rem', // 18px
    xl: '1.8rem' // 20px
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem'
  },
  shadows: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem'
  },
  headings: {
    fontFamily: 'Outfit,sans-serif;',
    sizes: {
      h1: {
        fontSize: '2.1rem',
        fontWeight: '700',
      },
      h2: {
        fontSize: '1.9rem',
        fontWeight: '2.5rem'
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: '2.5rem'
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: '500'
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: '500'
      }
    }
  },
  components: {
    TextInput: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    PasswordInput: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    Select: {
      styles: {
        label: {
          fontSize: '1rem',
          color: '#DCE7FCFF',
        },
        input: {
          borderRadius: '2rem !important',
          backgroundColor: '#DCE7FCFF',
        }
      }
    },
    BackgroundImage: {
      styles: {
        root: {
          img: {
            filter: "blur(12px)"
          }
        }
      }
    },
    header: {
      styles: {
        root: {
          backgroundColor: '#FFFFFF',
        }
      }
    }
  },
  colors: {
    primary: ['#CCE0FF', '#BAD0F3', '#9BACD9', '#5E77BC', '#4963AE', '#2F4070', '#232F53', '#1B2541', '#001A41'],
    secondary: ['#DCDDEC', '#D2D4E7', '#C6C8E1', '#ACAFD3', '#7F83B8', '#646AAD', '#4C518F', '#393D6B', '#0C1f56', '#06102B'],
    success: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
    warning: ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'],
    error: ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'],
    neutral: ['#FBFBFC', '#EEEFF2', '#DADBE2', '#CBD5E1', '#8D90A7', '#6F728F', '#454966', '#383A4B', '#313038', '#21222C'],
    shades: ['#FFFFFF', '#000000']
  }
}; 