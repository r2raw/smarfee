function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
  
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age;
  }

  export default calculateAge;