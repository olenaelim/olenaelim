import Terms from "./Terms"

function TermsWrapper(){
    return <div dangerouslySetInnerHTML={Terms()} />
}
export default TermsWrapper;