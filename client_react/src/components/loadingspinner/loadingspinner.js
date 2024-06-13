import { Oval } from "react-loader-spinner";
import '../loadingspinner/loadingspinner.css'
export default function LoadingSpinner(){
    return(<>
    <div className="loading-spinner-container"><Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  /></div>
    </>
    )
}