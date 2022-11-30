import ProtectPolicy from "./ProtectPolicy"

function ProtectPolicyWrapper(){
    return <div dangerouslySetInnerHTML={ProtectPolicy()} />
}
export default ProtectPolicyWrapper;