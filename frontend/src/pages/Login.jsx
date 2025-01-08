import {Div} from "../components/common/Index"
import {  SignIn, SIgnInContent } from "../components/ui/Index"


export const Login = () => {
  return (
      <Div  className={'grid grid-cols-8'}>
        <SignIn/>
        <SIgnInContent />
    </Div>
  )
}

