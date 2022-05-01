export const changeColorByCreditScore = (creditScore: number): string => {
    if (creditScore > 679) {
      return "success";
    }
    if (579 <= creditScore && creditScore <= 679) {
      return "warning";
    } else return "danger";
  };