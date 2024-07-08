import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alert(message,icon,focus_) { 
    onFocus(focus_);
    const Myswal  = withReactContent (Swal)
    Myswal.fire({
        title:message,
        icon:icon
    });

}

function onFocus(fc) { 
    if (fc!==''){
        document.getElementById(fc).focus();
    }
}