export const calculateAge = (rawDate: string, minAge: number) => {
  let cleanedDate = rawDate.toString();

  cleanedDate = cleanedDate.replace(/\D/g, '');

  if (cleanedDate.length === 8) {
    const day = parseInt(cleanedDate.slice(6, 8));
    const month = parseInt(cleanedDate.slice(4, 6)) - 1;
    const year = parseInt(cleanedDate.slice(0, 4));

    const birthDate = new Date(year, month, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return { isTrue: age > minAge, age };
  }

  return { isTrue: false, age: -1 };
};
