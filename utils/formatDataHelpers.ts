
export const getUserRole = (role: string): any =>{
    console.log(role, "llega")
    if(role === 'promoter'){
        return 'Promotor'
    } 
    return 'Administrador'
}