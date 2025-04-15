export const calculateAge = (dob: string): number => {
    if(!dob) 
        return 0
    const birthDate = new Date(dob)
    const ageDiff = Date.now() - birthDate.getTime()
    return Math.floor(ageDiff / (1000*60*60*24*365.25))
}