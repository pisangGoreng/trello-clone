import React, { useRef } from 'react'

import { useAppState } from './AppStateContext'
import { AddNewItem } from './AddNewItem'
import { ColumnContainer, ColumnTitle } from './styles'
import { Card } from './Card'
import { useDrop } from "react-dnd"
import { DragItem } from './DragItem'

interface ColumnProps {
  text: string
  index: number
  id: string
}

// ! PropsWithChildren will add children property inside ColumnProps

export const Column = ({ text, index, id, children }: React.PropsWithChildren<ColumnProps>) => {
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      dispatch({type: "MOVE_LIST", payload: { dragIndex, hoverIndex }})
      item.index = hoverIndex
    }
  })


  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <ColumnContainer ref={ref}>
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