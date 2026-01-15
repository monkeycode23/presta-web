export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {}).format(value);
};


  export const formatCurrency2 = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };


