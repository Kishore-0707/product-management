import { useToast
 } from "vue-toastification";

 const instanceToast = useToast()

const toast = {
    success(message = "Request Successfully"){
        instanceToast.success(message)
    },
    error(message){
        instanceToast.error(message)
    },
    info(message){
        instanceToast.info(message)
    },
    warning(message){
        instanceToast.warning(message)
    }

}

export default toast;