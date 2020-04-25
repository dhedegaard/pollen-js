import React from 'react'
import { Box } from '@material-ui/core'

type Props = {
  value: string | number | undefined
}
const ValueItem: React.FC<Props> = ({ value }) => {
  if (value == null) {
    return (
      <Box component="span" color="text.secondary">
        -
      </Box>
    )
  }
  if (typeof value === 'string') {
    return (
      <Box component="span" color="warning.main">
        {value}
      </Box>
    )
  }
  if (value < 1) {
    return (
      <Box component="span" color="text.secondary">
        {value.toString()}
      </Box>
    )
  }
  return (
    <Box
      component="b"
      color={
        value < 21 ? 'success.main' : value < 51 ? 'warning.main' : 'error.dark'
      }
    >
      {value.toString()}
    </Box>
  )
}

export default ValueItem
