import React from 'react';
import MaskedInput from 'react-text-mask';

import { observer } from 'mobx-react';

const Masked = observer(function Masked(props) {
	const divProps = Object.assign({}, props)
	delete divProps.inputRef

  return (
		<MaskedInput
      {...divProps}
      onChange={(event, values) => {
        props.onChange({
          target: {
            value: event.target.value,
          },
        })
      }}
      mask={props.mask}
      placeholder={props.placeholder}
      guide={props.guide}
    />
  )
})

export default Masked