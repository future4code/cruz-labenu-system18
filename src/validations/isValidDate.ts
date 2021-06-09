export default function isValidDate(dateString: string): void {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) {
        throw new Error('Date incorrect format. Try YYYY-MM-DD, only numbers accepted')
    }  // Invalid format
    let year = Number(dateString.slice(0, 4))
    let month = Number(dateString.slice(5, 7))
    let day = Number(dateString.slice(8, 10))
    if(isNaN(day) || isNaN(month) || isNaN(year)  ){
        throw new Error('Only numbers accepted on birth_date. Format: YYYY-MM-DD')  
      }
    if (year < 1900 || year > 2003) {
        throw new Error('Age is incorrect. Min year: 1900 Max year: 2003')
    }
    if (month < 1 || month > 12) {
        throw new Error('Month is incorrect. Min month: 01 Max month: 12')
    }
    if (day < 1 || day > 31) {
        throw new Error('Day is incorrect. Min day: 01 Max day: 31')
    }
}

