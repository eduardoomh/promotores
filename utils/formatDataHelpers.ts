
export const getUserRole = (role: string): any =>{
    if(role === 'promoter'){
        return 'Promotor'
    } 
    return 'Administrador'
}