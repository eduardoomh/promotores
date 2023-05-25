import { message } from "antd"

export const deleteFromDB = async (
    id: string,
    successMsg: string,
    fetchDataDelete: (id: string) => void,
    refetchingUsers: () => void,
    closeModal: () => void,

) => {
    try {
        const response = await fetchDataDelete(id)
        //@ts-ignore
        if (response.status === 'error') {
            message.error('Ha ocurrido un error, intente mas tarde.')
            return
        }
        refetchingUsers()
        closeModal()
        message.success(successMsg)

    } catch (error) {
        console.log(error)
        message.error('Ha habido un error, intente mas tarde.')
    }

}