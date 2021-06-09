

export function isClassNameValid(name:string):void {
    let reg2 = /^[a-zA-Z]+$/;
    if(!reg2.test(name)){
        throw new Error('Incorrect class.Only one name accepted. "Ex: Cruz"  ')
    }
}

export function dateValidations(start_date: string, end_date: string): void {
    let start_year = Number(start_date.slice(0, 4))
    let start_month = Number(start_date.slice(5, 7))
    let start_day = Number(start_date.slice(8, 10))

    let end_year = Number(end_date.slice(0, 4))
    let end_month = Number(end_date.slice(5, 7))
    let end_day = Number(end_date.slice(8, 10))
    
    if(isNaN(start_day) || isNaN(start_month) || isNaN(start_year) ){
        throw new Error('Only numbers accepted on start_date. Format: YYYY-MM-DD')  
      }

      if(isNaN(end_day) || isNaN(end_month) || isNaN(end_year)  ){
        throw new Error('Only numbers accepted on end_date. Format: YYYY-MM-DD')  
      }
    if(start_date.length>10 || end_date.length>10){
        throw new Error("Date format: YYYY-MM-DD")
    }
    if (start_year > end_year) {
        throw new Error('Final year date is less than starter year')
    }
    if (start_year === end_year) {
        if (start_month > end_month) {
            throw new Error('Final  month date is less than starter month')
        }
        if (start_month === end_month) {
            if (start_day > end_day) {
                throw new Error('Final day date is less than starter day')
            }
        }
    }

    if (start_year <2021 || start_year > 2099 || end_year <2021 || end_year > 2099) {
        throw new Error('Year is incorrect. Min year: 2021 Max year: 2099')
    }
    if (start_month < 1 || start_month > 12 || end_month < 1 || end_month > 12) {
        throw new Error('Month is incorrect. Min month: 01 Max month: 12')
    }
    if (start_day < 1 || start_day > 31 || end_day < 1 || end_day > 31) {
        throw new Error('Day is incorrect. Min day: 01 Max day: 31')
    }

    let minimumTimeVerification = end_year - start_year
    if (minimumTimeVerification >= 2){
        return
    }
    if (minimumTimeVerification < 2) {
        let monthVerificaTion = (end_year - start_year) * 12 - (start_month - end_month)
        if (monthVerificaTion < 6) {
            throw new Error("Minimum couse duration is 6 months")
        }
    }
}


