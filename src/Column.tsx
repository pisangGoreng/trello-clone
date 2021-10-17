import React from 'react'

import { useAppState } from './AppStateContext'
import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { Card } from './Card'

interface ColumnProps {
  text: string
  index: number
  id: string
}

// ! PropsWithChildren will add children property inside ColumnProps

export const Column = ({ text, index, id, children }: React.PropsWithChildren<ColumnProps>) => {
  const { state, dispatch } = useAppState()
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {/* {children} */}
      {
        state.lists[index].tasks.map((task) => (
          <Card text={task.text} key={task.id} />
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={text =>
          dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })
        }
        dark
      />
    </ColumnContainer>
  )
}