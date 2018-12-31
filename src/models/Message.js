import { extendObservable } from 'mobx'

class Message {
  constructor() {
    extendObservable(this, {
    	show: false,
      value: '',
      variant: '',
    })
  }
}

export default Message
